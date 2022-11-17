import classNames from "classnames/bind";
import styles from "./MenuItem.module.scss";

const cx = classNames.bind(styles);

function MenuItem({ label, leftIcon, active, onClick }) {
   return (
      <li className={cx("container", { active })} onClick={onClick}>
         {leftIcon && <div className={cx("icon-wrapper")}>{leftIcon}</div>}
         <span className={cx("label")}>{label}</span>
      </li>
   );
}

export default MenuItem;
