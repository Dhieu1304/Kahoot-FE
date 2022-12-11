import { usePresentationDetailStore } from "../../store";
import SlideItem from "../SlideItem";

import classNames from "classnames/bind";
import styles from "./SlideList.module.scss";

const cx = classNames.bind(styles);

const SlideList = ({}) => {
   const presentationDetailStore = usePresentationDetailStore();

   console.log(
      "presentationDetailStore.state.presentation?.questions: ",
      presentationDetailStore.state.presentation?.questions
   );

   return (
      <div className={cx("wrapper")}>
         <div className={cx("container")}>
            {presentationDetailStore.state.presentation?.questions?.length > 0 &&
               presentationDetailStore.state.presentation?.questions.map((slide, index) => (
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
