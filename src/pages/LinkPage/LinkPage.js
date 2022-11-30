import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { joinGroupByEmailToken } from "../../services/groupService";

function LinkPage() {
   const [searchParams] = useSearchParams();

   const navigate = useNavigate();
   useEffect(() => {
      const loadJointGroupByLink = async () => {
         const result = await joinGroupByEmailToken(token);

         if (result) {
            navigate("/group/joined");
            toast("Join Success");
         } else {
            navigate("/home");
            toast("Join Fail");
         }
      };

      const token = searchParams.get("token");
      loadJointGroupByLink(token);
   }, []);

   //    useEffect(() => {}, [success]);

   return <div></div>;
}

export default LinkPage;
