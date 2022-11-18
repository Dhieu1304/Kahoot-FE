import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import Avatar from "../../../../../components/Avatar/Avatar";
import styles from "./GroupItem.module.scss";

const cx = classNames.bind(styles);

const users = [
   {
      avatar:
         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1lU_Z3d6va3xVuzGdngT4mBWdhuEFrgNk6hngAsnw&s"
   },
   {
      avatar:
         "https://toppng.com/uploads/preview/luffy-anime-one-piece-luffy-115628753714bjr6ypxar.png"
   },
   {
      avatar:
         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBgF6F0tdXZ285Cn693WRLLF2iaDuq6pjextY4sEw-&s"
   }
];

function GroupItem() {
   return (
      <div className={cx("container")}>
         <div className={cx("top")}>
            <div className={cx("user-list")}>
               {users.map((user, index) => (
                  <div
                     key={index}
                     className={cx("user-item")}
                     style={{
                        zIndex: users.length + 2 - index,
                        left: index * 10 + 10
                     }}
                  >
                     <Avatar src={user.avatar} rounded size={25} />
                  </div>
               ))}
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
