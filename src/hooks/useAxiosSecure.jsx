import axios from "axios";
import { useEffect } from "react";
import useAuth from "../context/AuthContext/AuthContext";

const axiosInstance = axios.create({
  baseURL: "https://server-alpha-livid.vercel.app",
});

const useAxiosSecure = () => {
  const { user } = useAuth();
  useEffect(() => {
    const requestInterceptor = axiosInstance.interceptors.request.use(
      (config) => {
        if (user) {
          config.headers.Authorization = `Bearer ${user.accessToken}`;
        }
        return config;
      }
    );

    // response interceptor to handle errors
    const responseInterceptor = axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        console.log("error in axios interceptor", error);
        Promise.reject(error);
      }
    );

    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [user]);

  return axiosInstance;
};

export default useAxiosSecure;
