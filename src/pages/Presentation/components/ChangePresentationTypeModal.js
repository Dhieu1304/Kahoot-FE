import Modal from "../../../components/Modal";

function ChangePresentationTypeModal({ show, setShow, data, setData, handleSubmitForm }) {
   const handleSubmitModal = async (submitData) => {
      await handleSubmitForm(submitData);
      setShow(false);
      setData(null);
   };

   return (
      <Modal
         title={"Change type"}
         haveSubmitBtn
         submitBtnTitle={"Change"}
         onSubmitModal={handleSubmitModal}
         show={show}
         setShow={setShow}
         data={data}
         setData={setData}
      />
   );
}

export default ChangePresentationTypeModal;
