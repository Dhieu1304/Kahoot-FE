import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faFontAwesome } from '@fortawesome/free-brands-svg-icons';
import { faHatChef } from '@fortawesome/sharp-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.css';
import AuthForm from "./components/authForm";
import RegisterForm from "./components/registerForm";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import Home from "./components/home";

library.add(fas, faTwitter, faFontAwesome, faHatChef);

function App() {
  return (
    <div className="App">
        <Router>
            <div className="App">
                <Routes>
                    <Route
                        path={"/auth/register"}
                        element={
                            <AuthForm>
                                <RegisterForm />
                            </AuthForm>
                        }
                    />
                    <Route
                        path={"/auth/login"}
                        element={
                            <AuthForm>
                                <LoginForm />
                            </AuthForm>
                        }
                    />
                    <Route
                        path={"/"}
                        element={
                            <AuthForm>
                                <Home />
                            </AuthForm>
                        }
                    />
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
