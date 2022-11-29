import axiosClient from "../config/axiosClient";
import camelcaseKeys from "camelcase-keys";

const getUsersByGroupId = async (groupId) => {
   try {
      const res = await axiosClient.get(`/user/group_all/${groupId}`);
      return camelcaseKeys(res.data, { deep: true });
   } catch (e) {
      console.error(e.message);
      return false;
   }
};

export { getUsersByGroupId };
