import "./register.css";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { UserContext } from "../context/userContext";
import axiosClient from "../config/axiosClient";

function Home() {
   const [isLoading, setLoading] = useState(true);
   const userContext = useContext(UserContext);
   useEffect(() => {
      axiosClient.get("/user/info").then(
         (result) => {
            setLoading(false);
            userContext.changeUser(result.data.data);
         },
         (error) => {
            // console.error(error);
            setLoading(false);
            userContext.changeUser(null);
         }
      );
   }, []);
   const { user } = userContext;

   const logout = () => {
      userContext.changeUser(null);
      localStorage.removeItem("ACCESS_TOKEN");
   };

   const render = () => {
      if (isLoading)
         return <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">...Loading!</p>;

      return (
         <>
            {user ? (
               <div>
                  <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Hello {user.name}</p>
                  <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                     <button onClick={() => logout()} className="btn btn-primary btn-lg">
                        Logout
                     </button>
                  </div>
               </div>
            ) : (
               <>
                  <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                     Welcome to my app!
                  </p>
                  <div style={{ display: "inline-flex" }}>
                     <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <Link to="/auth/register">
                           <button className="btn btn-primary btn-lg">Register</button>
                        </Link>
                     </div>
                     <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <Link to="/auth/login">
                           <button className="btn btn-primary btn-lg">Login</button>
                        </Link>
                     </div>
                  </div>
               </>
            )}
         </>
      );
   };
   return render();
}

export default Home;
