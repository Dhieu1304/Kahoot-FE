import classNames from "classnames/bind";

import TopBar from "./TopBar";

import styles from "./ManageGroup.module.scss";
const cx = classNames.bind(styles);

function ManageGroup() {
   return (
      <div className={cx("container")}>
         <TopBar />
      </div>
   );
}

export default ManageGroup;
