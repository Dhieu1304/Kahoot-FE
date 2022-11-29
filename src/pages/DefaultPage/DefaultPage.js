import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function DefaultPage() {
   const navigate = useNavigate();

   useEffect(() => {
      navigate("/home");
   }, []);

   return;
}

export default DefaultPage;
