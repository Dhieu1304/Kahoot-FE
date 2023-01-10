import { useEffect } from "react";
import { usePresentationDetailStore } from "./store";
import { Navigate, Outlet, useLocation, useOutlet } from "react-router-dom";

function PresentationDetailPageWrapper() {
   const presentationDetailStore = usePresentationDetailStore();

   const location = useLocation();
   const outlet = useOutlet();

   useEffect(() => {
      const loadData = async () => {
         // load config of presentation from API (presentation theme list, slide type list)
         await presentationDetailStore.method.loadConfig();

         // location example: http://localhost:5566/presentation/1/edit/2
         // => presentationId = 1
         const presentationId = location.pathname.split("/presentation/")[1].split("/")[0];

         // load presentation detail from API (presentation detail, all slides of this presentation)
         await presentationDetailStore.method.loadPresentationDetail(presentationId);

         // Make sure the config and presentation details have been loaded from the api
         presentationDetailStore.method.setInit();
      };
      loadData();
   }, []);

   // if router doesn't have outlet
   /*
      router with outlet: /presentation/:presentationId/edit/:slideId
      router without outlet: /presentation/:presentationId/edit

      renderNoOutlet is used to find first slide of this presentation
      and navigate to /presentation/:presentationId/edit/:slideId (slideId is the id of first slide)

      if slides.length = 0 of presentation  => navigate to /presentation/${presentationId}/edit/${0}

   */
   const renderNoOutlet = () => {
      const presentationId = location.pathname.split("/presentation/")[1].split("/")[0];
      const slides = presentationDetailStore.state.slides;
      const slide = slides.length > 0 && presentationDetailStore.state.slides[0];

      let to = `/presentation/${presentationId}/edit/0`;
      if (slide && slide?.ordinalSlideNumber) {
         const slideId = slide?.ordinalSlideNumber;

         to = `/presentation/${presentationId}/edit/${slideId}`;
      }
      return <Navigate to={to} />;
   };

   // Make sure to only return to the UI after the API has finished loading
   return presentationDetailStore.state.isInit && (outlet ? <Outlet /> : renderNoOutlet());
}

export default PresentationDetailPageWrapper;
