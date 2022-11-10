import './register.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosClient from "../config/axiosClient";
import { useContext } from "react";
import { UserContext } from "../context/userContext";

function LoginForm() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const userContext = useContext(UserContext);

    const onSubmit = async (formData) => {
        try {
            await toast.promise(
                axiosClient.post('/auth/login', formData),
                {
                    pending: 'Promise is pending',
                    success: {
                        render({data}) {
                            localStorage.setItem('ACCESS_TOKEN', data.data.data.token);
                            navigate('/')
                            return 'Login successful';
                        }
                    },
                    error: {
                        render({data}) {
                            return data.response.data.message;
                        }
                    },
                });
        } catch (e) {
            // console.log(e.message);
        }
    }

    const render = () => {
        let renderError = '';
        if (errors.email) renderError = <p style={{color: 'red'}}>Email is required</p>
        else if (errors.password) renderError = <p style={{color: 'red'}}>Password is required</p>
        else renderError = <p style={{color: 'red', visibility: "hidden"}}>renderError</p>

        return (
            <>
                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign in</p>
                <div style={{marginTop: '-35px'}}>{renderError}</div>
                <form className="mx-1 mx-md-4" onSubmit={handleSubmit(onSubmit)}>
                    <div className="d-flex flex-row align-items-center mb-4">
                        <FontAwesomeIcon icon={"fas fa-envelope fa-lg me-3 fa-fw"} style={{scale: '1.2'}} className={'me-3'}/>
                        <input {...register("email", {required: true})} type="email" className="form-control" placeholder={"Your Email"}/>
                    </div>
                    <div className="d-flex flex-row align-items-center mb-4">
                        <FontAwesomeIcon icon={"fas fa-lock fa-lg me-3 fa-fw"} style={{scale: '1.2'}} className={'me-3'}/>
                        <input {...register("password", {required: true})} name="password"
                               type="password" className="form-control" placeholder={"Password"}/>
                    </div>
                    <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <input type="submit" className="btn btn-primary btn-lg" value='Login'/>
                    </div>
                    <p style={{fontStyle: 'italic'}}>You don't have an account?
                        <Link to={'/auth/register'} style={{textDecoration: 'none'}}> Register </Link>
                    </p>
                </form>
            </>
        )
    };
    return render();
}

export default LoginForm;
