import classNames from "classnames/bind";

import styles from "./Button.module.scss";

const cx = classNames.bind(styles);

function Button({
   title,
   className,
   onClick,
   basic,
   basicBlue,
   basicTeal,
   // basicYellow,
   // basicRed,
   cancel,
   submitModal,
   outline,
   rounded,
   big,
   leftIcon,
   rightIcon,
   w100
}) {
   const classes = cx("container", {
      [className]: className,
      basic,
      basicBlue,
      basicTeal,
      // basicYellow,
      // basicRed,
      cancel,
      submitModal,
      outline,
      rounded,
      big,
      w100
   });

   return (
      <button className={classes} onClick={onClick}>
         {leftIcon && <span className={cx("left-icon")}>{leftIcon}</span>}
         <span className={cx("title")}>{title}</span>
         {rightIcon && <span className={cx("right-icon")}>{rightIcon}</span>}
      </button>
   );
}

export default Button;
