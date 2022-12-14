import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useDebounce } from "../../../../../hooks";
import presentationServices from "../../../../../services/presentationServices";
import { usePresentationDetailStore } from "../../store";
import SlideArea from "../SlideArea";
import SlideConfig from "../SlideConfig";

function CurrentSlide() {
   const presentationDetailStore = usePresentationDetailStore();

   const currentSlideIndex = presentationDetailStore.state.currentSlideIndex;

   return (
      <>
         <SlideArea />
         <SlideConfig />
      </>
   );
}

export default CurrentSlide;
