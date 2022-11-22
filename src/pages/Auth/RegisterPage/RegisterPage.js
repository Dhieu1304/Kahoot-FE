import "./RegisterPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import axiosClient from "../../../config/axiosClient";
import Input from "../../../components/Input/Input";
import AuthForm from "../../../components/AuthForm/AuthForm";
import { faEnvelope, faKey, faLock, faUser } from "@fortawesome/free-solid-svg-icons";

function RegisterPage() {
   const {
      register,
      handleSubmit,
      watch,
      formState: { errors }
   } = useForm({
      mode: "onChange",
      defaultValues: {
         email: "",
         password: "",
         name: "",
         repeatPassword: ""
      },
      criteriaMode: "all"
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
         title="Register"
         btnTitle="Register"
         redirectMessage="You have an account?"
         redirectTitle="Login"
         redirectLink="/auth/login"
         onAuthSubmit={handleSubmit(onSubmit)}
      >
         <Input
            placeholder="Your email"
            label="Email"
            type="email"
            LeftIconComponent={FontAwesomeIcon}
            leftIcon={faEnvelope}
            {...register("email", {
               required: requireErrorMessage,
               pattern: {
                  value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                  message: "is wrong format"
               }
            })}
            error={errors.email}
         />
         <Input
            placeholder="Your name"
            label="Name"
            type="text"
            LeftIconComponent={FontAwesomeIcon}
            leftIcon={faUser}
            {...register("name", {
               required: requireErrorMessage
            })}
            error={errors.name}
         />
         <Input
            placeholder="Password"
            label="Password"
            type="password"
            LeftIconComponent={FontAwesomeIcon}
            leftIcon={faLock}
            {...register("password", {
               required: requireErrorMessage
            })}
            error={errors.password}
         />
         <Input
            placeholder="Confirm password"
            label="Repeat password"
            showLabel
            type="password"
            LeftIconComponent={FontAwesomeIcon}
            leftIcon={faKey}
            {...register("repeatPassword", {
               validate: (value) => value === watch("password", "") || "do not match"
            })}
            error={errors.repeatPassword}
         />
      </AuthForm>
   );
}

export default RegisterPage;
