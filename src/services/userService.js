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

const updateProfile = async (full_name, avatar) => {
   console.log("serivce updateProfile: ", { full_name, avatar });
   try {
      const uploadAvatar = await uploadFile(avatar);

      console.log("uploadAvatar: ", uploadAvatar);

      // if (uploadAvatar.data) {
      //    const res = await axiosClient.put("/user/update-info", {
      //       full_name,
      //       avatar
      //    });
      // }

      return false;

      return camelcaseKeys(res.status, { deep: true });
   } catch (e) {
      console.error(e.message);
      return false;
   }
};

const uploadFile = async (file) => {
   console.log("serivce uploadFile: ", file);

   const formData = new FormData();
   formData.append("file", file);

   try {
      const res = await axiosClient.post("/upload/picture", { data: formData });
      return camelcaseKeys(res.status, { deep: true });
   } catch (e) {
      console.error(e.message);
      return false;
   }
};

export { getUsersByGroupId, updateProfile };
