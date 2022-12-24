import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dropdown } from "react-bootstrap";
import classNames from "classnames/bind";
import styles from "./CustomDropdownMenu.module.scss";
import CustomToggleDropdownBtn from "../CustomToggleDropdownBtn";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

function ActionMenu({ children }) {
   return (
      <Dropdown className={cx("container")}>
         <Dropdown.Toggle as={CustomToggleDropdownBtn}>
            <FontAwesomeIcon icon={faEllipsis} size={"1x"} className={cx("toggle-icon")} />
         </Dropdown.Toggle>
         <Dropdown.Menu className={cx("menu")}>{children}</Dropdown.Menu>
      </Dropdown>
   );
}

export default ActionMenu;
