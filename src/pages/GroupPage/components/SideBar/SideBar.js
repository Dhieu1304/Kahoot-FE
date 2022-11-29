import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import { useMediaQuery } from "react-responsive";

import MenuItem from "./MenuItem";

import styles from "./SideBar.module.scss";

import * as localStorageApp from "../../../../utils/localStorage";
import { Navbar, Offcanvas } from "react-bootstrap";

const cx = classNames.bind(styles);

const menuTopItems = [
   {
      name: "Groups I manage",
      leftIcon: <FontAwesomeIcon className={cx("icon")} icon="fa-solid fa-users" />,
      to: "owned"
   },

   {
      name: "Groups I've joined",
      leftIcon: <FontAwesomeIcon className={cx("icon")} icon="fa-solid fa-user" />,
      to: "joined"
   }
];

function SideBar({ recentGroupsList, setRecentGroupsList, showSideBar, setShowSideBar }) {
   const mobile = useMediaQuery({ query: "(max-width: 1224px)" });

   const handleUpdateRecentGroupsList = (group, index) => {
      if (recentGroupsList.includes(group)) {
         // do nothing
      } else {
         const newRecentGroupsList = [group, ...recentGroupsList];
         newRecentGroupsList.pop();
         setRecentGroupsList(newRecentGroupsList);
         localStorageApp.setItem(localStorageApp.LOCAL_STORAGE, newRecentGroupsList);
      }
   };

   const render = () => {
      return (
         <div className={cx("container", { mobile })}>
            <div className={cx("top")}>
               <ul className={cx("menu")}>
                  {menuTopItems.map((menuItem, index) => (
                     <MenuItem
                        to={menuItem.to}
                        key={index}
                        label={menuItem.name}
                        leftIcon={menuItem.leftIcon}
                     />
                  ))}
               </ul>
            </div>
            <div className={cx("bottom")}>
               <span className={cx("title")}>Recent groups</span>
               <ul className={cx("menu")}>
                  {recentGroupsList &&
                     recentGroupsList.map((group, index) => (
                        <MenuItem
                           key={index}
                           to={"list/" + group.id.toString()}
                           label={group.name}
                           onClick={() => handleUpdateRecentGroupsList(group, index)}
                        />
                     ))}
               </ul>
            </div>
         </div>
      );
   };

   return mobile ? (
      <Offcanvas id="groupSidebar" show={showSideBar} onHide={() => setShowSideBar(false)}>
         {render()}
      </Offcanvas>
   ) : (
      <div>{render()}</div>
   );
}

export default SideBar;
