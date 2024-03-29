import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
   faDroplet,
   faPlus,
   faArrowLeft,
   faPlay,
   faCheck,
   faBars,
   faX,
   faXmarkCircle,
   faTrash
} from "@fortawesome/free-solid-svg-icons";

import classNames from "classnames/bind";

import { useCallback, useContext, useEffect, useState } from "react";

import { useNavigate, useOutletContext } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import ReactLoading from "react-loading";

import { usePresentationDetailStore } from "../../store";

import Button from "../../../../../components/Button";

import { Controller, useFormContext, useWatch } from "react-hook-form";

import useDebounce from "../../../../../hooks/useDebounce";
import Avatar from "../../../../../components/Avatar/Avatar";
import { AuthContext } from "../../../../../providers/auth";
import styles from "./Header.module.scss";

const cx = classNames.bind(styles);

function Header() {
   const authContext = useContext(AuthContext);
   const presentationDetailStore = usePresentationDetailStore();

   const {
      createSlideModal,
      changeThemeModal,
      presentModal,

      showSlideListWhenNotDesktop,
      setShowSlideListWhenNotDesktop
   } = presentationDetailStore;

   const {
      register,
      watch,
      handleSubmit,
      control,
      formState: { errors, isDirty }
   } = useFormContext();

   //

   const debouncedValue = useDebounce(
      useWatch({
         control: control
      }),
      1000
   );

   // useEffect(() => {
   //
   //    if (isDirty) {
   //       handleSubmit(onSaving)();
   //    }
   // }, [debouncedValue]);

   const onSaving = async (data) => {
      const { name, presentationThemeId: themeId, presentationTypeId } = data;

      const newPresentation = { name, themeId };

      // const { title, body, slideType } = data;
      // const slideTypeId = slideType.value;

      // const savingData = { title, body, slideTypeId };

      const result = await presentationDetailStore.method.savePresentation(newPresentation);
   };

   const navigate = useNavigate();

   //
   const isNotDesktop = useMediaQuery({ maxWidth: 992 });

   // const xxx = usePrevious(presentationDetailStore.state.checkLoadNewData);

   useEffect(() => {
      if (isDirty) {
         handleSubmit(onSaving)();
      }
   }, [debouncedValue]);

   return (
      <div className={cx("container")}>
         <div className={cx("top")}>
            <div className={cx("left")}>
               <FontAwesomeIcon
                  icon={faArrowLeft}
                  size="1x"
                  className={cx("icon")}
                  onClick={() => {
                     navigate("/presentation");
                  }}
               />
               <div className={cx("infor")}>
                  <Controller
                     control={control}
                     rules={{
                        required: "Required"
                     }}
                     render={({
                        field: { onChange, onBlur, value, name },
                        fieldState: { error }
                     }) => (
                        <input
                           className={cx("name", { error: error?.message })}
                           value={watch("name")}
                           placeholder={error?.message}
                           onChange={onChange}
                           onBlur={onBlur}
                        />
                     )}
                     name="name"
                  />

                  <input
                     className={cx("owner")}
                     value={`Created by ${presentationDetailStore.state.presentation?.owner?.fullName}`}
                     readOnly
                  />
               </div>

               <FontAwesomeIcon
                  icon={faArrowLeft}
                  size="1x"
                  className={cx("icon")}
                  onClick={async () => {
                     await presentationDetailStore.method.loadPresentationDetailReturnSlides();
                  }}
               />
            </div>
            <div className={cx("right")}>
               {!presentationDetailStore.state.isLoading ? (
                  <div className={cx("save-box")}>
                     <FontAwesomeIcon
                        size="1x"
                        icon={faCheck}
                        color={"green"}
                        className={cx("saved-icon")}
                     />
                     {!isNotDesktop && <span>Saved</span>}
                  </div>
               ) : (
                  <div className={cx("save-box")}>
                     <ReactLoading
                        type={"spokes"}
                        color={"blue"}
                        height={16}
                        width={16}
                        className={cx("loading-icon")}
                     />

                     {!isNotDesktop && <span>Saving...</span>}
                  </div>
               )}

               {!isNotDesktop && (
                  <>
                     <Avatar
                        title={"Avatar"}
                        placeholder={"Avatar"}
                        size={40}
                        rounded
                        src={authContext?.user?.avatar}
                     />
                  </>
               )}
               {/* 
               <Button
                  title={"Share"}
                  outline
                  big
                  rounded
                  className={cx("btn")}
                  hideTitle={isNotDesktop}
                  leftIcon={<FontAwesomeIcon icon={faShare} />}
                  onClick={() => {
                     // const presentationId = presentationDetailStore.state.presentation?.id;
                     // const slideId = 1;
                     // handlePresent(presentationId, slideId);
                     // navigate(`/presentation/${presentationId}/${slideId}`);
                  }}
               /> */}
               <Button
                  title={"Themes"}
                  basicTeal
                  big
                  rounded
                  className={cx("btn")}
                  hideTitle={isNotDesktop}
                  leftIcon={<FontAwesomeIcon icon={faDroplet} />}
                  onClick={() => {
                     changeThemeModal.setShow(true);
                  }}
               />

               <Button
                  title={"Present"}
                  basicBlue
                  big
                  rounded
                  className={cx("btn")}
                  hideTitle={isNotDesktop}
                  leftIcon={<FontAwesomeIcon icon={faPlay} />}
                  onClick={() => {
                     presentModal.setShow(true);
                  }}
               />
            </div>
         </div>
         <div className={cx("bottom")}>
            <div className={cx("left")}>
               <Button
                  title={"New slide"}
                  basicBlue
                  big
                  rounded
                  className={cx("btn")}
                  leftIcon={<FontAwesomeIcon icon={faPlus} />}
                  onClick={() => {
                     createSlideModal.setShow(true);
                  }}
               />
            </div>

            <div className={cx("right")}>
               {isNotDesktop && (
                  <FontAwesomeIcon
                     icon={faBars}
                     size="1x"
                     onClick={() => {
                        setShowSlideListWhenNotDesktop(!showSlideListWhenNotDesktop);
                     }}
                     className={cx("toggle-icon")}
                  />
               )}
            </div>
         </div>
      </div>
   );
}

export default Header;
