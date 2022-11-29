import { useState } from "react";
import Context from "./context";

function Provider({ children }) {
   const [users, setUsers] = useState([]);
   const state = {
      users
   };
   const method = {
      setUsers
   };

   return <Context.Provider value={{ state, method }}>{children}</Context.Provider>;
}

export default Provider;
