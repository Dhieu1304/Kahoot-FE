import jwt_decode from "jwt-decode";
import { getItem, LOCAL_STORAGE, setItem } from "../utils/localStorage";
import axiosClient from "../config/axiosClient";

const isTokenExpired = async () => {
   const accessToken = getItem(LOCAL_STORAGE.ACCESS_TOKEN);
   const decoded = jwt_decode(accessToken);
   if (decoded && decoded.exp > Date.now()) {
      console.error("Token expired");
      await refreshToken();
   }
};

const refreshToken = async () => {
   const refreshToken = getItem(LOCAL_STORAGE.REFRESH_TOKEN);
   const token = await axiosClient.post("/auth/refresh-token", { refreshToken });
   if (token && token.status) {
      console.log("Get access token from refresh");
      setItem(LOCAL_STORAGE.ACCESS_TOKEN, token.data.accessToken);
   }
};

export { isTokenExpired };
