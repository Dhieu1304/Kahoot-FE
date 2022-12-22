import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { usePresentationPlayStore } from "./store";

function PresentationPlayEmptyPage() {
   const presentationPlayStore = usePresentationPlayStore();
   const navigate = useNavigate();
   const location = useLocation();

   console.log("presentationPlayStore.state in edit empty: ", presentationPlayStore.state);

   useEffect(() => {
      const presentationId = location.pathname.split("/presentation/")[1].split("/")[0];
      const slides = presentationPlayStore.state.slides;
      const slide =
         presentationPlayStore.state.slides.length > 0 && presentationPlayStore.state.slides[0];
      if (slide && slide?.ordinalSlideNumber) {
         const slideId = slide?.ordinalSlideNumber;
         console.log("slideId in empty: ", slideId);
         navigate(`/presentation/${presentationId}/play/${slideId}`);
      } else {
         navigate(`/presentation/${presentationId}/edit/0`);
      }
   }, []);

   return <h1>PresentationPlayEmptyPage</h1>;
}

export default PresentationPlayEmptyPage;
