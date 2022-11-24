import axiosClient from "../config/axiosClient";
import camelcaseKeys from "camelcase-keys";

const getGroupsByOwnUserId = async (userId) => {
   console.log("getGroupsByOwnUserId:  userId = ", userId);

   try {
      const res = await axiosClient.get(`/group/user_owned/${userId}`);
      console.log("res: ", res);
      console.log("res.data: ", res.data);
      console.log("camelcaseKeys(res.data): ", camelcaseKeys(res.data, { deep: true }));

      return camelcaseKeys(res.data, { deep: true });
   } catch (e) {
      console.error(e.message);
      return false;
   }
};

const getGroupsByJoinedUserId = async (userId) => {
   console.log("getGroupsByJoinedUserId:  userId = ", userId);

   try {
      const res = await axiosClient.get(`/group/user_joined/${userId}`);
      console.log("res: ", res);
      return camelcaseKeys(res.data, { deep: true });
   } catch (e) {
      console.error(e.message);
      return false;
   }
};

export { getGroupsByOwnUserId, getGroupsByJoinedUserId };
