import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function LinkPage() {
   const params = useParams();

   const { path } = params;
   //    const [success, setSucess] = useState(false);

   const navigate = useNavigate();
   useEffect(() => {
      const loadJointGroupByLink = async () => {
         const result = await joinGroupByLink(path);

         if (result) {
            navigate("/group/joined");
         } else {
         }
      };

      if (path) {
         loadJointGroupByLink();
      }
   }, [path]);

   //    useEffect(() => {}, [success]);

   return <div></div>;
}

return LinkPage;
