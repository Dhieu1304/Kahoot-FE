import classNames from "classnames/bind";
import SideBar from "./components/SideBar";
import TopBar from "./components/ManageGroupList/TopBar";

import styles from "./GroupPage.module.scss";
import ManageGroupList from "./components/ManageGroupList";

const cx = classNames.bind(styles);

function GroupPage({ children }) {
   return (
      <div className={cx("wrapper")}>
         <SideBar />
         <div className={cx("container")}>
            <ManageGroupList />
         </div>
      </div>
   );
}

export default GroupPage;
