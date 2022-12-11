import mockApi from "../mockApi";

const getPresentationById = async (id) => {
   console.log("[SERVICE][PRESENTATION] getPresentationById: ", { id });
   const presentation = await mockApi.mockPresentation;

   //    console.log("presentation", presentation);

   return presentation;
};

export default {
   getPresentationById
};
