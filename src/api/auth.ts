import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import {useMutation, useQuery, useQueryClient} from 'react-query';
import axios from '../config/axios';
import {getAsyncStorage} from './storage';
// import { ACCESS_TOKEN } from '@lib/constants/localStorage'
// import { useRouter } from 'next/router'
// import { useLocalStorage } from 'react-use'

export const currentUserKey = 'user-profile';

export interface LoginDto {
  email: string;
  password: string;
  otpCode?: string;
}

export interface SignupDto {
  email: string;
  password: string;
}

export interface UserDocument {
  id?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  nationality?: string;
  country?: string;
  state?: string;
  city?: string;
  address?: string;
  address2?: string;
  postalCode?: string;
  phoneNumber?: string;
  dob?: string;
  [k: string]: any;
}

export const useToken = () => useAsyncStorage('token');

// api

export const login = (payload: LoginDto) => {
  // axios.post("/auth/login", payload);
  return new Promise(rs => rs(payload));
};
export const logout = () => {
  return new Promise(rs => rs({}));
  // return axios.post('/auth/logout', payload)
};

export const register = (payload: SignupDto) => axios.post('/users', payload);

export const updatePassword = (payload: object) =>
  axios.post('/auth/changePassword', payload);

export const updatePassForgot = ({code, id, password}: any) =>
  axios.post(`/passwordResets/${id}/reset`, {code, password});

export const forgotPassword = (payload: object) =>
  axios.post('/passwordResets', payload);

export const verifyForgotPass = ({code, id}: any) =>
  axios.post(`/passwordResets/${id}/check`, {code});

export const updateUser = (payload: UserDocument) =>
  axios.patch('/users/me', payload);

export const getCurrentUser: () => Promise<UserDocument | null> = async () => {
  try {
    const token = await getAsyncStorage('token');

    if (token)
      return {
        id: 'string',
        email: 'string',
        firstName: 'string',
        lastName: 'string',
      };
    return null;

    // if (!localStorage.getItem(ACCESS_TOKEN)) return null
    // const data: any = await axios.get("/auth/me");
    // return data;
  } catch (error) {
    // localStorage.removeItem(ACCESS_TOKEN)
    return null;
  }
};

export const resendOtp = async (email: string) => {
  try {
    return await axios.post('/auth/resend', {email});
  } catch (error: any) {
    return null;
  }
};

// hook

export const useCustomer = () => useQuery(currentUserKey, getCurrentUser);

export const useSignUp = () => useMutation(register);

export const useLogin = () => {
  const queryClient = useQueryClient();
  const {setItem} = useToken();

  return useMutation(login, {
    onSuccess: async ({}: any) => {
      await setItem('accessToken');
      queryClient.invalidateQueries(currentUserKey);
    },
  });
};

export const useLogout = () => {
  const {removeItem} = useToken();

  const queryClient = useQueryClient();
  return useMutation(logout, {
    onSuccess: async () => {
      await removeItem();
      queryClient.invalidateQueries(currentUserKey);
    },
  });
};

export const useUpdateCustomer = () => {
  const queryClient = useQueryClient();
  return useMutation(updateUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(currentUserKey);
    },
  });
};

export const useUpdatePassword = () => useMutation(updatePassword);

export const useUpdatePassForgot = () => useMutation(updatePassForgot);

export const useForgotPassword = () => useMutation(forgotPassword);
