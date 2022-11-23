import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { UserProvider } from "./context/userContext";
import GlobalStyles from "./components/GlobalStyles/GlobalStyles";
import { AuthProvider } from "./providers/auth/provider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
   <React.StrictMode>
      <GlobalStyles>
         {/*<UserProvider>
            <App />
         </UserProvider>*/}
         <AuthProvider>
            <App />
         </AuthProvider>
      </GlobalStyles>
   </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
