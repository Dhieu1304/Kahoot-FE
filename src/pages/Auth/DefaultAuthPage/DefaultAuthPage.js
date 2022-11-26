import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function DefaultAuthPage() {
   const navigate = useNavigate();

   useEffect(() => {
      navigate("/auth/login");
   }, []);

   return;
}

export default DefaultAuthPage;
