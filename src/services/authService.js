import axiosClient from "../config/axiosClient";
import { LOCAL_STORAGE, setItem } from "../utils/localStorage";
import { toast } from "react-toastify";
import camelcaseKeys from "camelcase-keys";

const login = async (data) => {
   try {
      console.log({ data });
      const user = await axiosClient.post("/auth/login", data);
      console.log({ user });
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

const forgetPassword = async (email) => {
   console.log("email: ", email);
   try {
      const res = await axiosClient.post("/auth/forgot-password", {
         email
      });

      if (res.status) {
         toast.success(res?.message);
         return res;
      } else {
         toast.error(res?.message);
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
         return camelcaseKeys(userInfo.data, { deep: true });
      }
      return false;
   } catch (e) {
      console.error(e.message);
      return false;
   }
};

const googleSignInBE = async (idToken) => {
   try {
      const googleLogin = await axiosClient.post("/auth/google-sign-in", { idToken });
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

export default { login, registerUser, getUserInfo, googleSignInBE, forgetPassword };
export { login, registerUser, getUserInfo, googleSignInBE, forgetPassword };
