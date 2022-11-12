import "./RegisterPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import axiosClient from "../../../config/axiosClient";
import Input from "../../../components/Input/Input";
import AuthForm from "../../../components/AuthForm/AuthForm";

function RegisterPage() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        mode: "onChange",
        defaultValues: {
            email: "",
            password: "",
            name: "",
            repeatPassword: "",
        },
        criteriaMode: "all",
    });
    const onSubmit = async (formData) => {
        // if (formData.password !== formData.rePassword) return;
        console.log("formData: ", formData);
        // const bodyData = {
        //     name: formData.name,
        //     email: formData.email,
        //     password: formData.password,
        //     role: formData.role,
        // };
        // try {
        //     await toast.promise(axiosClient.post("/auth/register", bodyData), {
        //         pending: "Promise is pending",
        //         success: {
        //             render({ data }) {
        //                 return data.data.message;
        //             },
        //         },
        //         error: {
        //             render({ data }) {
        //                 return data.response.data.message;
        //             },
        //         },
        //     });
        // } catch (e) {
        //     // console.log(e.message);
        // }
    };

    const requireErrorMessage = "field can not empty";

    return (
        <AuthForm
            title={"Register"}
            btnTitle={"Register"}
            redirectMessage={"You have an account?"}
            redirectTitle={"Login"}
            redirectLink={"/auth/login"}
            onAuthSubmit={handleSubmit(onSubmit)}
        >
            <Input
                placeholder="Your email"
                label={"Email"}
                type={"email"}
                {...register("email", {
                    required: requireErrorMessage,
                    pattern: {
                        value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                        message: "is wrong format",
                    },
                })}
                error={errors.email}
            />

            <Input
                placeholder="Your name"
                label={"Name"}
                type={"text"}
                {...register("name", {
                    required: requireErrorMessage,
                })}
                error={errors.name}
            />
            <Input
                placeholder="Password"
                label={"Password"}
                showLabel
                type={"password"}
                {...register("password", {
                    required: requireErrorMessage,
                })}
                error={errors.password}
            />
            <Input
                placeholder="Confirm password"
                label={"Repeat password"}
                showLabel
                type={"password"}
                {...register("repeatPassword", {
                    validate: (value) =>
                        value === watch("password", "") || "do not match",
                })}
                error={errors.repeatPassword}
            />

            <div className="d-flex flex-row align-items-center mb-4">
                <div style={{ margin: "0 auto" }}>
                    <span className={"me-2 span-role"}>
                        <input
                            {...register("role")}
                            type="radio"
                            value="STUDENT"
                            name="role"
                            defaultChecked
                        />{" "}
                        STUDENT
                    </span>
                    <span className={"me-2 span-role"}>
                        <input
                            {...register("role")}
                            type="radio"
                            value="TEACHER"
                            name="role"
                        />{" "}
                        TEACHER
                    </span>
                </div>
            </div>
        </AuthForm>
    );
}

export default RegisterPage;
