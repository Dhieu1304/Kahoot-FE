import axiosClient from "../config/axiosClient";
import camelcaseKeys from "camelcase-keys";

const getGroupsByOwnUserId = async (userId) => {
   try {
      const res = await axiosClient.get(`/group/user_owned/${userId}`);
      return camelcaseKeys(res.data, { deep: true });
   } catch (e) {
      console.error(e.message);
      return false;
   }
};

const getGroupsByJoinedUserId = async (userId) => {
   try {
      const res = await axiosClient.get(`/group/user_joined/${userId}`);
      return camelcaseKeys(res.data, { deep: true });
   } catch (e) {
      console.error(e.message);
      return false;
   }
};

const createGroup = async (name, user_id) => {
   try {
      const res = await axiosClient.post(`/group/create`, {
         name,
         user_id
      });
      return camelcaseKeys(res.data, { deep: true });
   } catch (e) {
      console.error(e.message);
      return false;
   }
};

const inviteToGroupByEmail = async (groupId, email) => {
   try {
      const res = await axiosClient.get(`/group/invite-mail`, {
         params: {
            groupId,
            email
         }
      });

      return camelcaseKeys(res.status, { deep: true });
   } catch (e) {
      console.error(e.message);
      return false;
   }
};

const getInviteLink = async (groupId) => {
   try {
      const res = await axiosClient.get("/group/create-invite-link", {
         params: {
            groupId
         }
      });

      return camelcaseKeys(res.data.link, { deep: true });
   } catch (e) {
      console.error(e.message);
      return false;
   }
};

const checkOwnedUser = async (groupId, userId) => {
   try {
      const res = await axiosClient.get(`/group/checkOwnedUser`, {
         params: { group_id: groupId, user_id: userId }
      });
      return camelcaseKeys(res.data, { deep: true });
   } catch (e) {
      console.error(e.message);
      return false;
   }
};

const joinGroupByLink = async (link) => {
   try {
      const res = await axiosClient.get(link);
      return camelcaseKeys(res.status, { deep: true });
   } catch (e) {
      console.error(e.message);
      return false;
   }
};

const joinGroupByEmailToken = async (token) => {
   const link = process.env.REACT_APP_BE_URL + "/group/join-by-email";
   try {
      const res = await axiosClient.get(link, {
         params: {
            token
         }
      });
      return camelcaseKeys(res.status, { deep: true });
   } catch (e) {
      console.error(e.message);
      return false;
   }
};

const changeRole = async (groupId, userId, roleId) => {
   try {
      const res = await axiosClient.post("/group-user/change-role-user", {
         userId: userId.toString(),
         groupId,
         roleId
      });
      return camelcaseKeys(res.status, { deep: true });
   } catch (e) {
      console.error(e.message);
      return false;
   }
};

const deleteUserFromGroup = async (groupId, userId) => {
   console.log("[SERVICE] deleteUserFromGroup: ", { groupId, userId });
   try {
      const res = await axiosClient.post("/group-user/delete-member-group", {
         userId,
         groupId: parseInt(groupId)
      });
      return camelcaseKeys(res.status, { deep: true });
   } catch (e) {
      console.error(e.message);
      return false;
   }
};

export default {
   getGroupsByOwnUserId,
   getGroupsByJoinedUserId,
   createGroup,
   inviteToGroupByEmail,
   getInviteLink,
   checkOwnedUser,
   joinGroupByLink,
   changeRole,
   joinGroupByEmailToken,
   deleteUserFromGroup
};

export {
   getGroupsByOwnUserId,
   getGroupsByJoinedUserId,
   createGroup,
   inviteToGroupByEmail,
   getInviteLink,
   checkOwnedUser,
   joinGroupByLink,
   changeRole,
   joinGroupByEmailToken,
   deleteUserFromGroup
};
