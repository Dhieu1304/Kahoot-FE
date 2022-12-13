import classNames from "classnames/bind";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import images from "../../../assets/images";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import styles from "./PresentationClientPage.module.scss";

const cx = classNames.bind(styles);

function PresentationClientPage() {
   const {
      register,
      handleSubmit,
      watch,
      resetField,
      setValue,
      formState: { errors }
   } = useForm({
      mode: "onSubmit",
      defaultValues: {
         code: ""
      },
      criteriaMode: "all"
   });

   const navigate = useNavigate();

   const handleSubmitCode = async (data) => {
      const presentationId = 1;
      const slideId = 1;
      navigate(`/presentation-client/${presentationId}/${slideId}`);
      // navigate(`/presentation-client/sang`);
   };

   return (
      <div className={cx("wrapper")}>
         <div className={cx("container")}>
            <div className={cx("logo-wrapper")}>
               <img src={images.logo} alt="Kahoot" />
            </div>
            <div className={cx("input-code-wrapper")}>
               <h1 className={cx("title")}>Please enter the code</h1>
               <Input
                  label="Code"
                  showLabel={false}
                  placeholder="1234567"
                  {...register("code", {
                     required: "is require"
                  })}
                  error={errors.code}
               />
               <Button
                  title={"Submit"}
                  onClick={handleSubmit(handleSubmitCode)}
                  basicBlue
                  big
                  rounded
               />
               <span className={cx("message")}>
                  The code is found on the screen in front of you
               </span>
            </div>
         </div>
      </div>
   );
}

export default PresentationClientPage;
