import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
   faDroplet,
   faPlus,
   faArrowLeft,
   faPlay,
   faCheck,
   faBars
} from "@fortawesome/free-solid-svg-icons";

import classNames from "classnames/bind";

import { useCallback, useContext, useEffect, useState } from "react";

import { useNavigate, useOutletContext } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import ReactLoading from "react-loading";

import { usePresentationDetailStore } from "../../store";

import Button from "../../../../../components/Button";
import { SocketContext } from "../../../../../providers/socket";
import { PRESENTATION_EVENT } from "../../../../../providers/socket/socket.constant";
import { useFormContext, useWatch } from "react-hook-form";

import useDebounce from "../../../../../hooks/useDebounce";
import Avatar from "../../../../../components/Avatar/Avatar";
import { AuthContext } from "../../../../../providers/auth";
import styles from "./Header.module.scss";

const cx = classNames.bind(styles);

function Header() {
   const authContext = useContext(AuthContext);
   const presentationDetailStore = usePresentationDetailStore();

   const { setShowCreateSlideModal, setShowChangeThemeModal } = useOutletContext();

   const {
      register,
      watch,
      handleSubmit,
      control,
      formState: { errors, isDirty }
   } = useFormContext();

   const socket = useContext(SocketContext);
   // console.log("presentationDetailStore.state header: ", presentationDetailStore.state);

   const debouncedValue = useDebounce(
      useWatch({
         control: control
      }),
      1000
   );

   // useEffect(() => {
   //    console.log("Triggered");
   //    if (isDirty) {
   //       handleSubmit(onSaving)();
   //    }
   // }, [debouncedValue]);

   const onSaving = async (data) => {
      console.log("onSaving presentation");
      // console.log("data: ", data);

      // const { title, body, slideType } = data;
      // const slideTypeId = slideType.value;

      // const savingData = { title, body, slideTypeId };

      // const result = await presentationDetailStore.method.save(savingData);
   };

   const navigate = useNavigate();

   const handlePresent = useCallback((presentation_id, ordinal_slide_number) => {
      socket.emit(PRESENTATION_EVENT.PRESENT, { presentation_id, ordinal_slide_number });
   }, []);

   // console.log("name: ", watch("name"));
   const isNotDesktop = useMediaQuery({ maxWidth: 992 });

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
                  <input
                     className={cx("name")}
                     value={presentationDetailStore.state.presentation?.name}
                     readOnly
                  />
                  <input className={cx("owner")} value={"Created by Ngọc Sang Trần"} readOnly />
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
               {presentationDetailStore.state.isSaving ? (
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
                     setShowChangeThemeModal(true);
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
                     const presentationId = presentationDetailStore.state.presentation?.id;
                     const slideId = 1;
                     handlePresent(presentationId, slideId);
                     navigate(`/presentation/${presentationId}/${slideId}`);
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
                     setShowCreateSlideModal(true);
                  }}
               />
            </div>
            <div className={cx("right")}>
               {/* <Button
                  title={"Themes"}
                  basicTeal
                  big
                  rounded
                  className={cx("btn")}
                  leftIcon={<FontAwesomeIcon icon={faDroplet} />}
                  onClick={() => {
                     setShowChangeThemModal(true);
                  }}
               /> */}
               {isNotDesktop && (
                  <FontAwesomeIcon
                     icon={faBars}
                     size="1x"
                     onClick={() => {
                        presentationDetailStore.method.showSlideList();
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

{
   /* <div className={cx("left")}>
<Button
   title={"Back"}
   outline
   big
   rounded
   className={cx("btn")}
   leftIcon={<FontAwesomeIcon icon={faArrowLeft} />}
   onClick={() => {
      navigate("/presentation");
   }}
/>
<Button
   title={"New slide"}
   basicBlue
   big
   rounded
   className={cx("btn")}
   leftIcon={<FontAwesomeIcon icon={faPlus} />}
   onClick={() => {
      setShowCreateSlideModal(true);
   }}
/>

<Input
   {...register("name", {
      required: "Name is required"
   })}
   error={errors.name}
/>
</div>
<CreateSlideModal show={showCreateSlideModal} setShow={setShowCreateSlideModal} />
<ChangeThemeModal show={showChangeThemModal} setShow={setShowChangeThemModal} />
<Modal
title={"Save Presentation"}
show={showSaveModal}
setShow={setShowSaveModal}
haveSubmitBtn
onSubmitModal={async () => {
   setShowSaveModal(false);
   await presentationDetailStore.method.save();
}}
submitBtnTitle={"Save"}
>
<div className={cx("choice-slide-group")}>
   <div className={cx("item")}>
      <input type="radio" value="MULTI" name="type" />
      <span className={cx("label")}>Muti choices</span>
   </div>
</div>
</Modal>
<Modal
title={"Delete Slide"}
show={showDeleteSlideModal}
setShow={setShowDeleteSlideModal}
haveSubmitBtn
onSubmitModal={async () => {
   setShowDeleteSlideModal(false);
   await presentationDetailStore.method.deleteSlide();
}}
submitBtnTitle={"Delete"}
></Modal>
<Modal
title={"Delete Presentation"}
show={showDeletePresentationModal}
setShow={setShowDeletePresentationModal}
haveSubmitBtn
onSubmitModal={async () => {
   setShowDeletePresentationModal(false);
   await presentationDetailStore.method.deletePresentation();
   navigate("/presentation");
}}
submitBtnTitle={"Delete"}
></Modal>
<div className={cx("right")}>
<Button
   title={"Play"}
   basicTeal
   big
   rounded
   className={cx("btn")}
   leftIcon={<FontAwesomeIcon icon={faPlay} />}
   onClick={() => {
      const presentationId = presentationDetailStore.state.presentation?.id;
      const slideId = 1; // presentationDetailStore.state.currentSlide?.id;
      handlePresent(presentationId, slideId);
      navigate(`/presentation/${presentationId}/${slideId}`);
   }}
/>

<Button
   title={"Toggle"}
   basicTeal
   big
   rounded
   className={cx("btn")}
   leftIcon={<FontAwesomeIcon icon={faDroplet} />}
   onClick={() => {
      presentationDetailStore.method.showSlideList();
   }}
/>
<Button
   title={"Themes"}
   basicTeal
   big
   rounded
   className={cx("btn")}
   leftIcon={<FontAwesomeIcon icon={faDroplet} />}
   onClick={() => {
      setShowChangeThemModal(true);
   }}
/>
<Button
   title={"Save"}
   basicYellow
   big
   rounded
   className={cx("btn")}
   leftIcon={<FontAwesomeIcon icon={faSave} />}
   onClick={() => {
      setShowSaveModal(true);
   }}
/>
<Button
   title={"Remove Slide"}
   basicRed
   big
   rounded
   className={cx("btn")}
   leftIcon={<FontAwesomeIcon icon={faRemove} />}
   onClick={() => {
      setShowDeleteSlideModal(true);
   }}
/>
<Button
   title={"Remove Presentation"}
   basicRed
   big
   rounded
   className={cx("btn")}
   leftIcon={<FontAwesomeIcon icon={faRemove} />}
   onClick={() => {
      setShowDeletePresentationModal(true);
   }}
/>
</div> */
}
