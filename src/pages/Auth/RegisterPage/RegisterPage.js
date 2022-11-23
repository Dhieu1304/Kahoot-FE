import "./RegisterPage.css";
import { useForm } from "react-hook-form";
import Input from "../../../components/Input/Input";
import AuthForm from "../../../components/AuthForm/AuthForm";
import { registerUser } from "../../../services/authService";

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
      console.log("formData: ", formData);
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
            {...register("name", {
               required: requireErrorMessage
            })}
            error={errors.name}
         />
         <Input
            placeholder="Password"
            label="Password"
            showLabel
            type="password"
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
            {...register("repeatPassword", {
               validate: (value) => value === watch("password", "") || "do not match"
            })}
            error={errors.repeatPassword}
         />
      </AuthForm>
   );
}

export default RegisterPage;
