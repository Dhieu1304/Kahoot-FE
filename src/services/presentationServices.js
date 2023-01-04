import camelcaseKeys from "camelcase-keys";
import snakecaseKeys from "snakecase-keys";
import axiosClient from "../config/axiosClient";
import mockApi from "../mockApi";

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
   console.log("[SERVICE] updateSlides");

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
   console.log("[SERVICE][PRESENTATION] addPresentationCoOwner: ", {
      presentation_id,
      email
   });

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
   console.log("[SERVICE][PRESENTATION] getPresentationUsers: ", { presentation_id });

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
   console.log("[SERVICE][PRESENTATION] getPresentationGroups: ", { presentation_id });

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
   console.log("[SERVICE][PRESENTATION] addGroup: ", { presentation_id, group_id });
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
   console.log("[SERVICE][PRESENTATION] deleteGroup: ", { presentation_id, group_id });
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
   deleteGroup
};
