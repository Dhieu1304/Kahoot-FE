import {
   faArrowsLeftRightToLine,
   faPaperPlane,
   faPlay,
   faRightToBracket,
   faX
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useRef } from "react";
import { useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import Avatar from "../../../../../components/Avatar/Avatar";
import Button from "../../../../../components/Button";
import { AuthContext } from "../../../../../providers/auth";
import { getItem, LOCAL_STORAGE } from "../../../../../utils/localStorage";
import { usePresentationClientDetailStore } from "../../store";

import styles from "./Chat.module.scss";
const cx = classNames.bind(styles);

function Chat({ chatMessageList, handleScroll, handleSendMessage }) {
   const {
      watch,
      control,
      reset,
      handleSubmit,
      formState: { errors }
   } = useForm({
      mode: "onChange",
      defaultValues: {
         message: ""
      }
   });
   const presentationClientDetailStore = usePresentationClientDetailStore();

   const { setShowChatBox } = presentationClientDetailStore;

   const bottomRef = useRef(null);
   const [isSendNewMessage, setIsSendNewMessage] = useState(false);

   const authContext = useContext(AuthContext);

   useEffect(() => {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
   }, [isSendNewMessage]);

   const handleSendMessageChat = async ({ message }) => {
      // console.log("message: ", message);
      setIsSendNewMessage((prev) => !prev);

      // In parent component
      handleSendMessage && (await handleSendMessage(message));
      reset();
   };

   const currentUID = getItem(LOCAL_STORAGE.UUID);

   return (
      <div className={cx("container")}>
         <div className={cx("header")}>
            <span className={cx("name")}>Chat box</span>
            <FontAwesomeIcon
               size="1x"
               icon={faX}
               className={cx("icon")}
               onClick={() => {
                  setShowChatBox(false);
               }}
            />
         </div>
         <div className={cx("list-container")} onScroll={handleScroll}>
            <div className={cx("list")}>
               {chatMessageList.map((chatMessage, index) =>
                  authContext.user.id === chatMessage.userId || currentUID === chatMessage.uid ? (
                     <div key={index} className={cx("item", { right: true })}>
                        <div className={cx("message")}>
                           <span className={cx("text")}>{chatMessage?.message}</span>
                        </div>
                        <Avatar
                           title={"Avatar"}
                           placeholder={"Avatar"}
                           size={25}
                           rounded
                           src={authContext?.user?.avatar}
                        />
                     </div>
                  ) : (
                     <div key={index} className={cx("item", { left: true })}>
                        <Avatar
                           title={"Avatar"}
                           placeholder={"Avatar"}
                           size={25}
                           rounded
                           src={chatMessage?.avatar}
                        />
                        <div className={cx("message")}>
                           <span className={cx("text")}>{chatMessage?.message}</span>
                           <div className={cx("message-user-name")}>
                              <span>{chatMessage?.fullName}</span>
                           </div>
                        </div>
                     </div>
                  )
               )}
               <div ref={bottomRef} />
            </div>
         </div>
         <div className={cx("footer")}>
            <Controller
               control={control}
               rules={{
                  required: "Required"
               }}
               render={({ field: { onChange, onBlur, value, name }, fieldState: { error } }) => (
                  <>
                     <div className={cx("chat-input")}>
                        <textarea
                           className={cx("chat-input-field")}
                           value={watch("message")}
                           placeholder={"abc"}
                           onChange={onChange}
                           onBlur={onBlur}
                        />
                     </div>
                     {!error?.message && (
                        <FontAwesomeIcon
                           size="1x"
                           icon={faPlay}
                           className={cx("send-icon")}
                           onClick={handleSubmit(handleSendMessageChat)}
                        />
                     )}
                  </>
               )}
               name="message"
            />
         </div>
      </div>
   );
}

export default Chat;
