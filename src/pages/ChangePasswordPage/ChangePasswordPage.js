import { useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import classNames from "classnames/bind";

import Input from "../../components/Input";
import styles from "./ChangePasswordPage.module.scss";

import { AuthContext } from "../../providers/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const cx = classNames.bind(styles);

function ChangePasswordPage() {
   const authContext = useContext(AuthContext);

   const {
      register,
      handleSubmit,
      watch,
      reset,
      control,
      setValue,

      formState: { errors }
   } = useForm({
      mode: "onChange",
      defaultValues: {
         oldPassword: "",
         password: "",
         repeatPassword: ""
      },
      criteriaMode: "all"
   });

   const changePassword = async ({ password }) => {
      // const result = await updateProfile(data.fullName, data?.avatar && data?.avatar[0]);
      // if (result) {
      //    toast("Change infor success");
      //    const user = await getUserInfo();
      //    authContext.setUser(user);
      // } else toast("Change infor fail");
   };

   return (
      <div className={cx("wrapper")}>
         <div className={cx("container")}>
            <div className={cx("manage-avatar")}>
               <Input
                  placeholder="Old Password"
                  showLabel
                  label="Old Password"
                  type="password"
                  {...register("oldPassword", {
                     required: "is required"
                  })}
                  error={errors.oldPassword}
               />
               <Input
                  placeholder="Password"
                  showLabel
                  label="Password"
                  type="password"
                  {...register("password", {
                     required: "is required"
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
            </div>
         </div>
      </div>
   );
}

export default ChangePasswordPage;
