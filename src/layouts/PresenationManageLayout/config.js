import { faUser, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const menuTop = {
   label: "Manage",
   items: [
      {
         name: "Owned by me",
         leftIcon: <FontAwesomeIcon size="1x" icon={faUsers} />,
         to: "/presentation/owned"
      },

      {
         name: "Joined by me",
         leftIcon: <FontAwesomeIcon size="1x" icon={faUser} />,
         to: "/presentation/joined"
      }
   ]
};
