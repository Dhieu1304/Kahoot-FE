import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthInput from "../../../components/AuthInput";
import AuthForm from "../../../components/AuthForm/AuthForm";
import { AuthContext } from "../../../providers/auth";
import authService from "../../../services/authService";
import "./ForgetPassword.css";

function ForgetPassword() {
   const {
      register,
      handleSubmit,
      formState: { errors }
   } = useForm({
      mode: "onChange",
      defaultValues: {
         email: ""
      },
      criteriaMode: "all"
   });

   const onSubmit = async ({ email }) => {
      const result = await authService.forgetPassword(email);
   };

   const requireErrorMessage = "field can not empty";

   return (
      <AuthForm
         title="Forget password"
         btnTitle="Send"
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
      </AuthForm>
   );
}

export default ForgetPassword;
