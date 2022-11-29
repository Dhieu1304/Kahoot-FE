import classNames from "classnames/bind";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import styles from "./MenuItem.module.scss";

const cx = classNames.bind(styles);

function MenuItem({ label, leftIcon, onClick, to }) {
   const resolved = useResolvedPath(to);
   const active = useMatch({ path: resolved.pathname, end: false });

   return (
      <Link to={to} className={cx("container", { active })} onClick={onClick}>
         {leftIcon && <div className={cx("icon-wrapper")}>{leftIcon}</div>}
         <span className={cx("label")}>{label}</span>
      </Link>
   );
}

export default MenuItem;
