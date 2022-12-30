import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { usePresentationPlayStore } from "./store";

function PresentationPlayEmptyPage() {
   const presentationPlayStore = usePresentationPlayStore();
   const navigate = useNavigate();
   const location = useLocation();

   useEffect(() => {
      const presentationId = location.pathname.split("/presentation/")[1].split("/")[0];
      const slides = presentationPlayStore.state.slides;

      // Thay vì lấy slide thứ [0] nó sẽ lấy theo slide_origin_ hienj tại mà socket đưa về

      const slide =
         presentationPlayStore.state.slides.length > 0 && presentationPlayStore.state.slides[0];
      if (slide && slide?.ordinalSlideNumber) {
         const slideId = slide?.ordinalSlideNumber;

         navigate(`/presentation/${presentationId}/play/${slideId}`);
      } else {
         navigate(`/presentation/${presentationId}/edit/0`);
      }
   }, []);

   return <h1>PresentationPlayEmptyPage</h1>;
}

export default PresentationPlayEmptyPage;
