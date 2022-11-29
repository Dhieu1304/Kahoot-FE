import React, { useState } from "react";
import classNames from "classnames/bind";

import BootstrapModal from "react-bootstrap/Modal";
import Button from "../Button/Button";
import styles from "./Modal.module.scss";

const cx = classNames.bind(styles);

function Modal({ title, show, setShow, children, haveSubmitBtn, onSubmitModal, submitBtnTitle }) {
   //    const [show, setShow] = useState(false);

   const handleClose = () => setShow(false);

   return (
      <div>
         <BootstrapModal show={show} onHide={handleClose} centered className={cx("wrapper")}>
            <div className={cx("container")}>
               <BootstrapModal.Header closeButton className={cx("header")}>
                  <BootstrapModal.Title className={cx("title")}>{title}</BootstrapModal.Title>
               </BootstrapModal.Header>
               <BootstrapModal.Body className={cx("body")}>{children}</BootstrapModal.Body>
               <BootstrapModal.Footer className={cx("footer")}>
                  <Button cancel onClick={handleClose} title="Cancel" big rounded />
                  {haveSubmitBtn && (
                     <Button
                        submitModal
                        onClick={onSubmitModal}
                        title={submitBtnTitle || "Save"}
                        big
                        rounded
                     />
                  )}
               </BootstrapModal.Footer>
            </div>
         </BootstrapModal>
      </div>
   );
}

export default Modal;
