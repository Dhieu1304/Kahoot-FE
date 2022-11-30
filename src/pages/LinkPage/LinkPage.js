import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { joinGroupByEmail, joinGroupByLink } from "../../services/groupService";

function LinkPage() {
   const params = useParams();

   //    const { path } = params;
   //    const [success, setSucess] = useState(false);

   const path =
      "http://localhost:3043/group/join-by-email?token=U2FsdGVkX1988zgUAdbTI3od0JHY+4MQfMNkeU4O4/Lu5kmqnD9+HpvaUv/ydJLa2Vd38WK34ueIBtTNqhz7zkVFB/M/FI85VCmgSra/g8n9zGGOCDxeG9uPb845jylk";

   console.log("path: ", path);

   const navigate = useNavigate();
   useEffect(() => {
      const loadJointGroupByLink = async () => {
         const result = await joinGroupByEmail(path);

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
   }, [path]);

   //    useEffect(() => {}, [success]);

   return <div></div>;
}

export default LinkPage;
