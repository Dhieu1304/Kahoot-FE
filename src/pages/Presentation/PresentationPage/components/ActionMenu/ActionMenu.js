import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dropdown } from "react-bootstrap";
import classNames from "classnames/bind";
import styles from "./ActionMenu.module.scss";
import CustomToggleDropdownBtn from "../../../../../components/CustomToggleDropdownBtn";
import {
   faEllipsis,
   faPen,
   faPlay,
   faShare,
   faShareNodes,
   faSquarePollVertical,
   faTrash,
   faUserGroup
} from "@fortawesome/free-solid-svg-icons";
const cx = classNames.bind(styles);

function ActionMenu({ id }) {
   return (
      <Dropdown className={cx("container")}>
         <Dropdown.Toggle as={CustomToggleDropdownBtn}>
            <FontAwesomeIcon icon={faEllipsis} size={"1x"} className={cx("toggle-icon")} />
         </Dropdown.Toggle>

         <Dropdown.Menu className={cx("menu")}>
            <Dropdown.Item className={cx("item")}>
               <FontAwesomeIcon icon={faPlay} size={"1x"} className={cx("left-icon")} />
               <span>Present</span>
            </Dropdown.Item>
            <Dropdown.Item className={cx("item")}>
               <FontAwesomeIcon
                  icon={faSquarePollVertical}
                  size={"1x"}
                  className={cx("left-icon")}
               />
               <span>View results</span>
            </Dropdown.Item>
            <Dropdown.Item className={cx("item")}>
               <FontAwesomeIcon icon={faUserGroup} size={"1x"} className={cx("left-icon")} />
               <span>Invite collaborator</span>
            </Dropdown.Item>
            <Dropdown.Item className={cx("item")}>
               <FontAwesomeIcon icon={faShareNodes} size={"1x"} className={cx("left-icon")} />
               <span>Share</span>
            </Dropdown.Item>
            <Dropdown.Item className={cx("item")}>
               <FontAwesomeIcon icon={faPen} size={"1x"} className={cx("left-icon")} />
               <span>Rename</span>
            </Dropdown.Item>
            <Dropdown.Item className={cx("item")}>
               <FontAwesomeIcon icon={faTrash} size={"1x"} className={cx("left-icon")} />
               <span>Delete</span>
            </Dropdown.Item>
         </Dropdown.Menu>
      </Dropdown>
   );
}

export default ActionMenu;
