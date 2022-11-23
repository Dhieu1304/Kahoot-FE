import classNames from "classnames/bind";

import { Link } from "react-router-dom";
import MenuItem from "./MenuItem";

import styles from "./SideBar.module.scss";

const cx = classNames.bind(styles);

function SideBar({
   menuTopItems,
   recentGroupsList,
   // menuTopItemActiveIndex,
   // recentGroupItemActiveIndex,
   // handleMenuTopItemClick,
   // handleGroupItemClick,

   currentSideBarMenuItem,
   setCurrentSideBarMenuItem
}) {
   return (
      <div className={cx("container")}>
         <div className={cx("top")}>
            <ul className={cx("menu")}>
               {menuTopItems.map((menuItem, index) => (
                  <Link to={menuItem.to}>
                     <MenuItem
                        key={index}
                        label={menuItem.name}
                        leftIcon={menuItem.leftIcon}
                        active={
                           currentSideBarMenuItem.type === "groups" &&
                           currentSideBarMenuItem.index === index
                        }
                        onClick={() => {
                           setCurrentSideBarMenuItem({
                              type: "groups",
                              index: index
                           });
                        }}
                     />
                  </Link>
               ))}
            </ul>
         </div>
         <div className={cx("bottom")}>
            <span className={cx("title")}>Recent groups</span>
            <ul className={cx("menu")}>
               {recentGroupsList.map((group, index) => (
                  <Link to={group.id.toString()}>
                     <MenuItem
                        key={index}
                        label={group.name}
                        active={
                           currentSideBarMenuItem.type === "group" &&
                           currentSideBarMenuItem.index === index
                        }
                        onClick={() => {
                           setCurrentSideBarMenuItem({
                              type: "group",
                              index: index
                           });
                        }}
                     />
                  </Link>
               ))}
            </ul>
         </div>
      </div>
   );
}

export default SideBar;
