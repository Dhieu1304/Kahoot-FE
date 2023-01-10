import { useState } from "react";

const useModal = () => {
   // filter state
   const [show, setShow] = useState(false);
   const [data, setData] = useState();

   return { show, setShow, data, setData };
};

export { useModal };
