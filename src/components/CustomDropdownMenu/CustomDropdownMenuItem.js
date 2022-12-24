import { Dropdown } from "react-bootstrap";

import classNames from "classnames/bind";
import styles from "./CustomDropdownMenu.module.scss";
const cx = classNames.bind(styles);

function CustomDropdownMenuItem({ label, leftIcon, onClick }) {
   return (
      <Dropdown.Item className={cx("item")} onClick={onClick}>
         {leftIcon}
         <span className={cx("label")}>{label}</span>
      </Dropdown.Item>
   );
}

export default CustomDropdownMenuItem;
