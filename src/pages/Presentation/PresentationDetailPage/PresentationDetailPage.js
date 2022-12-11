import classNames from "classnames/bind";
import { useEffect } from "react";

import Header from "./components/Header";
import SlideList from "./components/SlideList";

import styles from "./PresentationDetailPage.module.scss";
import { usePresentationDetailStore } from "./store";
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

   console.log("presentationDetailStore.state: ", presentationDetailStore.state);

   return (
      <div className={cx("wrapper")}>
         <Header />

         <div className={cx("container")}>
            <SlideList />
         </div>
      </div>
   );
}

export default PresentationDetailPage;
