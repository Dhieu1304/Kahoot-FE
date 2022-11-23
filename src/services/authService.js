import axiosClient from "../config/axiosClient";
import { LOCAL_STORAGE, setItem } from "../utils/localStorage";
import { toast } from "react-toastify";

const login = async (data) => {
   try {
      const user = await axiosClient.post("/auth/login", data);
      if (user.status) {
         setItem(LOCAL_STORAGE.ACCESS_TOKEN, user?.data?.accessToken);
         setItem(LOCAL_STORAGE.REFRESH_TOKEN, user?.data?.refreshToken);
         return user;
      } else {
         toast.error(user?.message);
         return false;
      }
   } catch (e) {
      console.error(e.message);
      return false;
   }
};

const registerUser = async (data) => {
   try {
      const register = await axiosClient.post("/auth/register", data);
      console.log(">>>> register", register);
      if (register.status) {
         toast.success(register?.message);
         return register;
      } else {
         toast.error(register?.message);
         return false;
      }
   } catch (e) {
      console.error(e.message);
      return false;
   }
};

const getUserInfo = async () => {
   try {
      const userInfo = await axiosClient.get("/user/info");
      console.log(">>> userInfo", userInfo);
      if (userInfo.status) {
         toast.success(userInfo?.message);
         return userInfo.data;
      } else {
         toast.error(userInfo?.message);
         return false;
      }
   } catch (e) {
      console.error(e.message);
      return false;
   }
};

const googleSignInBE = async (data) => {
   try {
      const googleLogin = await axiosClient.post("/auth/google-sign-in", data);
      console.log(">>>> googleLogin: ", googleLogin);
      if (googleLogin.status) {
         setItem(LOCAL_STORAGE.ACCESS_TOKEN, googleLogin.data.accessToken);
         setItem(LOCAL_STORAGE.REFRESH_TOKEN, googleLogin.data.refreshToken);
         return true;
      } else {
         return false;
      }
   } catch (e) {
      console.error(e.message);
      return false;
   }
};

export { login, registerUser, getUserInfo, googleSignInBE };
