import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "../../../../../components/Avatar/Avatar";
import styles from "./GroupItem.module.scss";

const cx = classNames.bind(styles);

function GroupItem({ data, onClick }) {
   // console.log("data in GroupItem: ", data);

   const navigate = useNavigate();
   return (
      <div
         // to={`/group/${data.id.toString()}`}
         className={cx("container")}
         onClick={() => {
            navigate(`/group/${data.id.toString()}`);
            onClick && onClick();
         }}
      >
         <div className={cx("top")}>
            <div className={cx("user-list")}>
               {data.groupUsers.map((groupUser, index) => (
                  <div
                     key={index}
                     className={cx("user-item")}
                     style={{
                        zIndex: data.groupUsers.length + 2 - index,
                        left: index * 10 + 10
                     }}
                  >
                     <Avatar src={groupUser.user.avatar} rounded size={25} />
                  </div>
               ))}
            </div>
            <div className={cx("setting")}>
               <FontAwesomeIcon icon="fa-solid fa-ellipsis-vertical" />
            </div>
         </div>

         <div className={cx("bottom")}>
            <span className={cx("group-name")}>{data.name}</span>
         </div>
      </div>
   );
}

export default GroupItem;
