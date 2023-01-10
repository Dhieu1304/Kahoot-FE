import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import { Link, useNavigate } from "react-router-dom";

import Avatar from "../../../../../components/Avatar";
import styles from "./GroupItem.module.scss";
import { useGroupLayoutStore } from "../../../../../layouts/GroupLayout/hooks";
import { useMediaQuery } from "react-responsive";

const cx = classNames.bind(styles);

function GroupItem({ group }) {
   const { handleUpdateRecentSideBarMenuBottomItems } = useGroupLayoutStore();
   const isMobile = useMediaQuery({ maxWidth: 767 });

   return (
      <Link
         to={`/group/${group.id.toString()}/user`}
         className={cx("container", { isMobile })}
         onClick={() => {
            handleUpdateRecentSideBarMenuBottomItems(group);
         }}
      >
         <div className={cx("top")}>
            <div className={cx("user-list")}>
               {group.groupUsers.map((groupUser, index) => {
                  return (
                     index < 5 && (
                        <div
                           key={index}
                           className={cx("user-item")}
                           style={{
                              zIndex: group.groupUsers.length + 2 - index,
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
            <span className={cx("group-name")}>{group.name}</span>
         </div>
      </Link>
   );
}

export default GroupItem;
