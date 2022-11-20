import classNames from "classnames/bind";

import { Link } from "react-router-dom";
import MenuItem from "./MenuItem";

import styles from "./SideBar.module.scss";

const cx = classNames.bind(styles);

function SideBar({
   menuTopItems,
   recentGroupsList,
   menuTopItemActiveIndex,
   recentGroupItemActiveIndex,
   handleMenuTopItemClick,
   handleGroupItemClick
}) {
   return (
      <div className={cx("container")}>
         <div className={cx("top")}>
            <ul className={cx("menu")}>
               {menuTopItems.map((menuItem, index) => (
                  <Link to={"manageGroupList"}>
                     <MenuItem
                        key={index}
                        label={menuItem.name}
                        leftIcon={menuItem.leftIcon}
                        active={menuTopItemActiveIndex === index}
                        onClick={() => handleMenuTopItemClick(index)}
                     />
                  </Link>
               ))}
            </ul>
         </div>
         <div className={cx("bottom")}>
            <span className={cx("title")}>Recent groups</span>
            <ul className={cx("menu")}>
               {recentGroupsList.map((group, index) => (
                  <Link to={"manageGroup"}>
                     <MenuItem
                        key={index}
                        label={group.name}
                        active={recentGroupItemActiveIndex === index}
                        onClick={() => handleGroupItemClick(index)}
                     />
                  </Link>
               ))}
            </ul>
         </div>
      </div>
   );
}

export default SideBar;
