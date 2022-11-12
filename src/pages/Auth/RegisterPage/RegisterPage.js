import './RegisterPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { toast } from 'react-toastify';
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import axiosClient from "../../../config/axiosClient";

function RegisterPage() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const onSubmit = async (formData) => {
        if (formData.password !== formData.rePassword) return;
        const bodyData = {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            role: formData.role,
        }
        try {
            await toast.promise(
                axiosClient.post('/auth/register', bodyData),
                {
                    pending: 'Promise is pending',
                    success: {
                        render({data}) {
                            return data.data.message;
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
        if (errors.name) renderError = <p style={{color: 'red'}}>Name is required</p>
        else if (errors.email) renderError = <p style={{color: 'red'}}>Email is required</p>
        else if (errors.password) renderError = <p style={{color: 'red'}}>Password is required</p>
        else if (errors.rePassword) renderError = <p style={{color: 'red'}}>Repeat password is required</p>
        else if (watch('password') !== watch('rePassword') &&
            watch('password').length > 0 && watch('rePassword').length > 0) {
            renderError = <p style={{color: 'red'}}>Your passwords do not match</p>
        }
        else renderError = <p style={{color: 'red', visibility: "hidden"}}>renderError</p>

        return (
            <>
                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>
                <div style={{marginTop: '-35px'}}>{renderError}</div>
                <form className="mx-1 mx-md-4" onSubmit={handleSubmit(onSubmit)}>
                    <div className="d-flex flex-row align-items-center mb-4">
                        <FontAwesomeIcon icon={"fas fa-user fa-lg me-3 fa-fw"} style={{scale: '1.2'}} className={'me-3'}/>
                        <input {...register("name", {required: true})} type="text" className="form-control" placeholder={"Your Name"}/>
                    </div>
                    <div className="d-flex flex-row align-items-center mb-4">
                        <FontAwesomeIcon icon={"fas fa-envelope fa-lg me-3 fa-fw"} style={{scale: '1.2'}} className={'me-3'}/>
                        <input {...register("email", {required: true})} type="email" className="form-control" placeholder={"Your Email"}/>
                    </div>
                    <div className="d-flex flex-row align-items-center mb-4">
                        <FontAwesomeIcon icon={"fas fa-lock fa-lg me-3 fa-fw"} style={{scale: '1.2'}} className={'me-3'}/>
                        <input {...register("password", {required: true})} name="password"
                               type="password" className="form-control" placeholder={"Password"}/>
                    </div>
                    <div className="d-flex flex-row align-items-center mb-4">
                        <FontAwesomeIcon icon={"fas fa-key fa-lg me-3 fa-fw"} style={{scale: '1.2'}} className={'me-3'}/>
                        <input {...register("rePassword", {required: true})}
                               type="password" className="form-control" placeholder={"Repeat your password"}/>
                    </div>
                    <div className="d-flex flex-row align-items-center mb-4">
                        <div style={{margin: "0 auto"}}>
                            <span className={'me-2 span-role'}>
                                <input {...register("role")} type="radio" value="STUDENT" name="role" defaultChecked/> STUDENT</span>
                            <span className={'me-2 span-role'}>
                                <input {...register("role")} type="radio" value="TEACHER" name="role"/> TEACHER</span>
                        </div>
                    </div>
                    <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <input type="submit" className="btn btn-primary btn-lg" value='Register'/>
                    </div>
                    <p style={{fontStyle: 'italic'}}>You have an account?
                        <Link to={'/auth/login'} style={{textDecoration: 'none'}}> Login </Link>
                    </p>
                </form>
            </>
        )
    };
    return render();
}

export default RegisterPage;
