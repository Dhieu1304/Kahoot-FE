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
import { usePresentationStore } from "../store";

function ActionMenu({ data }) {
   const navigate = useNavigate();

   const presentationStore = usePresentationStore();

   const { renameModal, inviteModal, deleteModal, changePresentationTypeModal } = presentationStore;

   return (
      <CustomDropdownMenu>
         <CustomDropdownMenuItem
            label={"Present"}
            leftIcon={<FontAwesomeIcon icon={faPlay} size={"1x"} />}
            onClick={() => {
               navigate(`/presentation/${data?.id}/play`);
            }}
         />
         <CustomDropdownMenuItem
            label={"View results"}
            leftIcon={<FontAwesomeIcon icon={faSquarePollVertical} size={"1x"} />}
         />
         <CustomDropdownMenuItem
            label={"Add collaborator"}
            leftIcon={<FontAwesomeIcon icon={faUserGroup} size={"1x"} />}
            onClick={() => {
               console.log("id: ", data?.id);
               inviteModal.setData(data?.id);
               inviteModal.setShow(true);
            }}
         />
         <CustomDropdownMenuItem
            label={"Manage user"}
            leftIcon={<FontAwesomeIcon icon={faUserGroup} size={"1x"} />}
            onClick={() => navigate(`/presentation/${data?.id}/user`)}
         />
         <CustomDropdownMenuItem
            label={"Share"}
            leftIcon={<FontAwesomeIcon icon={faShareNodes} size={"1x"} />}
         />
         <CustomDropdownMenuItem
            label={"Rename"}
            leftIcon={<FontAwesomeIcon icon={faPen} size={"1x"} />}
            onClick={() => {
               renameModal.setShow(true);
               renameModal.setData(data?.id);
            }}
         />

         <CustomDropdownMenuItem
            label={data?.presentationTypeId === 1 ? "Make Private" : "Make Public"}
            leftIcon={<FontAwesomeIcon icon={faPen} size={"1x"} />}
            onClick={() => {
               changePresentationTypeModal.setShow(true);
               changePresentationTypeModal.setData(data);
            }}
         />

         {presentationStore.state.listType === "OWNER" && (
            <CustomDropdownMenuItem
               label={"Delete"}
               leftIcon={<FontAwesomeIcon icon={faTrash} size={"1x"} />}
               onClick={() => {
                  deleteModal.setShow(true);
                  deleteModal.setData(data?.id);
               }}
            />
         )}
      </CustomDropdownMenu>
   );
}

export default ActionMenu;
