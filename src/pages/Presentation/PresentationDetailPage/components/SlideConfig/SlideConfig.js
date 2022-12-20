import Select from "react-select";
import classNames from "classnames/bind";
import styles from "./SlideConfig.module.scss";
import Input from "../../../../../components/Input";
import { usePresentationDetailStore } from "../../store";
import Button from "../../../../../components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faX } from "@fortawesome/free-solid-svg-icons";
import { Controller, useFieldArray, useForm, useFormContext, useWatch } from "react-hook-form";
import { slideTypes } from "../../config";
import useDebounce from "../../../../../hooks/useDebounce";
import { useCallback, useEffect, useState } from "react";
import AutoSave from "../../../../../components/AutoSave";
import { debounce } from "debounce";
import useDeepCompareEffect from "use-deep-compare-effect";
const cx = classNames.bind(styles);

function SlideConfig() {
   const presentationDetailStore = usePresentationDetailStore();

   const configSlideForm = useFormContext();

   const {
      register,
      handleSubmit,
      watch,
      control,
      setValue,
      reset,
      resetField,
      formState: { errors, isDirty }
   } = configSlideForm;

   const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
      control,
      name: "body"
   });

   const watchBodyNested = watch({ nest: true }).body?.map((cur) => cur.name);

   const debouncedValue = useDebounce(
      [watch("title"), watch("description"), watch("body"), watchBodyNested],

      1000
   );
   useEffect(() => {
      const isXXX = watch("isFetchingApi");
      console.log("isXXX: ", isXXX);
      if (isXXX) {
         // do nothing
         setValue("isFetchingApi", false);
         return;
      }

      if (isDirty) {
         handleSubmit(onSaving)();
      }
   }, [debouncedValue]);

   const onSaving = async (data) => {
      //

      console.log("onSaving");

      const { title, body, slideType } = data;
      const slideTypeId = slideType.value;

      const savingData = { title, body, slideTypeId };

      // const state = presentationDetailStore.state;
      // const slides = state.slides;
      //
      //

      const result = await presentationDetailStore.method.save(savingData);
   };

   //

   return (
      <div className={cx("config-container")}>
         <div>
            <div className={cx("config-container-content")}>
               <span className={cx("config-label")}>Slide type</span>

               <Controller
                  control={control}
                  rules={{
                     required: "require"
                  }}
                  render={({ field: { onChange, onBlur, value, name }, fieldState: { error } }) => (
                     <Select
                        defaultValue={watch("slideType")}
                        placeholder="Select"
                        onChange={onChange}
                        onBlur={onBlur}
                        options={slideTypes}
                        className={cx("select-type")}
                        isSearchable={false}
                     />
                  )}
                  name="slideType"
               />
            </div>

            <div className={cx("config-container-content")}>
               <span className={cx("config-label")}>Your question?</span>
               <Input
                  {...register("title", {
                     required: "Name is required"
                  })}
                  error={errors.title}
               />
            </div>

            <div className={cx("config-container-content")}>
               <span className={cx("config-label")}>Options</span>
               <div className={cx("option-list")}>
                  {fields.map((field, index) => {
                     const fieldName = field.name;
                     return (
                        <div key={field.id} className={cx("option-item")}>
                           <Input
                              // defaultValue={field.join("")}
                              defaultValue={fieldName}
                              placeholder={`option ${index + 1}`}
                              {...register(`body[${index}].name`, {
                                 required: "Name is required",
                                 validate: (value) => {
                                    const isNotUnique = watch("body").some((option, idx) => {
                                       return option.name === value && index !== idx;
                                    });

                                    return !isNotUnique || "Option must be unique";
                                 }
                              })}
                              error={errors.body?.[index]?.name}
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
                     className={cx("btn")}
                     leftIcon={<FontAwesomeIcon icon={faAdd} />}
                     onClick={() => {
                        const slide = {
                           id: watch("body").length,
                           name: ""
                        };
                        append(slide);
                     }}
                  />
               </div>
            </div>
         </div>
         {/* {presentationDetailStore.state.slides.length > 0 && <AutoSave onSubmit={onSaving} />} */}
      </div>
   );
}

export default SlideConfig;
