import classNames from "classnames/bind";

import styles from "./Button.module.scss";

const cx = classNames.bind(styles);

function Button({
   title,
   className,
   onClick,
   basic,
   basicBlue,
   // basicTeal,
   // basicYellow,
   // basicRed,
   outline,
   rounded,
   big
}) {
   const classes = cx("container", {
      [className]: className,
      basic,
      basicBlue,
      // basicTeal,
      // basicYellow,
      // basicRed,
      outline,
      rounded,
      big
   });

   return (
      <button className={classes}>
         <span className={cx("title")}>{title}</span>
      </button>
   );
}

export default Button;