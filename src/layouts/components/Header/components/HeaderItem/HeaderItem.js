import classNames from "classnames/bind";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import styles from "./HeaderItem.module.scss";
const cx = classNames.bind(styles);

function HeaderItem({ title, leftIcon, className, active, onClick }) {
   const classes = cx("container", {
      [className]: className,
      active
   });

   return (
      <div className={classes} onClick={onClick}>
         <div className={cx("left-icon-wrapper")}>{leftIcon}</div>
         <span>{title}</span>
      </div>
   );
}

export default HeaderItem;
