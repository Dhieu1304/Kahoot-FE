import Modal from "../../../components/Modal";

function DeletePresentationModal({ show, setShow, data, setData, handleDeletePresentation }) {
   const handleSubmitModal = async (submitData) => {
      await handleDeletePresentation(submitData);
      reset();
      setShow(false);
      setData(null);
   };

   return (
      <Modal
         title={"Delete Presentation"}
         haveSubmitBtn
         submitBtnTitle={"Delete"}
         onSubmitModal={handleSubmitModal}
         show={show}
         setShow={setShow}
         data={data}
         setData={setData}
      />
   );
}

export default DeletePresentationModal;
