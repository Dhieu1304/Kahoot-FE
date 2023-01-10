import classNames from "classnames/bind";
import { useMediaQuery } from "react-responsive";
import { useParams } from "react-router-dom";
import { slideTypes } from "../../config";
import { usePresentationDetailStore } from "../../store";
import SlideArea from "../SlideArea";
import SlideConfig from "../SlideConfig";
import styles from "./CurrentSlide.module.scss";

const cx = classNames.bind(styles);

function CurrentSlide({ slide }) {
   const presentationDetailStore = usePresentationDetailStore();

   const isNotDesktop = useMediaQuery({ maxWidth: 992 });

   const configSlideForm = useForm({
      mode: "onBlur",
      defaultValues: {
         title: slide?.title,
         body: slide?.body,
         description: slide?.description,
         slideType: slideTypes?.[slide?.slideTypeId] || 1
      }
   });

   return (
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
   );
}

export default CurrentSlide;
