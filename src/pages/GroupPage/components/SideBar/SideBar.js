import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import { useState } from "react";
import MenuItem from "./MenuItem";

import styles from "./SideBar.module.scss";

const cx = classNames.bind(styles);

const menuTopItems = [
    {
        name: "Groups I manage",
        leftIcon: (
            <FontAwesomeIcon className={cx("icon")} icon="fa-solid fa-users" />
        ),
    },

    {
        name: "Groups I've joined",
        leftIcon: (
            <FontAwesomeIcon className={cx("icon")} icon="fa-solid fa-user" />
        ),
    },
];

const recentGroupsList = [
    {
        name: "Group 1",
    },
    {
        name: "Group 2",
    },
    {
        name: "Group 3",
    },
];

function SideBar() {
    const [menuTopItemActiveIndex, setMenuTopItemActiveIndex] = useState(
        menuTopItems.length >= 0 ? 0 : -1
    );
    const [recentGroupItemActiveIndex, setRecentGroupItemActiveIndex] =
        useState(-1);

    const handleMenuTopItemClick = (index) => {
        setMenuTopItemActiveIndex(index);
        setRecentGroupItemActiveIndex(-1);
    };

    const handleGroupItemClick = (index) => {
        setMenuTopItemActiveIndex(-1);
        setRecentGroupItemActiveIndex(index);
    };

    return (
        <div className={cx("container")}>
            <div className={cx("top")}>
                <ul className={cx("menu")}>
                    {menuTopItems.map((menuItem, index) => (
                        <MenuItem
                            key={index}
                            label={menuItem.name}
                            leftIcon={menuItem.leftIcon}
                            active={menuTopItemActiveIndex === index}
                            onClick={() => handleMenuTopItemClick(index)}
                        />
                    ))}
                </ul>
            </div>
            <div className={cx("bottom")}>
                <span className={cx("title")}>Recent groups</span>
                <ul className={cx("menu")}>
                    {recentGroupsList.map((group, index) => (
                        <MenuItem
                            key={index}
                            label={group.name}
                            active={recentGroupItemActiveIndex === index}
                            onClick={() => handleGroupItemClick(index)}
                        />
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default SideBar;
