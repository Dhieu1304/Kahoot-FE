import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCompass, faHouse, faList, faShop, faUsers } from "@fortawesome/free-solid-svg-icons";

export const headerItemsData = [
   {
      title: "Home",
      leftIcon: <FontAwesomeIcon icon={faHouse} />,
      link: "/home"
   },
   {
      title: "Discover",
      leftIcon: <FontAwesomeIcon icon={faCompass} />,
      link: "/discover"
   },
   {
      title: "Library",
      leftIcon: <FontAwesomeIcon icon={faList} />,
      link: "/library"
   },
   {
      title: "Group",
      leftIcon: <FontAwesomeIcon icon={faUsers} />,
      link: "/group"
   },
   {
      title: "Market",
      leftIcon: <FontAwesomeIcon icon={faShop} />,
      link: "/market"
   }
];
