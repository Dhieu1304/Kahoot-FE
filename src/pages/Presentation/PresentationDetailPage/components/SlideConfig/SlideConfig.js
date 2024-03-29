import Select from "react-select";
import classNames from "classnames/bind";
import styles from "./SlideConfig.module.scss";
import Input from "../../../../../components/Input";
import { usePresentationDetailStore } from "../../store";
import Button from "../../../../../components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faX } from "@fortawesome/free-solid-svg-icons";
import { Controller, useFieldArray, useForm, useFormContext, useWatch } from "react-hook-form";

import useDebounce from "../../../../../hooks/useDebounce";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { HEADING, MULTIPLE_CHOICE, PARAGRAPH } from "../../../../../config/configSlideTypes";
const cx = classNames.bind(styles);

function SlideConfig({ slide }) {
   const presentationDetailStore = usePresentationDetailStore();

   const slideTypes = presentationDetailStore.state.slideTypesConfig.map((cur) => ({
      ...cur,
      options: cur.slideTypes
   }));

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

   const params = useParams();

   const watchBodyNested = watch({ nest: true }).body?.map((cur) => cur.name);

   //
   //    "useW: ",
   //    useWatch({
   //       control: configSlideForm.control
   //    })
   // );

   const debouncedValue = useDebounce(
      // [watch("title"), watch("description"), watch("body"), watchBodyNested],
      [
         useWatch({
            control: configSlideForm.control
         }),
         watchBodyNested
      ],

      1000
   );

   // const xxx = usePrevious(presentationDetailStore.state.checkLoadNewData);

   useEffect(() => {
      // const isXXX = watch("isFetchingApi");
      // //
      // if (isXXX) {
      //    // do nothing
      //    setValue("isFetchingApi", false);
      //    return;
      // }

      if (isDirty) {
         handleSubmit(onSaving)();
      }
   }, [debouncedValue]);

   const onSaving = async (data) => {
      //

      const { title, body, description, slideType } = data;
      const slideTypeId = slideType.id;

      const newSlide = { ...slide, title, body, description, slideTypeId };

      const slideId = params.slideId;

      const index = parseInt(slideId) - 1;

      const result = await presentationDetailStore.method.saveSlides(newSlide, index);
   };

   const renderConfigBySlideTypeId = () => {
      const slideType = watch("slideType");

      switch (slideType.id) {
         case MULTIPLE_CHOICE:
            return (
               <>
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
               </>
            );

         case HEADING:
            return (
               <>
                  <div className={cx("config-container-content")}>
                     <span className={cx("config-label")}>Heading</span>
                     <Input
                        {...register("title", {
                           required: "Name is required"
                        })}
                        error={errors.title}
                     />
                  </div>
                  <div className={cx("config-container-content")}>
                     <span className={cx("config-label")}>Sub heading</span>
                     <Input
                        {...register("description", {
                           required: "Name is required"
                        })}
                        error={errors.description}
                     />
                  </div>{" "}
               </>
            );
         case PARAGRAPH:
            return (
               <>
                  <div className={cx("config-container-content")}>
                     <span className={cx("config-label")}>Title</span>
                     <Input
                        {...register("title", {
                           required: "Name is required"
                        })}
                        error={errors.title}
                     />
                  </div>

                  <div className={cx("config-container-content")}>
                     <span className={cx("config-label")}>Paragrapth</span>
                     <Input
                        {...register("description", {
                           required: "Name is required"
                        })}
                        error={errors.description}
                        multiple
                     />
                  </div>
               </>
            );

         default:
            return <h1>No slide type</h1>;
      }
   };

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
                        value={value}
                        onBlur={onBlur}
                        options={slideTypes}
                        className={cx("select-type")}
                        isSearchable={false}
                        formatGroupLabel={({ name }) => {
                           return <div>{name}</div>;
                        }}
                        formatOptionLabel={({ name }) => {
                           return <div>{name}</div>;
                        }}
                        getOptionValue={(option) => option.id}
                        theme={"white"}
                     />
                  )}
                  name="slideType"
               />
            </div>

            {renderConfigBySlideTypeId()}
         </div>
         {/* {presentationDetailStore.state.slides.length > 0 && <AutoSave onSubmit={onSaving} />} */}
      </div>
   );
}

export default SlideConfig;
