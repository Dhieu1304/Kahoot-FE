import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { forwardRef } from "react";

import classNames from "classnames/bind";

import styles from "./Input.module.scss";

const cx = classNames.bind(styles);

const Input = forwardRef(
   (
      {
         value,
         showLabel,
         label,
         placeholder,
         type,
         styleType,
         error,
         disable,
         onChange,
         rightBtn,
         ...props
      },
      ref
   ) => {
      console.log("disable: ", disable);
      return (
         <div className={cx("wrapper")}>
            {showLabel && <span className={cx("label")}>{label}</span>}
            <div className={cx("container")}>
               <input
                  className={cx("input-field")}
                  placeholder={placeholder}
                  type={type}
                  value={value}
                  onChange={onChange}
                  required
                  {...props}
                  ref={ref}
                  readOnly={disable}
               />
               {rightBtn && <div className={cx("rightBtn-container")}>{rightBtn}</div>}
            </div>
            {error && (
               <span className={cx("error")}>
                  {label} {error.message}
               </span>
            )}
         </div>
      );
   }
);

export default Input;
