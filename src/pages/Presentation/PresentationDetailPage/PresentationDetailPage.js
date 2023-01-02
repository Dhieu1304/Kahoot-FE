import classNames from "classnames/bind";
import { useCallback } from "react";
import { useEffect } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { useMediaQuery } from "react-responsive";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import Button from "../../../components/Button";
import Modal from "../../../components/Modal";
import Header from "./components/Header";
import SlideArea from "./components/SlideArea";
import SlideConfig from "./components/SlideConfig";
import SlideList from "./components/SlideList";
import styles from "./PresentationDetailPage.module.scss";

import { SocketContext } from "../../../providers/socket";
import { PRESENTATION_EVENT } from "../../../providers/socket/socket.constant";

const cx = classNames.bind(styles);

import { usePresentationDetailStore } from "./store";
import { useContext } from "react";

function PresentationDetailPage() {
   const presentationDetailStore = usePresentationDetailStore();

   const socket = useContext(SocketContext);

   const { createSlideModal, changeThemeModal, deleteSlideModal, presentModal } =
      presentationDetailStore;

   const isNotDesktop = useMediaQuery({ maxWidth: 992 });
   const params = useParams();
   const slideId = params.slideId;

   const navigate = useNavigate();

   // find slide data by slideId of params from presentationDetailStore
   const slide = presentationDetailStore.state.slides.find((currentSlide) => {
      return currentSlide.ordinalSlideNumber + "" === slideId + "";
   });

   // Initialization configPresentationForm from presentationDetailStore.state.presentation
   const configPresentationForm = useForm({
      mode: "onBlur",
      defaultValues: {
         name: presentationDetailStore.state.presentation?.name,
         presentationThemeId: presentationDetailStore.state.presentation?.presentationThemeId,
         presentationTypeId: presentationDetailStore.state.presentation?.presentationTypeId
      }
   });

   // Initialization configSlideForm from presentationDetailStore.state.slides and presentationDetailStore.state.slideTypesConfig
   const slideTypesConfig = presentationDetailStore.state.slideTypesConfig;

   let currentSlideType = null;
   slideTypesConfig.some((currentSlideTypeConfig) => {
      currentSlideType = currentSlideTypeConfig?.slideTypes.find(
         (type) => type.id + "" === slide?.slideTypeId + ""
      );
      return currentSlideType;
   });

   const configSlideForm = useForm({
      mode: "onBlur",
      defaultValues: {
         title: slide?.title,
         body: slide?.body,
         description: slide?.description,

         slideType: currentSlideType || {}
      }
   });

   const createNewSlideForm = useForm({
      mode: "onSubmit",
      defaultValues: {
         slideTypeId: 1
      }
   });

   // slideId changed => That means user have moved to another slide, so we have to re-initialize defaultValue for configSlideForm
   useEffect(() => {
      configSlideForm.setValue("title", slide?.title);
      configSlideForm.setValue("body", slide?.body);
      configSlideForm.setValue("description", slide?.description);
      configSlideForm.setValue("slideType", currentSlideType || {});
   }, [slideId]);

   const handleCreateNewSlide = async (data) => {
      let index = 0;

      if (slide?.ordinalSlideNumber) {
         index = slide?.ordinalSlideNumber ? slide?.ordinalSlideNumber + 1 - 1 : 0;
      } else if (presentationDetailStore.state.slides.length > 0) {
         index = presentationDetailStore.state.slides.length;
      }

      const title = "New slide";
      const slideTypeId = data.slideTypeId;
      const body = [];

      const newSlide = {
         title,
         slideTypeId,
         body
      };

      await presentationDetailStore.method.createNewSlide(newSlide, index);

      if (!slide?.ordinalSlideNumber)
         navigate(
            `/presentation/${presentationDetailStore.state.presentation?.id}/edit/${index + 1}`
         );

      createSlideModal.setShow(false);
   };

   const handleDeleteSlide = async () => {
      const actionIndex = deleteSlideModal.data;
      await presentationDetailStore.method.deleteSlide(actionIndex);

      deleteSlideModal.setShow(false);
      deleteSlideModal.setData(-1);

      const slideIndex = presentationDetailStore.state.slides.findIndex((currentSlide) => {
         return currentSlide.ordinalSlideNumber + "" === slideId + "";
      });

      if (actionIndex <= slideIndex)
         navigate(
            `/presentation/${presentationDetailStore.state.presentation?.id}/edit/${
               slide.ordinalSlideNumber - 1
            }`
         );
   };

   const handlePresent = useCallback((presentation_id, ordinal_slide_number) => {
      socket.emit(PRESENTATION_EVENT.PRESENT, { presentation_id, ordinal_slide_number });
   }, []);

   const handleContinuePresent = async () => {
      const presentationId = presentationDetailStore.state.presentation?.id;
      const slideId = 1;
      handlePresent(presentationId, slideId);
      navigate(`/presentation/${presentationId}/play`);
   };

   const handleResetPresent = async () => {
      const presentationId = presentationDetailStore.state.presentation?.id;
      const slideId = 1;
      handlePresent(presentationId, slideId);
      navigate(`/presentation/${presentationId}/play`);
   };

   const handlePresentModal = async () => {};
   return (
      <div
         className={cx("wrapper", {
            isNotDesktop
         })}
      >
         <FormProvider {...configPresentationForm}>
            <Header />

            {changeThemeModal.show && (
               <Modal
                  title={"Change theme"}
                  show={changeThemeModal.show}
                  setShow={changeThemeModal.setShow}
               >
                  <div className={cx("choice-theme-group")}>
                     {presentationDetailStore.state.presentationThemesConfig.map((theme, index) => {
                        return (
                           <div className={cx("item")} key={index}>
                              <input
                                 checked={
                                    theme?.id + "" ===
                                    // presentationDetailStore.state.presentation?.presentationThemeId
                                    configPresentationForm.watch("presentationThemeId") + ""
                                 }
                                 type="radio"
                                 value={theme?.id}
                                 {...configPresentationForm.register("presentationThemeId")}
                              />
                              <span className={cx("label")}>{theme?.name}</span>
                           </div>
                        );
                     })}
                  </div>
               </Modal>
            )}
         </FormProvider>
         <FormProvider {...configSlideForm}>
            {!isNotDesktop ? (
               <div className={cx("container")}>
                  <SlideList />

                  {slide ? (
                     <div className={cx("slide-current")}>
                        <div className={cx("slide-area-wrapper")}>
                           <SlideArea />
                        </div>
                        <div className={cx("slide-config-wrapper")}>
                           <SlideConfig slide={slide} />
                        </div>
                     </div>
                  ) : (
                     <h1 className={cx("no-slide")}>No slides, please create new slide</h1>
                  )}
               </div>
            ) : showSlideListWhenNotDesktop ? (
               slide ? (
                  <SlideList />
               ) : (
                  <h1 className={cx("no-slide")}>No slides, please create new slide</h1>
               )
            ) : slide ? (
               <div className={cx("slide-current")}>
                  <div className={cx("slide-config-wrapper")}>
                     <SlideConfig />
                  </div>
               </div>
            ) : (
               <h1 className={cx("no-slide")}>No slides, please create new slide</h1>
            )}
         </FormProvider>

         <div className={cx("footer")} />

         {createSlideModal.show && (
            <Modal
               title={"Create Slide"}
               haveSubmitBtn
               submitBtnTitle={"Create"}
               onSubmitModal={createNewSlideForm.handleSubmit(handleCreateNewSlide)}
               show={createSlideModal.show}
               setShow={createSlideModal.setShow}
            >
               <div className={cx("choice-slide-group")}>
                  {presentationDetailStore.state.slideTypesConfig.map((current, index) => {
                     return current.slideTypes?.map((type, typeIndex) => {
                        return (
                           <div className={cx("item")} key={typeIndex}>
                              <input
                                 checked={
                                    type?.id + "" === createNewSlideForm.watch("slideTypeId") + ""
                                 }
                                 type="radio"
                                 value={type?.id}
                                 {...createNewSlideForm.register("slideTypeId")}
                              />
                              <span className={cx("label")}>{type?.name}</span>
                           </div>
                        );
                     });
                  })}
               </div>
            </Modal>
         )}

         {deleteSlideModal.show && (
            <Modal
               title={"Delete Slide"}
               haveSubmitBtn
               submitBtnTitle={"Delete"}
               onSubmitModal={handleDeleteSlide}
               show={deleteSlideModal.show}
               setShow={deleteSlideModal.setShow}
               data={deleteSlideModal.data}
               setData={deleteSlideModal.setData}
            />
         )}

         {presentModal.show && (
            <Modal
               title={"Present"}
               show={presentModal.show}
               setShow={presentModal.setShow}
               hideCancel
            >
               <div className={cx("present-modal-container")}>
                  <Button
                     className={cx("btn")}
                     title={"Continue"}
                     basicBlue
                     rounded
                     big
                     onClick={handleContinuePresent}
                  />
                  <Button
                     className={cx("btn")}
                     title={"Reset"}
                     basicYellow
                     rounded
                     big
                     onClick={handleResetPresent}
                  />
               </div>
            </Modal>
         )}
      </div>
   );
}

export default PresentationDetailPage;
