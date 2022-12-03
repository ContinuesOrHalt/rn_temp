import axios from 'axios';
import {ENV} from './env';

axios.defaults.baseURL = ENV.API_URL;

const instance = axios.create({
  baseURL: ENV.API_URL,
});

// instance.interceptors.request.use(
//   function (config: any) {
//     return config;
//   },
//   function (error) {
//     // Do something with request error
//     return Promise.reject(error);
//   },
// );

instance.interceptors.response.use(
  function (response) {
    const data = response?.data?.data || response?.data || response;
    if (response?.data?.status_code !== 200) {
      return Promise.reject(response?.data);
    }

    return data;
  },
  function (error) {
    if (error?.response?.data) {
      return Promise.reject(error?.response?.data);
    }
    return Promise.reject(error);
  },
);

export const setLocaleApi = (locale: string) => {
  instance.defaults.headers.common['lang'] = locale;
};
export const setTokenApi = (token: string) => {
  instance.defaults.headers.common['Authorization'] = 'Bearer ' + token;
};

export default instance;
