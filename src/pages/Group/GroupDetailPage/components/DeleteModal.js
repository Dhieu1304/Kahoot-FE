import Modal from "../../../../components/Modal";

function DeleteModal({ title, show, setShow, data, setData, handleSubmitModalForm }) {
   const handleSubmitModal = async () => {
      handleSubmitModalForm && (await handleSubmitModalForm(data?.userId));
      setShow(false);
      setData(null);
   };

   return (
      <Modal
         title={title || "Delete"}
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
