import mockApi from "../mockApi";

const getPresentationById = async (id) => {
   console.log("[SERVICE][PRESENTATION] getPresentationById: ", { id });
   const presentation = await mockApi.mockPresentation;

   //    console.log("presentation", presentation);

   return presentation;
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
   getPresentationById,
   getSlideById,
   getResultBySlideId
};
