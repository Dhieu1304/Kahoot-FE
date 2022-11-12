import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { forwardRef } from "react";

import "./Input.css";

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
      ...props
    },
    ref
  ) => {
    // console.log("error in input ", error);
    console.log("value in input ", value);

    return (
      <div className="input-wrapper">
        <div className="d-flex flex-row align-items-center input-container">
          <FontAwesomeIcon
            icon="fas fa-envelope fa-lg me-3 fa-fw"
            style={{ scale: "1.2" }}
            className="me-3"
          />
          <div className="input-field-wrapper">
            <input
              className="form-control input-field"
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

export default Input;
