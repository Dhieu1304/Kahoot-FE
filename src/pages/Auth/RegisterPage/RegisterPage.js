import { useForm } from "react-hook-form";
import { faEnvelope, faKey, faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import AuthInput from "../../../components/AuthInput";
import AuthForm from "../../../components/AuthForm/AuthForm";
import { registerUser } from "../../../services/authService";

import "./RegisterPage.css";

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
      const bodyData = {
         name: formData.name,
         email: formData.email,
         password: formData.password
      };

      try {
         await registerUser(bodyData);
      } catch (e) {
         console.error(e.message);
      }
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
         <AuthInput
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
         <AuthInput
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
         <AuthInput
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
         <AuthInput
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
