import Modal from "../../../components/Modal";

function DeleteModal({ show, setShow, data, setData, handleSubmitForm }) {
   const handleSubmitModal = async (submitData) => {
      await handleSubmitForm(submitData);
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

export default DeleteModal;
