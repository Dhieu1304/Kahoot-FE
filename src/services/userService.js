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

      if (uploadAvatar && uploadAvatar.status) {
         const res = await axiosClient.put("/user/update-info", {
            full_name,
            avatar: uploadAvatar.data
         });
      }

      return camelcaseKeys(res.status, { deep: true });
   } catch (e) {
      console.error(e.message);
      return false;
   }
};

const uploadFile = async (file) => {
   const formData = new FormData();
   formData.append("file", file);
   console.log("formData: ", formData);

   try {
      const res = await axiosClient.post("/upload/picture", formData, {
         headers: { "Content-Type": "multipart/form-data" }
      });
      console.log(">>>>>>> res:", res);
      return camelcaseKeys(res.status, { deep: true });
   } catch (e) {
      console.error(e.message);
      return false;
   }
};

export { getUsersByGroupId, updateProfile };
