import { usePresentationDetailStore } from "../../store";
import SlideItem from "./SlideItem";

import classNames from "classnames/bind";
import styles from "./SlideList.module.scss";

const cx = classNames.bind(styles);

const SlideList = ({}) => {
   const presentationDetailStore = usePresentationDetailStore();

   // console.log(
   //    "presentationDetailStore.state.slides in list: ",
   //    presentationDetailStore.state.slides
   // );

   return (
      <div className={cx("wrapper")}>
         <div className={cx("container")}>
            {presentationDetailStore.state.slides?.length > 0 &&
               presentationDetailStore.state.slides?.map((slide, index) => (
                  <SlideItem
                     key={index}
                     index={index}
                     presentationId={presentationDetailStore.state.presentation.id}
                     slide={slide}
                  />
               ))}
         </div>
      </div>
   );
};

export default SlideList;
