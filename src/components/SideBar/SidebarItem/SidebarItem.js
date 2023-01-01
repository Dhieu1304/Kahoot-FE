import classNames from "classnames/bind";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import styles from "./SidebarItem.module.scss";

const cx = classNames.bind(styles);

function SidebarItem({ label, leftIcon, onClick, to, matchLink }) {
   const resolved = useResolvedPath(matchLink || to);
   const active = useMatch({ path: resolved.pathname, end: false });

   return (
      <Link to={to} className={cx("container", { active })} onClick={onClick}>
         {leftIcon && <div className={cx("icon-wrapper")}>{leftIcon}</div>}
         <span className={cx("label")}>{label}</span>
      </Link>
   );
}

export default SidebarItem;
