import { useEffect } from "react";
import { Navigate, Outlet, useLocation, useOutlet } from "react-router-dom";
import { usePresentationPlayStore } from "./store";

function PresentationPlayProviderWrapper() {
   const presentationPlayStore = usePresentationPlayStore();

   const location = useLocation();
   const outlet = useOutlet();

   useEffect(() => {
      const loadData = async () => {
         console.log("LOAD");

         const presentationConfig = await presentationPlayStore.method.loadConfig();

         const presentationId = location.pathname.split("/presentation/")[1].split("/")[0];
         const presentationDetail = await presentationPlayStore.method.loadPresentationDetail(
            presentationId
         );

         presentationPlayStore.method.setInit();
      };
      loadData();
   }, []);

   const renderNoOutlet = () => {
      const presentationId = location.pathname.split("/presentation/")[1].split("/")[0];
      const slides = presentationPlayStore.state.slides;
      const slide = slides.length > 0 && presentationPlayStore.state.slides[0];

      let to = `/presentation/${presentationId}/edit/0`;
      if (slide && slide?.ordinalSlideNumber) {
         const slideId = slide?.ordinalSlideNumber;

         to = `/presentation/${presentationId}/play/${slideId}`;
      }
      return <Navigate to={to} />;
   };

   // Make sure to only return to the UI after the API has finished loading
   return presentationPlayStore.state.isInit && (outlet ? <Outlet /> : renderNoOutlet());
}

export default PresentationPlayProviderWrapper;
