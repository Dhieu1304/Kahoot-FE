import axios from "axios";
import { getItem, LOCAL_STORAGE } from "../utils/localStorage";
import { isTokenExpired } from "../services/tokenService";

const axiosClient = axios.create({
   baseURL: "http://localhost:3043",
   headers: {
      "content-type": "application/json"
   }
});

axiosClient.interceptors.request.use(async (config) => {
   const customHeaders = {};
   // await isTokenExpired();
   const accessToken = getItem(LOCAL_STORAGE.ACCESS_TOKEN);
   if (accessToken) {
      customHeaders.Authorization = `Bearer ${accessToken}`;
   }

   return {
      ...config,
      headers: {
         ...customHeaders,
         ...config.headers
      }
   };
});

axiosClient.interceptors.response.use(
   (response) => {
      if (response && response.data) {
         return response.data;
      }
      return response;
   },
   (error) => {
      console.error(error);
      if (error && error.response && error.response.data) {
         return error.response.data;
      }
      return error;
   }
);

export default axiosClient;
