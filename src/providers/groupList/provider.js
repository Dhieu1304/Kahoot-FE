import { useState } from "react";
import Context from "./context";

function Provider({ children }) {
   const [groups, setGroups] = useState([]);
   const state = {
      groups
   };
   const method = {
      setGroups
   };

   return <Context.Provider value={{ state, method }}>{children}</Context.Provider>;
}

export default Provider;
