import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { usePresentationPlayStore } from "./store";

function PresentationPlayProviderWrapper() {
   const presentationPlayStore = usePresentationPlayStore();

   const location = useLocation();

   useEffect(() => {
      const loadData = async () => {
         const presentationConfig = await presentationPlayStore.method.loadConfig();

         const presentationId = location.pathname.split("/presentation/")[1].split("/")[0];
         const presentationDetail = await presentationPlayStore.method.loadPresentationDetail(
            presentationId
         );

         presentationPlayStore.method.setInit();
      };
      loadData();
   }, []);

   return presentationPlayStore.state.isInit && <Outlet />;
}

export default PresentationPlayProviderWrapper;
