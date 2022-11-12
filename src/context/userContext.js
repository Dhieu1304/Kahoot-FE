import { createContext, useState } from "react";

const UserContext = createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const changeUser = (_user) => {
    setUser(_user);
  };
  const value = { user, changeUser };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export { UserContext, UserProvider };
