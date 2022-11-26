import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { forwardRef } from "react";

import "./AuthInput.css";

const AuthInput = forwardRef(
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
      // console.log("error in input ", error);
      console.log("value in input ", value);

      return (
         <div className="input-wrapper">
            <div className="d-flex flex-row align-items-center input-container">
               {LeftIconComponent && leftIcon && (
                  <LeftIconComponent
                     icon={leftIcon}
                     style={{ scale: "1.2" }}
                     className="me-3 fa-lg me-3 fa-fw"
                  />
               )}

               <div className="input-field-wrapper">
                  <input
                     className="py-3 form-control input-field"
                     placeholder={placeholder}
                     type={type}
                     value={value}
                     onChange={onChange}
                     {...props}
                     ref={ref}
                  />
               </div>
            </div>

            {error && (
               <span className="input-error">
                  {label} {error.message}
               </span>
            )}
         </div>
      );
   }
);

export default AuthInput;
