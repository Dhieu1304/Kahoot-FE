import { useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

import classNames from "classnames/bind";
import Avatar from "../../components/Avatar";
import Input from "../../components/Input";

import styles from "./ProfilePage.module.scss";
import Button from "../../components/Button/Button";
import { AuthContext } from "../../providers/auth";
import { toast } from "react-toastify";
import { updateProfile } from "../../services/userService";
const cx = classNames.bind(styles);

function ProfilePage() {
   const authContext = useContext(AuthContext);

   const {
      register,
      handleSubmit,
      watch,
      resetField,
      control,
      setValue,

      formState: { errors }
   } = useForm({
      mode: "onChange",
      defaultValues: {
         avatar: "",
         fullName: ""
      },
      criteriaMode: "all"
   });

   // Programatically click the hidden file input element
   // when the Button component is clicked

   const [currentAvatar, setCurrentAvatar] = useState();

   console.log("authContext: ", authContext);

   useEffect(() => {
      setValue("fullName", authContext?.user?.fullName);
      setValue("avatar", authContext?.user?.avatar);
      setCurrentAvatar(authContext?.user?.avatar);
   }, [authContext.user.id]);

   useEffect(() => {
      return () => {
         currentAvatar && URL.revokeObjectURL(currentAvatar);
      };
   }, [currentAvatar]);

   const avatarInputRef = useRef(null);

   const { ref, ...registerAvatarRest } = {
      ...register("avatar", {
         onChange: (e) => {
            console.log("e: ", e);
            // setCurrentAvatar();
            const fileUploaded = e.target.files[0];
            fileUploaded.preview = URL.createObjectURL(fileUploaded);
            setCurrentAvatar(fileUploaded.preview);
         }
      })
   };

   const changeProfile = async (data) => {
      const result = await updateProfile(data.fullName, data?.avatar && data?.avatar[0]);
      if (result) {
         toast("Change infor success");
      } else toast("Change infor fail");
   };

   return (
      <div className={cx("wrapper")}>
         <div className={cx("container")}>
            <div className={cx("manage-avatar")}>
               <Avatar
                  src={currentAvatar}
                  size={300}
                  onClick={() => {
                     console.log(
                        "avatarInputRef.current in Avatar Click: ",
                        avatarInputRef.current
                     );
                     avatarInputRef.current.click();
                  }}
               />
               <Input
                  placeholder="avatar"
                  type="file"
                  hidden
                  {...registerAvatarRest}
                  ref={(e) => {
                     ref(e);
                     avatarInputRef.current = e;
                  }}
               />
            </div>
            <div className={cx("manage-conainter")}>
               <div className={cx("manage-infor")}>
                  <Input
                     placeholder="Name"
                     label={"Name"}
                     showLabel
                     {...register("fullName", {})}
                     error={errors.fullName}
                  />
                  <div>
                     <Button
                        title="Change"
                        onClick={handleSubmit(changeProfile)}
                        big
                        rounded
                        basicBlue
                     />
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

export default ProfilePage;
