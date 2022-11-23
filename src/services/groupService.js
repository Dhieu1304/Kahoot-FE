import * as httpRequest from "../utils/httpRequest";

const getGroupsByOwnUserId = async (userId) => {
   try {
      const res = await httpRequest.get(`/group/user_owned/${userId}`);
      return res.data;
   } catch (error) {}
};

const getGroupsByJoinedUserId = async (userId) => {
   try {
      const res = await httpRequest.get("/group/user_joined", {
         params: {
            user_id: userId
         }
      });

      return res.data;
   } catch (error) {}
};

export { getGroupsByOwnUserId, getGroupsByJoinedUserId };
