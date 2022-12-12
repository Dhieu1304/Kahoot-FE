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
const cx = classNames.bind(styles);

function PresentationDetailPage() {
   const presentationDetailStore = usePresentationDetailStore();

   useEffect(() => {
      const loadData = async () => {
         const id = 1;
         await presentationDetailStore.method.loadPresentationDetail(id);
      };
      loadData();
   }, []);

   // console.log("presentationDetailStore.state: ", presentationDetailStore.state);

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
