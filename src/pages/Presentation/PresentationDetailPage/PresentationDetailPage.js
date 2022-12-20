import { useEffect, useState } from "react";

import Header from "./components/Header";
import SlideList from "./components/SlideList";
import { usePresentationDetailStore } from "./store";

import classNames from "classnames/bind";
import styles from "./PresentationDetailPage.module.scss";
import SlideArea from "./components/SlideArea";
import SlideConfig from "./components/SlideConfig";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { Col, Container, Row } from "react-bootstrap";
import { slideTypes } from "./config";
import Modal from "../../../components/Modal";
const cx = classNames.bind(styles);

function PresentationDetailPage() {
   const presentationDetailStore = usePresentationDetailStore();

   const configPresentationForm = useForm({
      mode: "onBlur",
      defaultValues: {
         name: "",
         presentationThemeId: 0,
         presentationTypeId: 0
      }
   });

   const configSlideForm = useForm({
      mode: "onBlur",
      defaultValues: {
         title: "",
         body: [],
         description: "",
         slideType: slideTypes[0]
      }
   });

   // LoadData for presentation detail
   const location = useLocation();
   useEffect(() => {
      const loadData = async () => {
         const presentationId = location.pathname.split("/presentation/")[1].split("/")[0];
         const presentationDetail = await presentationDetailStore.method.loadPresentationDetail(
            presentationId
         );

         // console.log("presentationDetail: ", presentationDetail);
      };
      loadData();
   }, []);

   useEffect(() => {
      const index = presentationDetailStore.state.currentSlideIndex;
      const slides = [...presentationDetailStore.state.slides];
      const slide = slides?.[index];

      configSlideForm.setValue("title", slide?.title || "");
      configSlideForm.setValue("body", slide?.body || []);
      configSlideForm.setValue("description", slide?.description || "");
   }, [presentationDetailStore.state.slides, presentationDetailStore.state.currentSlideIndex]);

   useEffect(() => {
      const presentation = { ...presentationDetailStore.state.presentation };

      // console.log("presentation: ", presentation);
      configPresentationForm.setValue("name", presentation?.name);
      configPresentationForm.setValue("presentationThemeId", presentation?.presentationThemeId);
      configPresentationForm.setValue("presentationTypeId", presentation?.presentationTypeId);
   }, [presentationDetailStore.state.presentation]);

   const isNotDesktop = useMediaQuery({ maxWidth: 992 });

   // console.log("===========================================");
   // console.log("title: ", configSlideForm.watch("title"));
   // console.log("body: ", configSlideForm.watch("body"));
   // console.log("description: ", configSlideForm.watch("description"));
   // console.log("slideType: ", configSlideForm.watch("slideType"));

   console.log("name: ", configPresentationForm.watch("name"));
   // console.log("presentationThemeId: ", configPresentationForm.watch("presentationThemeId"));
   // console.log("presentationTypeId: ", configPresentationForm.watch("presentationTypeId"));
   // console.log("===========================================");

   return (
      presentationDetailStore.state?.isInit && (
         <div
            className={cx("wrapper", {
               isNotDesktop
            })}
         >
            <FormProvider {...configPresentationForm}>
               <Header />

               <Modal
                  title={"Create Slide"}
                  show={presentationDetailStore.state.showCreateNewSlideModal}
                  setShow={presentationDetailStore.method.setShowCreateNewSlideModal}
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
                  show={presentationDetailStore.state.showChangeThemeModal}
                  setShow={presentationDetailStore.method.setShowChangeThemeModal}
                  haveSubmitBtn
                  submitBtnTitle={"Create"}
               >
                  <div className={cx("choice-theme-group")}>
                     <div className={cx("item")}>
                        <input type="radio" value="DARK" name="theme" />
                        <span className={cx("label")}>Dark</span>
                     </div>
                     <div className={cx("item")}>
                        <input type="radio" value="LIGHT" name="theme" />
                        <span className={cx("label")}>Light</span>
                     </div>
                  </div>
               </Modal>
            </FormProvider>

            <FormProvider {...configSlideForm}>
               {!isNotDesktop ? (
                  <div className={cx("container")}>
                     <SlideList />

                     <div className={cx("slide-current")}>
                        <div className={cx("slide-area-wrapper")}>
                           <SlideArea />
                        </div>
                        <div className={cx("slide-config-wrapper")}>
                           <SlideConfig />
                        </div>
                     </div>
                  </div>
               ) : presentationDetailStore.state.isShowSlideListWhenNotDesktop ? (
                  <SlideList />
               ) : (
                  <div className={cx("slide-current")}>
                     <div className={cx("slide-config-wrapper")}>
                        <SlideConfig />
                     </div>
                  </div>
               )}
            </FormProvider>
         </div>
      )
   );
}

export default PresentationDetailPage;
