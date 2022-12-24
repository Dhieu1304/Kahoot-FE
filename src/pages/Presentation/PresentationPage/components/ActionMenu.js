import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
   faPen,
   faPlay,
   faShareNodes,
   faSquarePollVertical,
   faTrash,
   faUserGroup
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

import CustomDropdownMenu from "../../../../components/CustomDropdownMenu";
import CustomDropdownMenuItem from "../../../../components/CustomDropdownMenu/CustomDropdownMenuItem";

function ActionMenu({ id }) {
   const navigate = useNavigate();

   return (
      <CustomDropdownMenu>
         <CustomDropdownMenuItem
            label={"Present"}
            leftIcon={<FontAwesomeIcon icon={faPlay} size={"1x"} />}
            onClick={() => {
               navigate(`/presentation/${id}/play`);
            }}
         />
         <CustomDropdownMenuItem
            label={"View results"}
            leftIcon={<FontAwesomeIcon icon={faSquarePollVertical} size={"1x"} />}
         />
         <CustomDropdownMenuItem
            label={"Invite collaborator"}
            leftIcon={<FontAwesomeIcon icon={faUserGroup} size={"1x"} />}
         />
         <CustomDropdownMenuItem
            label={"Share"}
            leftIcon={<FontAwesomeIcon icon={faShareNodes} size={"1x"} />}
         />
         <CustomDropdownMenuItem
            label={"Rename"}
            leftIcon={<FontAwesomeIcon icon={faPen} size={"1x"} />}
         />
         <CustomDropdownMenuItem
            label={"Delete"}
            leftIcon={<FontAwesomeIcon icon={faTrash} size={"1x"} />}
         />
      </CustomDropdownMenu>
   );
}

export default ActionMenu;