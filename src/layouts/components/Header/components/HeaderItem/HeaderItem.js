import classNames from "classnames/bind";
import { Link, useMatch, useResolvedPath } from "react-router-dom";

import styles from "./HeaderItem.module.scss";
const cx = classNames.bind(styles);

function HeaderItem({ title, leftIcon, className, onClick, to }) {
   const resolved = useResolvedPath(to);
   const active = useMatch({ path: resolved.pathname, end: false });

   const classes = cx("container", {
      [className]: className,
      active
   });

   console.log("classes: ", classes);

   return (
      <Link to={to} className={classes} onClick={onClick}>
         <div className={cx("left-icon-wrapper")}>{leftIcon}</div>
         <span>{title}</span>
      </Link>
   );
}

export default HeaderItem;
