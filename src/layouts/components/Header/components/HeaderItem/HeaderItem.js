import classNames from "classnames/bind";
import { Link, useMatch, useResolvedPath } from "react-router-dom";

import styles from "./HeaderItem.module.scss";
const cx = classNames.bind(styles);

function HeaderItem({ title, leftIcon, className, onClick, to }) {
   // Kiểm tra current path, nếu trùng với link click thì active HeaderItem
   // VD: current path: /group/... thì active HeaderItem có title là group

   const resolved = useResolvedPath(to);
   const active = useMatch({ path: resolved.pathname, end: false });

   const classes = cx("container", {
      [className]: className,
      active
   });

   return (
      <Link to={to} className={classes} onClick={onClick}>
         <div className={cx("left-icon-wrapper")}>{leftIcon}</div>
         <span>{title}</span>
      </Link>
   );
}

export default HeaderItem;
