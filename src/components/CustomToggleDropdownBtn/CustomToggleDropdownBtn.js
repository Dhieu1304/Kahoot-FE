import React, { forwardRef } from "react";

// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
const CustomToggleDropdownBtn = forwardRef(({ children, onClick }, ref) => (
   <a
      href=""
      ref={ref}
      onClick={(e) => {
         e.preventDefault();
         onClick && onClick(e);
      }}
   >
      {children}
   </a>
));

export default CustomToggleDropdownBtn;
