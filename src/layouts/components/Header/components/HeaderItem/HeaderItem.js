import classNames from "classnames/bind";

import styles from "./HeaderItem.module.scss";
const cx = classNames.bind(styles);

function HeaderItem({ title, leftIcon, className, active }) {
   const classes = cx("container", {
      [className]: className,
      active
   });

   return (
      <div className={classes}>
         <div className={cx("left-icon-wrapper")}>{leftIcon}</div>
         <span>{title}</span>
      </div>
   );
}

export default HeaderItem;
