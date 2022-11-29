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
   console.log("createGroup: ", { name, user_id });

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
   console.log("Invite: ", { groupId, email });

   try {
      const res = await axiosClient.get(`/group/invite-mail`, {
         params: {
            groupId,
            email
         }
      });
      console.log("res: ", res);
      return camelcaseKeys(res.status, { deep: true });
   } catch (e) {
      console.error(e.message);
      return false;
   }
};

const getInviteLink = async (groupId) => {
   console.log("Invite link: ", { groupId });

   try {
      const res = await axiosClient.get("/group/create-invite-link", {
         params: {
            groupId
         }
      });
      console.log("res: ", res);
      return camelcaseKeys(res.data.link, { deep: true });
   } catch (e) {
      console.error(e.message);
      return false;
   }
};

const checkOwnedUser = async (groupId, userId) => {
   console.log("check own user: ", { groupId, userId });

   try {
      const res = await axiosClient.get(`/group/checkOwnedUser`, {
         params: { group_id: groupId, user_id: userId }
      });
      console.log("res: ", res);
      return camelcaseKeys(res.data, { deep: true });
   } catch (e) {
      console.error(e.message);
      return false;
   }
};

const joinGroupByLink = async (userId, link) => {
   console.log("joinGroupByLink: ", { userId, link });

   try {
      const res = await axiosClient.get("/group/join-by-link", {
         params: {
            userId,
            link
         }
      });
      console.log("res: ", res);
      return camelcaseKeys(res.status, { deep: true });
   } catch (e) {
      console.error(e.message);
      return false;
   }
};

const changeRole = async (groupId, userId, roleId) => {
   console.log("changeRole: ", { userId, groupId, roleId });

   try {
      // const res = await axiosClient.put("/group/change-role", {
      //    params: {
      //       userId,
      //       groupId,
      //       roleId
      //    }
      // });
      // console.log("res: ", res);
      return true;
      return camelcaseKeys(res.status, { deep: true });
   } catch (e) {
      console.error(e.message);
      return false;
   }
};

export {
   getGroupsByOwnUserId,
   getGroupsByJoinedUserId,
   createGroup,
   inviteToGroupByEmail,
   getInviteLink,
   checkOwnedUser,
   joinGroupByLink,
   changeRole
};
