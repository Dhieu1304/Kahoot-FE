import classNames from "classnames/bind";

import GroupItem from "./GroupItem";
import TopBar from "./TopBar";

import styles from "./ManageGroupList.module.scss";
const cx = classNames.bind(styles);

function ManageGroupList() {
   return (
      <div className={cx("container")}>
         <TopBar />
         <div className={cx("group-list")}>
            <GroupItem />
            <GroupItem />
            <GroupItem />
            <GroupItem />
            <GroupItem />
            <GroupItem />
            <GroupItem />
            <GroupItem />
            <GroupItem />
            <GroupItem />
            <GroupItem />
            <GroupItem />
            <GroupItem />
            <GroupItem />
            <GroupItem />
            <GroupItem />
            <GroupItem />
            <GroupItem />
            <GroupItem />
            <GroupItem />
         </div>
      </div>
   );
}

export default ManageGroupList;
