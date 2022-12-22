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
import { slideTypes } from "./config";
import styles from "./PresentationDetailPage.module.scss";
const cx = classNames.bind(styles);

import { usePresentationDetailStore } from "./store";

function PresentationDetailEditPage() {
   const presentationDetailStore = usePresentationDetailStore();

   const {
      showCreateSlideModal,
      setShowCreateSlideModal,
      showChangeThemeModal,
      setShowChangeThemeModal,
      showSlideListWhenNotDesktop
      // setShowSlideListWhenNotDesktop
   } = useOutletContext();

   const isNotDesktop = useMediaQuery({ maxWidth: 992 });
   const params = useParams();
   const slideId = params.slideId;

   const navigate = useNavigate();

   const slide = presentationDetailStore.state.slides.find((currentSlide) => {
      return currentSlide.ordinalSlideNumber + "" === slideId + "";
   });

   console.log("slideId: ", slideId);
   console.log("slide: ", slide);

   console.log("presentationDetailStore.state: ", presentationDetailStore.state);
   const configPresentationForm = useForm({
      mode: "onBlur",
      defaultValues: {
         name: presentationDetailStore.state.presentation?.name,
         presentationThemeId: presentationDetailStore.state.presentation?.presentationThemeId,
         presentationTypeId: presentationDetailStore.state.presentation?.presentationTypeId
      }
   });

   console.log(
      'configPresentationForm.watch("presentationThemeId"): ',
      configPresentationForm.watch("presentationThemeId")
   );

   const configSlideForm = useForm({
      mode: "onBlur",
      defaultValues: {
         title: slide?.title,
         body: slide?.body,
         description: slide?.description,
         // sẽ sửa lại khi get slyde type api
         slideType: slideTypes?.[slide?.slideTypeId - 1 || 0] || {}
      }
   });

   console.log("slideType: ", configSlideForm.watch("slideType"));

   const createNewSlideForm = useForm({
      mode: "onSubmit",
      defaultValues: {
         slideTypeId: 1
      }
   });

   useEffect(() => {
      console.log("Change slide");
      configSlideForm.setValue("title", slide?.title);
      configSlideForm.setValue("body", slide?.body);
      configSlideForm.setValue("description", slide?.description);
      configSlideForm.setValue("slideType", slideTypes?.[slide?.slideTypeId - 1 || 0] || {});
   }, [slideId]);

   const handleCreateNewSlide = async (data) => {
      console.log("data: ", data);
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

      presentationDetailStore.method.createNewSlide(newSlide, index);

      if (!slide?.ordinalSlideNumber)
         navigate(
            `/presentation/${presentationDetailStore.state.presentation?.id}/edit/${index + 1}`
         );

      setShowCreateSlideModal(false);
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
               title={"Create Slide"}
               haveSubmitBtn
               submitBtnTitle={"Create"}
               onSubmitModal={createNewSlideForm.handleSubmit(handleCreateNewSlide)}
               show={showCreateSlideModal}
               setShow={setShowCreateSlideModal}
            >
               <div className={cx("choice-slide-group")}>
                  <div className={cx("item")}>
                     <input type="radio" value="MULTI" name="type" />
                     <span className={cx("label")}>Muti choices</span>
                  </div>
                  {/* <div className={cx("item")}>
                <input type="radio" value="SLIDE" name="type" />
                <span className={cx("label")}>Slide</span>
             </div>
             <div className={cx("item")}>
                <input type="radio" value="QUIZ" name="type" />
                <span className={cx("label")}>Quiz</span>
             </div> */}
               </div>
            </Modal>

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
                                 theme?.id ===
                                 presentationDetailStore.state.presentation?.presentationThemeId
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
                     <h1>No slides, please create new slide</h1>
                  )}
               </div>
            ) : showSlideListWhenNotDesktop ? (
               slide ? (
                  <SlideList />
               ) : (
                  <h1>No slide</h1>
               )
            ) : slide ? (
               <div className={cx("slide-current")}>
                  <div className={cx("slide-config-wrapper")}>
                     <SlideConfig />
                  </div>
               </div>
            ) : (
               <h1>No slide</h1>
            )}
         </FormProvider>

         <div className={cx("footer")} />
      </div>
   );
}

export default PresentationDetailEditPage;
