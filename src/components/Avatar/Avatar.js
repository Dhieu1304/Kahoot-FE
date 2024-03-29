import classNames from "classnames/bind";

import images from "../../assets/images";
import styles from "./Avatar.module.scss";

const cx = classNames.bind(styles);

function Avatar({ title, src = images.noAvatar, placeholder, className, rounded, size, onClick }) {
   const classes = cx("container", {
      [className]: className,
      rounded
   });

   return (
      <div className={cx("wrapper")} onClick={onClick}>
         <div className={classes} style={size && { width: size, height: size }}>
            <img className={cx("img")} src={src || images.noAvatar} placeholder={placeholder} />
         </div>
      </div>
   );
}

export default Avatar;
