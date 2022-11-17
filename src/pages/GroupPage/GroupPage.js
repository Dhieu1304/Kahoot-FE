import classNames from "classnames/bind";
import SideBar from "./components/SideBar";
import TopBar from "./components/TopBar";

import styles from "./GroupPage.module.scss";

const cx = classNames.bind(styles);

function GroupPage({ children }) {
    return (
        <div className={cx("wrapper")}>
            <SideBar />
            <div className={cx("container")}>
                <TopBar />
                <div className={cx("content")}>{children}</div>
            </div>
        </div>
    );
}

export default GroupPage;
