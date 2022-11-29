import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

import classNames from "classnames/bind";
import Avatar from "../../components/Avatar";
import Input from "../../components/Input";

import styles from "./ProfilePage.module.scss";
import Button from "../../components/Button/Button";
const cx = classNames.bind(styles);

function ProfilePage() {
   const {
      register,
      handleSubmit,
      watch,
      resetField,
      control,

      formState: { errors }
   } = useForm({
      mode: "onChange",
      defaultValues: {
         avatar: "",
         name: ""
      },
      criteriaMode: "all"
   });

   // Programatically click the hidden file input element
   // when the Button component is clicked

   const [currentAvatar, setCurrentAvatar] = useState();

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

   // console.log("watch('avatar'): ", watch("avatar"));
   // console.log("avatarInputRef.current: ", avatarInputRef.current);

   const changeProfile = (data) => {
      console.log("changeProfile");
      console.log("data: ", data);
   };

   return (
      <div className={cx("wrapper")}>
         <div className={cx("container")}>
            <div className={cx("manage-avatar")}>
               <Avatar
                  src={currentAvatar}
                  size={200}
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
                     {...register("name", {})}
                     error={errors.name}
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
