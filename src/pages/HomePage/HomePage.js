import { useContext } from "react";
import { AuthContext } from "../../providers/auth/provider";

function HomePage() {
   const authContext = useContext(AuthContext);
   console.log(">>>>>> authContext User:", authContext.user);
   return <h1>HomePage</h1>;
}

export default HomePage;
