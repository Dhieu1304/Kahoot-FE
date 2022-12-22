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

         rightBtn,
         hidden,
         hiddenInputField,
         multiple,
         ...props
      },
      ref
   ) => {
      const Comp = multiple ? "textarea" : "input";

      return (
         <div className={cx("wrapper", { hidden })}>
            {showLabel && <span className={cx("label")}>{label}</span>}
            <div className={cx("container")}>
               <Comp
                  className={cx("input-field", { hiddenInputField })}
                  placeholder={placeholder}
                  type={type}
                  value={value}
                  required
                  {...props}
                  ref={ref}
                  readOnly={disable}
                  multiple={multiple}
                  style={
                     multiple && {
                        height: 100
                     }
                  }
               />
               {rightBtn && <div className={cx("rightBtn-container")}>{rightBtn}</div>}
            </div>
            {error && (
               <span className={cx("error")}>
                  {label} {error?.message}
               </span>
            )}
         </div>
      );
   }
);

export default Input;
