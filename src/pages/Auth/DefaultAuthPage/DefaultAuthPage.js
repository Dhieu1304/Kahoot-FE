import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../providers/auth";

function DefaultAuthPage() {
   const authContext = useContext(AuthContext);
   const navigate = useNavigate();

   useEffect(() => {
      if (authContext.isLogin) {
         navigate("/");
      } else {
         navigate("/auth/login");
      }
   }, []);
}

export default DefaultAuthPage;
