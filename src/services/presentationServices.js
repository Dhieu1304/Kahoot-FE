import camelcaseKeys from "camelcase-keys";
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
   console.log("[SERVICE][PRESENTATION] getPresentationById: ", { id });
   const presentation = await mockApi.mockPresentation;

   return presentation;

   // try {
   //    const res = await axiosClient.get(`/presentation/${id}`);

   //    console.log("res: ", res);
   //    return presentation;
   //    return camelcaseKeys(res.data, { deep: true });
   // } catch (e) {
   //    console.error(e.message);
   //    return presentation;
   //    return false;
   // }

   //    console.log("presentation", presentation);
};

const getSlideById = async (id) => {
   console.log("[SERVICE][PRESENTATION] getSlideById: ", { id });
   const slide = await mockApi.mockSlide;

   //    console.log("presentation", presentation);

   return slide;
};

const getResultBySlideId = async (slideId) => {
   console.log("[SERVICE][PRESENTATION] getResultBySlideId: ", { slideId });
   const slide = await mockApi.mockResult;

   //    console.log("presentation", presentation);

   return slide;
};

export default {
   getOwnedPresentations,
   getPresentationById,
   getSlideById,
   getResultBySlideId,
   createPresentation
};
