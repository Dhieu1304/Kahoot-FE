import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { usePresentationDetailStore } from "./store";

function PresentationDetailEmptyPage() {
   const presentationDetailStore = usePresentationDetailStore();
   const navigate = useNavigate();
   const location = useLocation();

   useEffect(() => {
      const presentationId = location.pathname.split("/presentation/")[1].split("/")[0];
      const slides = presentationDetailStore.state.slides;
      const slide =
         presentationDetailStore.state.slides.length > 0 && presentationDetailStore.state.slides[0];
      if (slide && slide?.ordinalSlideNumber) {
         const slideId = slide?.ordinalSlideNumber;

         navigate(`/presentation/${presentationId}/edit/${slideId}`);
      } else {
         navigate(`/presentation/${presentationId}/edit/0`);
      }
   }, []);

   return <h1>PresentationDetailEmptyPage</h1>;
}

export default PresentationDetailEmptyPage;
