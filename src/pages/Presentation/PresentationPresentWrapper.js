import { useState } from "react";
import { Outlet } from "react-router-dom";

function PresentationPresentWrapper() {
   const [value, setValue] = useState(1);

   const [value2, setValue2] = useState(2);

   return <Outlet context={{ value, setValue, value2, setValue2 }} />;
}

export default PresentationPresentWrapper;
