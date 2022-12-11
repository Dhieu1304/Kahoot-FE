import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCompass, faHouse, faList, faShop, faUsers } from "@fortawesome/free-solid-svg-icons";

export const headerItemsData = [
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
   }
];
