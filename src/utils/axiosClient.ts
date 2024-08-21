import axios, { AxiosInstance, AxiosResponse, } from "axios";

export type APISuccessResponse<T = undefined> = {
  error: boolean;
  message: string;
  data: T;
  response: AxiosResponse<T>;
};


const createAxiosInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: "http://localhost:4000",
  });

  instance.interceptors.request.use(
    (config) => {
      return config;
    },
    (error) => {
    
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    (error) => {
    
      return Promise.reject(error);
    }
  );

  return instance;
};

const axiosClient = createAxiosInstance();

export default axiosClient;
