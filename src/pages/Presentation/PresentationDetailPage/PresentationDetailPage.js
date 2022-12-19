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
const cx = classNames.bind(styles);

function PresentationDetailPage() {
   const presentationDetailStore = usePresentationDetailStore();

   const configSlideForm = useForm({
      defaultValues: {
         title: "",
         body: [],
         description: ""
      }
   });

   // LoadData for presentation detail
   const location = useLocation();
   useEffect(() => {
      const loadData = async () => {
         const presentationId = location.pathname.split("/presentation/")[1].split("/")[0];
         await presentationDetailStore.method.loadPresentationDetail(presentationId);
      };
      loadData();
   }, []);

   const isNotDesktop = useMediaQuery({ maxWidth: 992 });

   return (
      presentationDetailStore.state?.isInit && (
         <div className={cx("wrapper")}>
            <Header />

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
               <div
                  className={cx("slide-current", {
                     isNotDesktop
                  })}
               >
                  <div className={cx("slide-area-wrapper")}>
                     <SlideArea />
                  </div>
                  <div className={cx("slide-config-wrapper")}>
                     <SlideConfig />
                  </div>
               </div>
            )}
         </div>
      )
   );
}

export default PresentationDetailPage;
