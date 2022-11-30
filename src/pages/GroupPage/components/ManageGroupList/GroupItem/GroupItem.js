import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import { useNavigate } from "react-router-dom";

import Avatar from "../../../../../components/Avatar/Avatar";
import styles from "./GroupItem.module.scss";

const cx = classNames.bind(styles);

function GroupItem({ data, onClick }) {
   const navigate = useNavigate();
   return (
      <div
         // to={`/group/${data.id.toString()}`}
         className={cx("container")}
         onClick={() => {
            navigate(`/group/list/${data.id.toString()}`);
            onClick && onClick();
         }}
      >
         <div className={cx("top")}>
            <div className={cx("user-list")}>
               {data.groupUsers.map((groupUser, index) => {
                  return (
                     index < 5 && (
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
                     )
                  );
               })}
            </div>

            <div className={cx("setting")}>
               <FontAwesomeIcon icon={faEllipsisVertical} />
            </div>
         </div>

         <div className={cx("bottom")}>
            <span className={cx("group-name")}>{data.name}</span>
         </div>
      </div>
   );
}

export default GroupItem;
