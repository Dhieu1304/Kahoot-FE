import camelcaseKeys from "camelcase-keys";
import snakecaseKeys from "snakecase-keys";
import axiosClient from "../config/axiosClient";
import mockApi from "../mockApi";

const getOwnedPresentations = async () => {
   console.log("[SERVICE][PRESENTATION] getOwnedPresentations");

   try {
      const res = await axiosClient.get(`/presentation/list`);
      // console.log("res: ", res);

      const { rows: presentations, count } = res.data;

      return camelcaseKeys({ presentations, count }, { deep: true });
   } catch (e) {
      console.error(e.message);

      return false;
   }
};

const createPresentation = async (name, type = "PUBLIC") => {
   console.log("[SERVICE][PRESENTATION] createPresentation: ", {
      name,
      type
   });

   try {
      const res = await axiosClient.post(`/presentation/create`, {
         name,
         type
      });
      // console.log("res: ", res);

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

const savePresentation = async (presentation) => {
   const { id: presentationId, name, presentationTheme, presentationType } = presentation;
   const type = presentationType.name || "PUBLIC";
   const themeId = presentationTheme.id;
   try {
      const res = await axiosClient.put(`/presentation/edit`, {
         presentationId,
         name,
         type,
         themeId
      });
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
      const { slideTypeId: slide_type_id, title, body } = slide;

      return {
         ordinal_slide_number,
         slide_type_id,
         title,
         body
      };
   });

   console.log("data: ", data);

   try {
      const res = await axiosClient.put(`/slide/update`, {
         presentation_id,
         data
      });

      console.log("res: ", res);

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
      return camelcaseKeys(res.data, { deep: true });
   } catch (e) {
      console.error(e.message);
      return false;
   }
};

export default {
   getOwnedPresentations,
   getAllSlidesByPresentationId,
   getPresentationById,
   getSlideById,
   getResultBySlideId,
   createPresentation,
   updateSlides,
   savePresentation,
   deletePresentationById
};
