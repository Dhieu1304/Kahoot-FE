import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import { useCallback, useContext, useEffect, useState } from "react";
import Button from "../../../components/Button";
import styles from "./PresentationClientDetailPage.module.scss";
import { SocketContext } from "../../../providers/socket";
import { PRESENTATION_EVENT, SOCKET_EVENT } from "../../../providers/socket/socket.constant";
import { useParams } from "react-router-dom";
const cx = classNames.bind(styles);

function PresentationClientDetailPage() {
   const defaultMessage = "Please waiting host change slide";
   const [optionIndex, setOptionIndex] = useState(-1);
   const [options, setOptions] = useState([]);
   const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);
   const [message, setMessage] = useState(defaultMessage);

   const socket = useContext(SocketContext);
   const code = useParams().code;

   useEffect(() => {
      socket.emit(PRESENTATION_EVENT.JOIN, { code });
      socket.on(SOCKET_EVENT.ERROR, (message) => {
         console.error(message);
      });
      socket.on(SOCKET_EVENT.NOTIFICATION, (message) => {
         console.info(message);
      });
      socket.on(SOCKET_EVENT.SUCCESS, (message) => {
         console.log(message);
      });
      socket.on(PRESENTATION_EVENT.SLIDE, (data) => {
         console.log(data);
         if (data?.body) {
            setOptions(data.body);
            setIsSubmitSuccess(false);
         } else {
            setMessage(data);
            setIsSubmitSuccess(true);
         }
      });

      return () => {
         const arrSocketEvent = Object.values(SOCKET_EVENT);
         for (let i = 0; i < arrSocketEvent.length; i++) {
            socket.off(arrSocketEvent[i]);
         }
         socket.off(PRESENTATION_EVENT.SLIDE);
      };
   }, []);

   const handleSubmit = useCallback((name) => {
      socket.emit(PRESENTATION_EVENT.SUBMIT_ANSWER, { code, name });
      setMessage(defaultMessage);
      setIsSubmitSuccess(true);
   }, []);

   const handleSubmitAnswer = () => {
      const name = options[optionIndex]?.name;
      handleSubmit(name);
   };

   return (
      <div className={cx("wrapper")}>
         {!isSubmitSuccess ? (
            <div className={cx("container")}>
               <div className={cx("option-list")}>
                  {options.map((option, index) => {
                     return (
                        <div className={cx("option-item")} key={index}>
                           <FontAwesomeIcon
                              icon={faCircle}
                              size="1x"
                              onClick={() => {
                                 setOptionIndex(index);
                              }}
                              color={optionIndex === index ? "red" : "white"}
                           />
                           <span className={cx("label")}>{option.name}</span>
                        </div>
                     );
                  })}
               </div>
               <Button title={"Submit"} rounded basicBlue big w100 onClick={handleSubmitAnswer} />
            </div>
         ) : (
            <h1 className={cx("success-message")}>{message}</h1>
         )}
      </div>
   );
}

export default PresentationClientDetailPage;
