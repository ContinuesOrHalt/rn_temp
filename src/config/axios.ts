// import { ACCESS_TOKEN } from '@lib/constants/localStorage'
import axios from "axios";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_APP_API;

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APP_API,
});

instance.interceptors.request.use(
  function (config: any) {
    // Do something before request is sent
    // try {
    //   const token = localStorage.getItem(ACCESS_TOKEN)
    //   if (!!token) {
    //     config.headers['Authorization'] = 'Bearer ' + token
    //   }
    // } catch (error) {}
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    const data = response?.data?.data || response?.data || response;
    if (response?.data?.status_code !== 200)
      return Promise.reject(response?.data);

    return data;
  },
  function (error) {
    if (error?.response?.data) {
      return Promise.reject(error?.response?.data);
    }
    return Promise.reject(error);
  }
);

export const setLocaleApi = (locale: string) => {
  instance.defaults.headers.common["lang"] = locale;
};
export const setTokenApi = (token: string) => {
  instance.defaults.headers.common["Authorization"] = "Bearer " + token;
};

export default instance;
