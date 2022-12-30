import classNames from "classnames/bind";
import { useEffect } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { useMediaQuery } from "react-responsive";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import Modal from "../../../components/Modal";
import Header from "./components/Header";
import SlideArea from "./components/SlideArea";
import SlideConfig from "./components/SlideConfig";
import SlideList from "./components/SlideList";
import styles from "./PresentationDetailPage.module.scss";
const cx = classNames.bind(styles);

import { usePresentationDetailStore } from "./store";

function PresentationDetailPage() {
   const presentationDetailStore = usePresentationDetailStore();

   const {
      showCreateSlideModal,
      setShowCreateSlideModal,
      showChangeThemeModal,
      setShowChangeThemeModal,
      showSlideListWhenNotDesktop,
      showDeleteSlideModal,
      setShowDeleteSlideModal,
      selectedSlideIndexToAction,
      setSelectedSlideIndexToAction
   } = presentationDetailStore;

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

      setShowCreateSlideModal(false);
   };

   const handleDeleteSlide = async () => {
      console.log("selectedSlideIndexToAction: ", selectedSlideIndexToAction);
      await presentationDetailStore.method.deleteSlide(selectedSlideIndexToAction);

      setShowDeleteSlideModal(false);
      setSelectedSlideIndexToAction(-1);

      const slideIndex = presentationDetailStore.state.slides.findIndex((currentSlide) => {
         return currentSlide.ordinalSlideNumber + "" === slideId + "";
      });

      if (selectedSlideIndexToAction <= slideIndex)
         navigate(
            `/presentation/${presentationDetailStore.state.presentation?.id}/edit/${
               slide.ordinalSlideNumber - 1
            }`
         );
   };

   return (
      <div
         className={cx("wrapper", {
            isNotDesktop
         })}
      >
         <FormProvider {...configPresentationForm}>
            <Header />

            <Modal
               title={"Change theme"}
               show={showChangeThemeModal}
               setShow={setShowChangeThemeModal}
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

                  {/* <div className={cx("item")}>
                     <input type="radio" value="DARK" name="theme" />
                     <span className={cx("label")}>Dark</span>
                  </div>
                  <div className={cx("item")}>
                     <input type="radio" value="LIGHT" name="theme" />
                     <span className={cx("label")}>Light</span>
                  </div> */}
               </div>
            </Modal>
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

         <Modal
            title={"Create Slide"}
            haveSubmitBtn
            submitBtnTitle={"Create"}
            onSubmitModal={createNewSlideForm.handleSubmit(handleCreateNewSlide)}
            show={showCreateSlideModal}
            setShow={setShowCreateSlideModal}
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

         <Modal
            title={"Delete Slide"}
            haveSubmitBtn
            submitBtnTitle={"Delete"}
            onSubmitModal={handleDeleteSlide}
            show={showDeleteSlideModal}
            setShow={setShowDeleteSlideModal}
         />
      </div>
   );
}

export default PresentationDetailPage;
