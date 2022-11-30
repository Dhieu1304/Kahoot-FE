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
   try {
      const dataUpdate = {};
      if (full_name) {
         dataUpdate.full_name = full_name;
      }
      if (avatar) {
         const uploadAvatar = await uploadFile(avatar);
         if (uploadAvatar && uploadAvatar.status) {
            dataUpdate.avatar = uploadAvatar.data;
         }
      }
      const res = await axiosClient.put("/user/update-info", dataUpdate);
      return camelcaseKeys(res.status, { deep: true });
   } catch (e) {
      console.error(e.message);
      return false;
   }
};

const uploadFile = async (file) => {
   const formData = new FormData();
   formData.append("file", file);
   try {
      const res = await axiosClient.post("/upload/picture", formData, {
         headers: { "Content-Type": "multipart/form-data" }
      });
      return camelcaseKeys(res, { deep: true });
   } catch (e) {
      console.error(e.message);
      return false;
   }
};

export { getUsersByGroupId, updateProfile };
