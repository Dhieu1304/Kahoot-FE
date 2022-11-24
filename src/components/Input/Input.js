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
         onChange,
         LeftIconComponent,
         leftIcon,
         ...props
      },
      ref
   ) => {
      return (
         <div className={cx("wrapper")}>
            {showLabel && <span className={cx("label")}>{label}</span>}
            <input
               className={cx("container")}
               placeholder={placeholder}
               type={type}
               value={value}
               onChange={onChange}
               required
               {...props}
               ref={ref}
            />
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
