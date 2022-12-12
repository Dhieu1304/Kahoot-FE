import classNames from "classnames/bind";
import styles from "./SlideConfig.module.scss";
import Input from "../../../../../components/Input";
import { usePresentationDetailStore } from "../../store";
import Button from "../../../../../components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faX } from "@fortawesome/free-solid-svg-icons";
import { useFieldArray, useForm, useFormContext } from "react-hook-form";
const cx = classNames.bind(styles);

function SlideConfig() {
   const presentationDetailStore = usePresentationDetailStore();

   const {
      register,
      handleSubmit,
      watch,
      control,
      resetField,
      formState: { errors }
   } = useFormContext();

   const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
      control,
      name: "options"
   });

   console.log('watch("options"): ', watch("options"));

   return (
      <div className={cx("config-container")}>
         <div>
            <div className={cx("config-container-content")}>
               <span className={cx("config-label")}>Your question?</span>
               <Input
                  {...register("title", {
                     required: "Name is required"
                  })}
               />
            </div>

            <div className={cx("config-container-content")}>
               <span className={cx("config-label")}>Options</span>
               <div className={cx("option-list")}>
                  {fields.map((field, index) => {
                     // console.log("field: ", field);
                     console.log("field.name: ", field.name);
                     const xxx = field.name;
                     return (
                        <div key={field.id} className={cx("option-item")}>
                           <Input
                              // defaultValue={field.join("")}
                              defaultValue={xxx}
                              placeholder={`option ${index + 1}`}
                              {...register(`${field.id}`, {
                                 required: "Name is required"
                              })}
                           />
                           <FontAwesomeIcon
                              icon={faX}
                              className={cx("remove-icon")}
                              size={"1x"}
                              onClick={() => {
                                 remove(index);
                              }}
                           />
                        </div>
                     );
                  })}
               </div>
               <div className={cx("option-add-wrapper")}>
                  <Button
                     title="Add option"
                     basicBlue
                     big
                     rounded
                     leftIcon={<FontAwesomeIcon icon={faAdd} />}
                     onClick={() => {
                        const currentCountOptions = watch("options").length;
                        append({
                           name: `Option ${currentCountOptions + 1}`,
                           count: 0
                        });
                     }}
                  />
               </div>
            </div>
         </div>
      </div>
   );
}

export default SlideConfig;
