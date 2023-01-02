import classNames from "classnames/bind";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import styles from "./SidebarItem.module.scss";

const cx = classNames.bind(styles);

// matchLink is used to active sidebar item which is differenct link with "to"

/*
 ex:
 to: /presentation/9/user
 new path: /presentation/9/group =>
 
 if we use matchLink={`${preLink}/${item?.id.toString()}`} in SideBar
 path = /presentation/9/group => active = true
 path = /presentation/9/user => active = true

 else: (matchLink=undefined)
 path = /presentation/9/group => active = false
 path = /presentation/9/user => active = true
*/

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
