import classNames from "classnames/bind";
import styles from "./SlideConfig.module.scss";
import Input from "../../../../../components/Input";
import { usePresentationDetailStore } from "../../store";
import Button from "../../../../../components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
const cx = classNames.bind(styles);

function SlideConfig() {
   const presentationDetailStore = usePresentationDetailStore();

   const {
      register,
      handleSubmit,
      watch,
      resetField,
      formState: { errors }
   } = useForm({
      mode: "onChange",
      defaultValues: {
         name: ""
      },
      criteriaMode: "all"
   });

   return (
      <div className={cx("container")}>
         <div>
            <div className={cx("config-container")}>
               <span className={cx("config-label")}>Your question?</span>
               <Input value={presentationDetailStore.state.currentSlide.title} />
            </div>

            <div className={cx("config-container")}>
               <span className={cx("config-label")}>Options</span>
               <div className={cx("option-list")}>
                  {/* {...register("name", {
               required: "Name is required"
            })} */}
                  <Input placeholder={"Option 1"} value={"Option 1"} />
                  <Input placeholder={"Option 2"} value={"Option 2"} />
                  <Input placeholder={"Option 3"} value={"Option 3"} />
                  <Input placeholder={"Option 4"} value={"Option 4"} />
                  <Input placeholder={"Option 5"} value={"Option 5"} />
               </div>
               <div className={cx("option-add-wrapper")}>
                  <Button
                     title="Add option"
                     basicBlue
                     big
                     rounded
                     leftIcon={<FontAwesomeIcon icon={faAdd} />}
                  />
               </div>
            </div>
         </div>
      </div>
   );
}

export default SlideConfig;
