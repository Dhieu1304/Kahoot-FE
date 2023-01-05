import camelcaseKeys from "camelcase-keys";
import axiosClient from "../config/axiosClient";
import mockApi from "../mockApi";
import { getItem, LOCAL_STORAGE } from "../utils/localStorage";

const getOwnedPresentations = async () => {
   return await getPresentations("OWNER");
};

const getCoOwnedPresentations = async () => {
   return await getPresentations("CO_OWNER");
};

const getPresentations = async (type) => {
   try {
      const res = await axiosClient.get(`/presentation/list`, {
         params: {
            type
         }
      });
      return camelcaseKeys(res.data, { deep: true });
   } catch (e) {
      console.error(e.message);
      return false;
   }
};

const createPresentation = async (name, group, type = "PUBLIC") => {
   try {
      const res = await axiosClient.post(`/presentation/create`, {
         name,
         type
      });
      return camelcaseKeys(res.data, { deep: true });
   } catch (e) {
      console.error(e.message);
   }
};

const getPresentationById = async (id) => {
   try {
      const res = await axiosClient.get(`/presentation/${id}`);
      return camelcaseKeys(res.data, { deep: true });
   } catch (e) {
      console.error(e.message);
      return false;
   }
};

const getAllSlidesByPresentationId = async (id) => {
   try {
      const res = await axiosClient.get(`/presentation/${id}/all-slide`);
      return camelcaseKeys(res.data, { deep: true });
   } catch (e) {
      console.error(e.message);
      return false;
   }
};

const getSlideById = async (id) => {
   return await mockApi.mockSlide;
};

const getResultBySlideId = async (slideId) => {
   return await mockApi.mockResult;
};

const savePresentation = async (presentationSaveData, presentationId) => {
   const {
      name,
      themeId: presentation_theme_id,
      type: presentation_type_id
   } = presentationSaveData;
   const data = { presentationId, name, presentation_theme_id, presentation_type_id };
   try {
      const res = await axiosClient.put(`/presentation/edit`, data);
      return res.status;
   } catch (e) {
      console.error(e.message);
      return false;
   }
};

const updateSlides = async (presentation_id, slides) => {
   const data = slides.map((slide, index) => {
      const ordinal_slide_number = index + 1;
      const { slideTypeId: slide_type_id, title, body, description } = slide;

      return {
         ordinal_slide_number,
         slide_type_id,
         title: title || " ",
         body: Array.isArray(body) ? body : [],
         description: description || " "
      };
   });

   console.log("data slide update: ", data);
   console.log("data slide update co pre: ", {
      presentation_id,
      data
   });

   try {
      const res = await axiosClient.put(`/slide/update`, {
         presentation_id,
         data
      });
      return res.status;
   } catch (e) {
      console.error(e.message);
      return false;
   }
};

const deletePresentationById = async (presentation_id) => {
   try {
      const res = await axiosClient.post(`/presentation/delete`, {
         presentation_id
      });
      console.log("res: ", res);
      return camelcaseKeys(res, { deep: true });
   } catch (e) {
      console.error(e.message);
      return false;
   }
};

const getListPresentationThemeConfig = async () => {
   try {
      const res = await axiosClient.get(`/presentation/theme`);
      return camelcaseKeys(res.data, { deep: true });
   } catch (e) {
      console.error(e.message);
      return false;
   }
};

const getListSlideTypeConfig = async () => {
   try {
      const res = await axiosClient.get(`/slide/type`);
      return camelcaseKeys(res.data, { deep: true });
   } catch (e) {
      console.error(e.message);
      return false;
   }
};

const addPresentationCoOwner = async (presentation_id, email) => {
   try {
      const res = await axiosClient.post(`/presentation-member/add-co-owner`, {
         presentation_id,
         email
      });
      return camelcaseKeys(res, { deep: true });
   } catch (e) {
      console.error(e.message);
   }
};

const deleteMember = async (presentation_id, email) => {
   try {
      const res = await axiosClient.post(`/presentation-member/remove-co-owner`, {
         presentation_id,
         email
      });
      return camelcaseKeys(res, { deep: true });
   } catch (e) {
      console.error(e.message);
      return false;
   }
};

const getPresentationUsers = async (presentation_id) => {
   try {
      const res = await axiosClient.get(`/presentation-member/list`, {
         params: { presentation_id }
      });
      return camelcaseKeys(res.data, { deep: true });
   } catch (e) {
      console.error(e.message);
      return false;
   }

   // return slide;
};

const getPresentationGroups = async (presentation_id) => {
   try {
      const res = await axiosClient.get(`/presentation-group/list`, {
         params: { presentation_id }
      });
      return camelcaseKeys(res.data, { deep: true });
   } catch (e) {
      console.error(e.message);
      return false;
   }
};

const addGroup = async (presentation_id, group_id) => {
   try {
      const res = await axiosClient.post(`/presentation-group/add-group`, {
         presentation_id,
         group_id
      });
      return camelcaseKeys(res, { deep: true });
   } catch (e) {
      console.error(e.message);
      return false;
   }
};

const deleteGroup = async (presentation_id, group_id) => {
   try {
      const res = await axiosClient.post(`/presentation-group/remove-group`, {
         presentation_id,
         group_id
      });
      return camelcaseKeys(res, { deep: true });
   } catch (e) {
      console.error(e.message);
      return false;
   }
};

const getChatByPresentationCode = async (code, page, limit) => {
   const uid = getItem(LOCAL_STORAGE.UUID);
   try {
      const res = await axiosClient.get(`/chat/list-message`, {
         params: {
            code,
            page,
            limit,
            uid
         }
      });
      return camelcaseKeys(res.data, { deep: true });
   } catch (e) {
      console.error(e.message);
      return false;
   }
};

const getChatByPresentationId = async (presentation_id, page, limit) => {
   const uid = getItem(LOCAL_STORAGE.UUID);
   try {
      const res = await axiosClient.get(`/chat/list-message`, {
         params: {
            presentation_id,
            page,
            limit,
            uid
         }
      });
      return camelcaseKeys(res.data, { deep: true });
   } catch (e) {
      console.error(e.message);
      return false;
   }
};

const sendMessageByPresentationCode = async (code, message) => {
   const uid = getItem(LOCAL_STORAGE.UUID);
   try {
      const res = await axiosClient.post(`/chat/new-message`, {
         code,
         uid,
         message
      });
      return camelcaseKeys(res.data, { deep: true });
   } catch (e) {
      console.error(e.message);
      return false;
   }
};

const sendMessageByPresentationId = async (presentation_id, message) => {
   const uid = getItem(LOCAL_STORAGE.UUID);
   try {
      const res = await axiosClient.post(`/chat/new-message`, {
         presentation_id,
         uid,
         message
      });
      return camelcaseKeys(res.data, { deep: true });
   } catch (e) {
      console.error(e.message);
      return false;
   }
};

const getQuestionsByPresentationId = async (presentation_id) => {
   const uid = getItem(LOCAL_STORAGE.UUID);
   try {
      const res = await axiosClient.get(`/question/list-question`, {
         params: {
            presentation_id,
            uid
         }
      });
      return camelcaseKeys(res.data, { deep: true });
   } catch (e) {
      console.error(e.message);
      return false;
   }
};

const getQuestionsByPresentationCode = async (code) => {
   const uid = getItem(LOCAL_STORAGE.UUID);
   try {
      const res = await axiosClient.get(`/question/list-question`, {
         params: {
            code,
            uid
         }
      });
      return camelcaseKeys(res.data, { deep: true });
   } catch (e) {
      console.error(e.message);
      return false;
   }
};

const addQuestionByPresentationCode = async (code, question) => {
   const uid = getItem(LOCAL_STORAGE.UUID);
   try {
      const res = await axiosClient.post(`/question/new-question`, {
         code,
         question,
         uid
      });
      return camelcaseKeys(res.data, { deep: true });
   } catch (e) {
      console.error(e.message);
      return false;
   }
};

const presentSlideShow = async (presentation_id) => {
   try {
      const res = await axiosClient.post(`/presentation/present`, { presentation_id });
      return res.data;
   } catch (e) {
      console.error(e.message);
      return false;
   }
};

const deleteOldSession = async (presentation_id) => {
   try {
      const res = await axiosClient.post(`/presentation/delete-session`, { presentation_id });
      return res.status;
   } catch (e) {
      console.error(e.message);
      return false;
   }
};

const getSlideAndDataPresentation = async (presentation_id, ordinal_slide_number) => {
   try {
      const res = await axiosClient.get(`/slide/get-slide-data`, {
         params: {
            presentation_id,
            ordinal_slide_number
         }
      });
      return res.data;
   } catch (e) {
      console.error(e.message);
      return false;
   }
};

export default {
   getOwnedPresentations,
   getCoOwnedPresentations,
   getAllSlidesByPresentationId,
   getPresentationById,
   getSlideById,
   getResultBySlideId,
   createPresentation,
   updateSlides,
   savePresentation,
   deletePresentationById,

   getPresentationUsers,
   getPresentationGroups,

   getListPresentationThemeConfig,
   getListSlideTypeConfig,

   addPresentationCoOwner,
   deleteMember,

   addGroup,
   deleteGroup,
   getChatByPresentationCode,
   getChatByPresentationId,
   sendMessageByPresentationCode,
   sendMessageByPresentationId,

   getQuestionsByPresentationId,
   getQuestionsByPresentationCode,

   addQuestionByPresentationCode,

   // present
   presentSlideShow,
   deleteOldSession,
   getSlideAndDataPresentation
};
