import axios from "axios";

const httpRequest = axios.create({
   baseURL: process.env.REACT_APP_BE_URL
});

export const get = async (path, options = {}) => {
   console.log("httpRequest: ", httpRequest);
   console.log("process.env.REACT_APP_BE_URL : ", process.env.REACT_APP_BE_URL);
   console.log("path: ", path);
   console.log("options: ", options);
   const response = await httpRequest.get(path, options);

   return response.data;
};

export default httpRequest;
