import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthInput from "../../../components/AuthInput";
import AuthForm from "../../../components/AuthForm/AuthForm";
import { AuthContext } from "../../../providers/auth";
import { getUserInfo, login } from "../../../services/authService";
import "./LoginPage.css";

function LoginPage() {
   const {
      register,
      handleSubmit,
      formState: { errors }
   } = useForm({
      mode: "onChange",
      defaultValues: {
         email: "",
         password: ""
      },
      criteriaMode: "all"
   });

   const navigate = useNavigate();
   const authContext = useContext(AuthContext);
   const onSubmit = async (formData) => {
      try {
         const userLogin = await login(formData);
         if (userLogin) {
            authContext.login();
            const user = await getUserInfo();
            if (user) {
               authContext.setUser(user);
               navigate("/");
            }
         }
      } catch (e) {
         console.error(e.message);
      }
   };

   const requireErrorMessage = "field can not empty";

   return (
      <AuthForm
         title="Sign in"
         btnTitle="Login"
         redirectMessage={"You don't have an account?"}
         redirectTitle="Register"
         redirectLink="/auth/register"
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
      </AuthForm>
   );
}

export default LoginPage;
