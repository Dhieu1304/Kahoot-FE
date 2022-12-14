import { useEffect, useState } from "react";

import Header from "./components/Header";
import SlideList from "./components/SlideList";
import { usePresentationDetailStore } from "./store";

import classNames from "classnames/bind";
import styles from "./PresentationDetailPage.module.scss";
import SlideArea from "./components/SlideArea";
import SlideConfig from "./components/SlideConfig";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import CurrentSlide from "./components/CurrentSlide";
import { useLocation } from "react-router-dom";
const cx = classNames.bind(styles);

function PresentationDetailPage() {
   const presentationDetailStore = usePresentationDetailStore();

   const location = useLocation();

   useEffect(() => {
      const loadData = async () => {
         const presentationId = location.pathname.split("/presentation/")[1].split("/")[0];
         await presentationDetailStore.method.loadPresentationDetail(presentationId);
      };
      loadData();
   }, []);

   return (
      presentationDetailStore.state?.isInit && (
         <div className={cx("wrapper")}>
            <Header />

            <div className={cx("container")}>
               <SlideList />

               <div className={cx("slide-current")}>
                  <CurrentSlide />
               </div>
            </div>
         </div>
      )
   );
}

export default PresentationDetailPage;
