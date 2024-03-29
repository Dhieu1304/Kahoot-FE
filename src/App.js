import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { v4 as uuidv4 } from "uuid";
import "./App.css";
import RegisterPage from "./pages/Auth/RegisterPage";
import LoginPage from "./pages/Auth/LoginPage";
import { BrowserRouter as Router, Routes, Route, Navigate, Link, Outlet } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import DefaultLayout from "./layouts/DefaultLayout/DefaultLayout";
import HomePage from "./pages/HomePage";

import { useContext, useEffect } from "react";
import { AuthContext } from "./providers/auth/provider";
import { getUserInfo } from "./services/authService";
import DefaultAuthPage from "./pages/Auth/DefaultAuthPage";
import ProfilePage from "./pages/ProfilePage";
import DefaultPage from "./pages/DefaultPage/DefaultPage";
import { GroupListProvider } from "./providers/groupList";
import { GroupItemProvider } from "./providers/groupItem";
import LinkPage from "./pages/LinkPage";

import PresentationPage from "./pages/Presentation/PresentationPage";

import PresentationDetailPageWrapper from "./pages/Presentation/PresentationDetailPage/PresentationDetailPageWrapper";
import PresentationDetailProvider from "./pages/Presentation/PresentationDetailPage/store/Provider";
import PresentationDetailPage from "./pages/Presentation/PresentationDetailPage/PresentationDetailPage";

import PresentationClientPage from "./pages/PresentationClient/PresentationClientPage";
import PresentationClientDetailPage from "./pages/PresentationClient/PresentationClientDetailPage/PresentationClientDetailPage";
import PresentationProvider from "./pages/Presentation/PresentationPage/store";

import PresentationPlayWrapper from "./pages/Presentation/PresentationPlay/PresentationPlayWrapper";
import PresentationPlayProvider from "./pages/Presentation/PresentationPlay/store/Provider";
import PresentationClientDetailProvider from "./pages/PresentationClient/PresentationClientDetailPage/store/Provider";
import PresenationManageLayout from "./layouts/PresenationManageLayout";
import PresentationManageProvider from "./pages/Presentation/PresentationManage/store/Provider";
import PresentationManageUser from "./pages/Presentation/PresentationManage/PresentationManageUser";
import PresentationManageReport from "./pages/Presentation/PresentationManage/PresentationManageReport";
import PresentationManageGroup from "./pages/Presentation/PresentationManage/PresentationManageGroup";

import * as localStorageApp from "./utils/localStorage";
import { getItem, LOCAL_STORAGE } from "./utils/localStorage";
import GroupLayout from "./layouts/GroupLayout";
import GroupPage from "./pages/Group/GroupPage";
import GroupDetailPage, {
   GroupDetailPresentationPage,
   GroupDetailUserPage
} from "./pages/Group/GroupDetailPage";
import ForgetPassword from "./pages/Auth/ForgetPassword";
import ChangePasswordPage from "./pages/ChangePasswordPage/ChangePasswordPage";

function App() {
   const authContext = useContext(AuthContext);

   useEffect(() => {
      const createCurrentAccount = async () => {
         const currentUser = await getUserInfo();
         if (!currentUser) {
            const currentUID = getItem(LOCAL_STORAGE.UUID);
            if (!currentUID) {
               const uuid = uuidv4();
               localStorageApp.setItem(localStorageApp.LOCAL_STORAGE.UUID, uuid);
            }
         }
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
                        path={"/group"}
                        element={
                           <GroupLayout>
                              <Outlet />
                           </GroupLayout>
                        }
                     >
                        <Route path="" element={<Navigate to={"owned"} replace />} />
                        <Route path={"owned"} element={<GroupPage />} />
                        <Route path={"joined"} element={<GroupPage />} />
                        <Route
                           path={":groupId"}
                           element={
                              <GroupDetailPage>
                                 <Outlet />
                              </GroupDetailPage>
                           }
                        >
                           <Route path="" element={<Navigate to={"user"} replace />} />
                           <Route path={"user"} element={<GroupDetailUserPage />} />
                           <Route path={"presentation"} element={<GroupDetailPresentationPage />} />
                        </Route>
                     </Route>

                     <Route path={"group/join-by-email"} element={<LinkPage />}></Route>
                     <Route
                        path={"/profile"}
                        element={
                           <DefaultLayout>
                              <ProfilePage />
                           </DefaultLayout>
                        }
                     ></Route>
                     <Route
                        path={"/change-password"}
                        element={
                           <DefaultLayout>
                              <ChangePasswordPage />
                           </DefaultLayout>
                        }
                     ></Route>
                     <Route path={"/presentation"}>
                        <Route path="" element={<Navigate to={"owned"} replace />} />
                        <Route
                           path="owned"
                           element={
                              <PresenationManageLayout>
                                 <PresentationProvider>
                                    <PresentationPage />
                                 </PresentationProvider>
                              </PresenationManageLayout>
                           }
                        />
                        <Route
                           path="joined"
                           element={
                              <PresenationManageLayout>
                                 <PresentationProvider>
                                    <PresentationPage />
                                 </PresentationProvider>
                              </PresenationManageLayout>
                           }
                        />

                        <Route path=":id">
                           <Route path="" element={<h2>No outlet</h2>} />
                           <Route
                              path="user"
                              element={
                                 <PresenationManageLayout>
                                    <PresentationManageProvider>
                                       <PresentationManageUser />
                                    </PresentationManageProvider>
                                 </PresenationManageLayout>
                              }
                           />
                           <Route
                              path="group"
                              element={
                                 <PresenationManageLayout>
                                    <PresentationManageProvider>
                                       <PresentationManageGroup />
                                    </PresentationManageProvider>
                                 </PresenationManageLayout>
                              }
                           />
                           <Route
                              path="report"
                              element={
                                 <PresenationManageLayout>
                                    <PresentationManageProvider>
                                       <PresentationManageReport />
                                    </PresentationManageProvider>
                                 </PresenationManageLayout>
                              }
                           />
                           <Route
                              path="edit"
                              element={
                                 <PresentationDetailProvider>
                                    <PresentationDetailPageWrapper />
                                 </PresentationDetailProvider>
                              }
                           >
                              <Route path=":slideId" element={<PresentationDetailPage />} />
                           </Route>

                           <Route
                              path="play"
                              element={
                                 <PresentationPlayProvider>
                                    <PresentationPlayWrapper />
                                 </PresentationPlayProvider>
                              }
                           >
                              {/* <Route path=":slideId" element={<PresentationPlayPage />} /> */}
                           </Route>
                        </Route>
                     </Route>
                     <Route path={"/presentation-client"}>
                        <Route path={""} element={<PresentationClientPage />} />
                        <Route
                           path={":code"}
                           element={
                              <PresentationClientDetailProvider>
                                 <PresentationClientDetailPage />
                              </PresentationClientDetailProvider>
                           }
                        ></Route>
                     </Route>
                     <Route path={"*"} element={<DefaultAuthPage />} />
                  </Routes>
               ) : (
                  <Routes>
                     <Route
                        path={"/home"}
                        element={
                           <DefaultLayout>
                              <HomePage />
                           </DefaultLayout>
                        }
                     />
                     <Route path={"/presentation-client"}>
                        <Route path={""} element={<PresentationClientPage />} />
                        <Route
                           path={":code"}
                           element={
                              <PresentationClientDetailProvider>
                                 <PresentationClientDetailPage />
                              </PresentationClientDetailProvider>
                           }
                        ></Route>
                     </Route>
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
                     <Route
                        path={"/auth/forget-password"}
                        element={
                           <AuthLayout>
                              <ForgetPassword />
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
