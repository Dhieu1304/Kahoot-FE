import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";
import RegisterPage from "./pages/Auth/RegisterPage";
import LoginPage from "./pages/Auth/LoginPage";
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import DefaultLayout from "./layouts/DefaultLayout/DefaultLayout";
import HomePage from "./pages/HomePage";
import GroupPage from "./pages/GroupPage";
import ManageGroupList from "./pages/GroupPage/components/ManageGroupList";
import ManageGroup from "./pages/GroupPage/components/ManageGroup/ManageGroup";
import { useContext, useEffect } from "react";
import { AuthContext } from "./providers/auth/provider";
import { getUserInfo } from "./services/authService";
import DefaultAuthPage from "./pages/Auth/DefaultAuthPage";
import ProfilePage from "./pages/ProfilePage";
import DefaultPage from "./pages/DefaultPage/DefaultPage";
import { GroupListProvider } from "./providers/groupList";
import { GroupItemProvider } from "./providers/groupItem";
import LinkPage from "./pages/LinkPage";

function App() {
   const authContext = useContext(AuthContext);

   useEffect(() => {
      const createCurrentAccount = async () => {
         const currentUser = await getUserInfo();
         authContext.setUser(currentUser);
         authContext.login();
      };
      createCurrentAccount();
   }, []);

   return (
      <div className="App">
         <Router>
            <div className="App">
               {authContext.user ? (
                  <Routes>
                     <Route
                        path={"/"}
                        element={
                           <DefaultLayout>
                              <DefaultPage />
                           </DefaultLayout>
                        }
                     />
                     <Route
                        path={"/home"}
                        element={
                           <DefaultLayout>
                              <HomePage />
                           </DefaultLayout>
                        }
                     />
                     <Route
                        path={"/discover"}
                        element={
                           <DefaultLayout>
                              <HomePage />
                           </DefaultLayout>
                        }
                     />
                     <Route
                        path={"/library"}
                        element={
                           <DefaultLayout>
                              <HomePage />
                           </DefaultLayout>
                        }
                     />
                     <Route
                        path={"/market"}
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
                        <Route
                           path={"owned"}
                           element={
                              <GroupListProvider>
                                 <ManageGroupList />
                              </GroupListProvider>
                           }
                        ></Route>
                        <Route
                           path={"joined"}
                           element={
                              <GroupListProvider>
                                 <ManageGroupList />
                              </GroupListProvider>
                           }
                        ></Route>
                        <Route path={"list"}>
                           <Route
                              path={":id"}
                              element={
                                 <GroupItemProvider>
                                    <ManageGroup />
                                 </GroupItemProvider>
                              }
                           ></Route>
                        </Route>
                     </Route>
                     <Route path={"link"}>
                        <Route path={":path"} element={<LinkPage />}></Route>
                     </Route>
                     <Route
                        path={"/profile"}
                        element={
                           <DefaultLayout>
                              <ProfilePage />
                           </DefaultLayout>
                        }
                     ></Route>
                  </Routes>
               ) : (
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
                     <Route path={"*"} element={<DefaultAuthPage />} />
                  </Routes>
               )}
            </div>
         </Router>

         <ToastContainer
            position="top-right"
            autoClose={50}
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
