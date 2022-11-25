import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { faTwitter, faFontAwesome } from "@fortawesome/free-brands-svg-icons";
import { faHatChef } from "@fortawesome/sharp-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";
import RegisterPage from "./pages/Auth/RegisterPage";
import LoginPage from "./pages/Auth/LoginPage";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import DefaultLayout from "./layouts/DefaultLayout/DefaultLayout";
import HomePage from "./pages/HomePage";
import GroupPage from "./pages/GroupPage";
import ManageGroupList from "./pages/GroupPage/components/ManageGroupList";
import ManageGroup from "./pages/GroupPage/components/ManageGroup/ManageGroup";

library.add(fas, faTwitter, faFontAwesome, faHatChef);

function App() {
   return (
      <div className="App">
         <Router>
            <div className="App">
               <Routes>
                  <Route
                     path={"/"}
                     element={
                        <DefaultLayout>
                           <HomePage />
                        </DefaultLayout>
                     }
                  />
                  <Route
                     path={"/group"}
                     element={
                        <DefaultLayout>
                           <GroupPage />
                        </DefaultLayout>
                     }
                  >
                     <Route path={"owned"} element={<ManageGroupList />}></Route>
                     <Route path={"joined"} element={<ManageGroupList />}></Route>
                     <Route path={":id"} element={<ManageGroup />}></Route>
                  </Route>
               </Routes>
               <Routes>
                  <Route
                     path={"/auth/register"}
                     element={
                        <AuthLayout>
                           <RegisterPage />
                        </AuthLayout>
                     }
                  />
                  <Route
                     path={"/auth/login"}
                     element={
                        <AuthLayout>
                           <LoginPage />
                        </AuthLayout>
                     }
                  />
                  {/*<Route
                            path={"/"}
                            element={
                                <AuthLayout>
                                    <Home />
                                </AuthLayout>
                            }
                        />*/}
               </Routes>
            </div>
         </Router>

         <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
         />
         <ToastContainer />
      </div>
   );
}

export default App;
