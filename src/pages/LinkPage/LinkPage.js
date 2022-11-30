import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { joinGroupByEmail, joinGroupByLink } from "../../services/groupService";

function LinkPage() {
   const { search } = useLocation();

   console.log("search: ", search);

   const xxx = search.toString().split("?queryToken=")[1];

   console.log("xxx: ", xxx);

   // console.log("search2: ", decodeURIComponent(xxx));
   // console.log("queryToken: ", queryToken);

   const navigate = useNavigate();
   useEffect(() => {
      const loadJointGroupByLink = async () => {
         //  const result = await joinGroupByEmail(path);

         if (result) {
            navigate("/group/joined");
            toast("Join Success");
         } else {
            navigate("/home");
            toast("Join Fail");
         }
      };

      if (path) {
         loadJointGroupByLink();
      }
   }, [searchParams]);

   //    useEffect(() => {}, [success]);

   return <div></div>;
}

export default LinkPage;
