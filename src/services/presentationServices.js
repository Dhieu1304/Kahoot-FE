import camelcaseKeys from "camelcase-keys";
import snakecaseKeys from "snakecase-keys";
import axiosClient from "../config/axiosClient";
import mockApi from "../mockApi";
import { getItem, LOCAL_STORAGE } from "../utils/localStorage";

const getOwnedPresentations = async () => {
   // console.log("[SERVICE][PRESENTATION] getOwnedPresentations");
   const presentations = await getPresentations("OWNER");
   // console.log("presentations: ", presentations);
   return presentations;
};

const getCoOwnedPresentations = async () => {
   // console.log("[SERVICE][PRESENTATION] getOwnedPresentations");
   const presentations = await getPresentations("CO_OWNER");
   // console.log("presentations: ", presentations);
   return presentations;
};

const getPresentations = async (type) => {
   // console.log("[SERVICE][PRESENTATION] getPresentations: ", { type });

   try {
      const res = await axiosClient.get(`/presentation/list`, {
         params: {
            type
         }
      });
      // console.log("res.data: ", res.data);

      return camelcaseKeys(res.data, { deep: true });
   } catch (e) {
      console.error(e.message);

      return false;
   }
};

const createPresentation = async (name, group, type = "PUBLIC") => {
   // console.log("[SERVICE][PRESENTATION] createPresentation: ", {
   //    name,
   //    type
   // });

   try {
      const res = await axiosClient.post(`/presentation/create`, {
         name,
         type
      });
      console.log("res: ", res);

      return camelcaseKeys(res.data, { deep: true });
   } catch (e) {
      console.error(e.message);

      // return false;
   }
};

const getPresentationById = async (id) => {
   // console.log("[SERVICE][PRESENTATION] getPresentationById: ", { id });
   // const presentation = await mockApi.mockPresentation;

   // return presentation;

   try {
      const res = await axiosClient.get(`/presentation/${id}`);

      // console.log("res: ", res);

      return camelcaseKeys(res.data, { deep: true });
   } catch (e) {
      console.error(e.message);

      return false;
   }

   //    console.log("presentation", presentation);
};

const getAllSlidesByPresentationId = async (id) => {
   // console.log("[SERVICE][PRESENTATION] getAllSlidesByPresentationId: ", { id });
   // const slide = await mockApi.mockSlide;

   //    console.log("presentation", presentation);

   try {
      const res = await axiosClient.get(`/presentation/${id}/all-slide`);

      // console.log("res: ", res);
      // console.log("res.data: ", res.data);
      // console.log(
      //    "camelcaseKeys(res.data, { deep: true }): ",
      //    camelcaseKeys(res.data, { deep: true })
      // );

      return camelcaseKeys(res.data, { deep: true });
   } catch (e) {
      console.error(e.message);

      return false;
   }

   // return slide;
};

const getSlideById = async (id) => {
   // console.log("[SERVICE][PRESENTATION] getSlideById: ", { id });
   const slide = await mockApi.mockSlide;

   //    console.log("presentation", presentation);

   return slide;
};

const getResultBySlideId = async (slideId) => {
   // console.log("[SERVICE][PRESENTATION] getResultBySlideId: ", { slideId });
   const slide = await mockApi.mockResult;

   //    console.log("presentation", presentation);

   return slide;
};

const savePresentation = async (presentationSaveData, presentationId) => {
   console.log("[SERVICE][PRESENTATION] savePresentation: ", presentationSaveData);

   const {
      name,
      themeId: presentation_theme_id,
      type: presentation_type_id
   } = presentationSaveData;
   const data = { presentationId, name, presentation_theme_id, presentation_type_id };

   console.log("data send: ", data);

   try {
      const res = await axiosClient.put(`/presentation/edit`, data);

      console.log("success res edit presentation: ", res);

      return res.status;
   } catch (e) {
      console.error(e.message);
      return false;
   }
};

const updateSlides = async (presentation_id, slides) => {
   // console.log("[SERVICE] updateSlides");

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

      console.log("success res update: ", res);

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
   // console.log("[SERVICE][PRESENTATION] addPresentationCoOwner: ", {
   //    presentation_id,
   //    email
   // });

   try {
      const res = await axiosClient.post(`/presentation-member/add-co-owner`, {
         presentation_id,
         email
      });
      console.log("res: ", res);

      return camelcaseKeys(res, { deep: true });
   } catch (e) {
      console.error(e.message);

      // return false;
   }
};

const deleteMember = async (presentation_id, email) => {
   try {
      const res = await axiosClient.post(`/presentation-member/remove-co-owner`, {
         presentation_id,
         email
      });
      console.log("res: ", res);
      return camelcaseKeys(res, { deep: true });
   } catch (e) {
      console.error(e.message);
      return false;
   }
};

const getPresentationUsers = async (presentation_id) => {
   // console.log("[SERVICE][PRESENTATION] getPresentationUsers: ", { presentation_id });

   try {
      const res = await axiosClient.get(`/presentation-member/list`, {
         params: { presentation_id }
      });

      console.log("res: ", res);

      return camelcaseKeys(res.data, { deep: true });
   } catch (e) {
      console.error(e.message);

      return false;
   }

   // return slide;
};

const getPresentationGroups = async (presentation_id) => {
   // console.log("[SERVICE][PRESENTATION] getPresentationGroups: ", { presentation_id });

   try {
      const res = await axiosClient.get(`/presentation-group/list`, {
         params: { presentation_id }
      });

      console.log("res: ", res);

      return camelcaseKeys(res.data, { deep: true });
   } catch (e) {
      console.error(e.message);

      return false;
   }
};

const addGroup = async (presentation_id, group_id) => {
   // console.log("[SERVICE][PRESENTATION] addGroup: ", { presentation_id, group_id });
   try {
      const res = await axiosClient.post(`/presentation-group/add-group`, {
         presentation_id,
         group_id
      });
      console.log("res: ", res);
      return camelcaseKeys(res, { deep: true });
   } catch (e) {
      console.error(e.message);
      return false;
   }
};

const deleteGroup = async (presentation_id, group_id) => {
   // console.log("[SERVICE][PRESENTATION] deleteGroup: ", { presentation_id, group_id });
   try {
      const res = await axiosClient.post(`/presentation-group/remove-group`, {
         presentation_id,
         group_id
      });
      console.log("res: ", res);
      return camelcaseKeys(res, { deep: true });
   } catch (e) {
      console.error(e.message);
      return false;
   }
};

const getChatByPresentationCode = async (code, page, limit) => {
   const uid = getItem(LOCAL_STORAGE.UUID);

   console.log("[SERVICE][PRESENTATION] getChatByPresentationCode: ", { code, page, limit });
   try {
      const res = await axiosClient.get(`/chat/list-message`, {
         params: {
            code,
            page,
            limit,
            uid
         }
      });

      console.log("res: ", res);
      return camelcaseKeys(res.data, { deep: true });
   } catch (e) {
      console.error(e.message);
      return false;
   }
};

const getChatByPresentationId = async (presentation_id, page, limit) => {
   const uid = getItem(LOCAL_STORAGE.UUID);

   console.log("[SERVICE][PRESENTATION] getChatByPresentationId: ", {
      presentation_id,
      page,
      limit
   });
   try {
      const res = await axiosClient.get(`/chat/list-message`, {
         params: {
            presentation_id,
            page,
            limit,
            uid
         }
      });

      console.log("res: ", res);
      return camelcaseKeys(res.data, { deep: true });
   } catch (e) {
      console.error(e.message);
      return false;
   }
};

const sendMessageByPresentationCode = async (code, message) => {
   const uid = getItem(LOCAL_STORAGE.UUID);

   console.log("[SERVICE][PRESENTATION] sendMessage: ", {
      code,
      uid,
      message
   });

   try {
      const res = await axiosClient.post(`/chat/new-message`, {
         code,
         uid,
         message
      });

      console.log("res: ", res);
      return camelcaseKeys(res.data, { deep: true });
   } catch (e) {
      console.error(e.message);
      return false;
   }
};

const sendMessageByPresentationId = async (presentation_id, message) => {
   const uid = getItem(LOCAL_STORAGE.UUID);

   console.log("[SERVICE][PRESENTATION] sendMessage: ", {
      presentation_id,
      uid,
      message
   });

   try {
      const res = await axiosClient.post(`/chat/new-message`, {
         presentation_id,
         uid,
         message
      });

      console.log("res: ", res);
      return camelcaseKeys(res.data, { deep: true });
   } catch (e) {
      console.error(e.message);
      return false;
   }
};

const getQuestionsByPresentationId = async (presentation_id) => {
   const uid = getItem(LOCAL_STORAGE.UUID);

   console.log("[SERVICE][PRESENTATION] getQuestionsByPresentationId: ", {
      presentation_id,
      uid
   });
   try {
      const res = await axiosClient.get(`/question/list-question`, {
         params: {
            presentation_id,
            uid
         }
      });

      console.log("res: ", res);
      return camelcaseKeys(res.data, { deep: true });
   } catch (e) {
      console.error(e.message);
      return false;
   }
};

const getQuestionsByPresentationCode = async (code) => {
   const uid = getItem(LOCAL_STORAGE.UUID);

   console.log("[SERVICE][PRESENTATION] getQuestionsByPresentationCode: ", {
      code,
      uid
   });
   try {
      const res = await axiosClient.get(`/question/list-question`, {
         params: {
            code,
            uid
         }
      });

      console.log("res: ", res);
      return camelcaseKeys(res.data, { deep: true });
   } catch (e) {
      console.error(e.message);
      return false;
   }
};

const addQuestionByPresentationCode = async (code, question) => {
   const uid = getItem(LOCAL_STORAGE.UUID);

   console.log("[SERVICE][PRESENTATION] addQuestionByPresentationCode: ", {
      code,
      question,
      uid
   });

   try {
      const res = await axiosClient.post(`/question/new-question`, {
         code,
         question,
         uid
      });

      console.log("res: ", res);
      return camelcaseKeys(res.data, { deep: true });
   } catch (e) {
      console.error(e.message);
      return false;
   }
};

const presentSlideShow = async (presentation_id) => {
   try {
      const res = await axiosClient.post(`/presentation/present`, { presentation_id });
      return camelcaseKeys(res.data, { deep: true });
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
   deleteOldSession
};
