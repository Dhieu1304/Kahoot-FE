import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { usePresentationDetailStore } from "../../store";
import SlideArea from "../SlideArea";
import SlideConfig from "../SlideConfig";

function CurrentSlide() {
   const presentationDetailStore = usePresentationDetailStore();

   const configForm = useForm({
      defaultValues: {
         title: presentationDetailStore.state?.currentSlide?.title,
         options: presentationDetailStore.state?.currentSlide?.options?.map((option) => ({
            id: option.id,
            name: option.label,
            count: option.count
         }))
      },
      mode: "onChange",
      criteriaMode: "all"
   });

   useEffect(() => {
      configForm.setValue("title", presentationDetailStore.state?.currentSlide?.title);
      configForm.setValue(
         "options",
         presentationDetailStore.state?.currentSlide?.options?.map((option) => ({
            id: option.id,
            name: option.label,
            count: option.count
         }))
      );
   }, [presentationDetailStore.state?.currentSlide]);

   console.log("configForm.watch('title'): ", configForm.watch("title"));
   console.log("configForm.watch('options'): ", configForm.watch("options"));

   return (
      <FormProvider {...configForm}>
         <SlideArea />
         <SlideConfig />
      </FormProvider>
   );
}

export default CurrentSlide;
