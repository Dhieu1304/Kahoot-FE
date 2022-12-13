import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
   faCompass,
   faHouse,
   faJoint,
   faList,
   faShop,
   faUsers
} from "@fortawesome/free-solid-svg-icons";

export const privateHeaderItemsData = [
   {
      title: "Home",
      leftIcon: <FontAwesomeIcon icon={faHouse} />,
      link: "/home"
   },
   {
      title: "Group",
      leftIcon: <FontAwesomeIcon icon={faUsers} />,
      link: "/group"
   },
   {
      title: "Presentation",
      leftIcon: <FontAwesomeIcon icon={faShop} />,
      link: "/presentation"
   },
   {
      title: "Joint Presentation ",
      leftIcon: <FontAwesomeIcon icon={faJoint} />,
      link: "/presentation-client"
   }
];

export const publicHeaderItemsData = [
   {
      title: "Home",
      leftIcon: <FontAwesomeIcon icon={faHouse} />,
      link: "/home"
   },
   {
      title: "Joint Presentation ",
      leftIcon: <FontAwesomeIcon icon={faJoint} />,
      link: "/presentation-client"
   }
];
