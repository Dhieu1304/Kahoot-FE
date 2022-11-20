import classNames from "classnames/bind";
import SideBar from "./components/SideBar";
import TopBar from "./components/ManageGroupList/TopBar";

import styles from "./GroupPage.module.scss";
import ManageGroupList from "./components/ManageGroupList";
import ManageGroup from "./components/ManageGroup/ManageGroup";

const cx = classNames.bind(styles);

function GroupPage({ children }) {
   return (
      <div className={cx("wrapper")}>
         <SideBar />
         <div className={cx("container")}>
            <ManageGroupList />
            {/* <ManageGroup /> */}
         </div>
      </div>
   );
}

export default GroupPage;
