import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import Avatar from "../../../../../components/Avatar/Avatar";
import styles from "./GroupItem.module.scss";

const cx = classNames.bind(styles);

function GroupItem() {
   return (
      <div className={cx("container")}>
         <div className={cx("top")}>
            <div className={cx("user-list")}>
               <div className={cx("user-item")}>
                  <Avatar
                     src={
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1lU_Z3d6va3xVuzGdngT4mBWdhuEFrgNk6hngAsnw&s"
                     }
                     rounded
                     size={25}
                  />
               </div>
            </div>
            <div className={cx("setting")}>
               <FontAwesomeIcon icon="fa-solid fa-ellipsis-vertical" />
            </div>
         </div>

         <div className={cx("bottom")}>
            <span className={cx("group-name")}>Group 1</span>
         </div>
      </div>
   );
}

export default GroupItem;
