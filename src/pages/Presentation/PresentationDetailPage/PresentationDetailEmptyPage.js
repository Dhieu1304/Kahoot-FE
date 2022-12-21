import { usePresentationDetailStore } from "./store";

function PresentationDetailEmptyPage() {
   const presentationDetailStore = usePresentationDetailStore();
   console.log("presentationDetailStore.state in edit empty: ", presentationDetailStore.state);

   return <h1>PresentationDetailEmptyPage</h1>;
}

export default PresentationDetailEmptyPage;
