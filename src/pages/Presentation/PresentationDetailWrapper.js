import { Outlet } from "react-router-dom";

function PresentationDetailWrapper() {
   return (
      <div>
         <h1>PresentationDetailWrapper</h1>
         <Outlet />;
      </div>
   );
}

export default PresentationDetailWrapper;
