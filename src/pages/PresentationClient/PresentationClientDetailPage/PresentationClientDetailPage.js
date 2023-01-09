import { faCircle, faComment, faMessage, faQuestion } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import { useContext, useEffect, useState } from "react";
import Button from "../../../components/Button";
import styles from "./PresentationClientDetailPage.module.scss";
import { SocketContext } from "../../../providers/socket";
import { PRESENTATION_EVENT } from "../../../providers/socket/socket.constant";
import { useParams } from "react-router-dom";
import { usePresentationClientDetailStore } from "./store";
import Chat from "./components/Chat/Chat";
import SendQuestionModal from "./components/SendQuestionModal";
import presentationServices from "../../../services/presentationServices";
import QuestionModal from "./components/QuestionModal/QuestionModal";
import { AuthContext } from "../../../providers/auth";
import { getItem, LOCAL_STORAGE } from "../../../utils/localStorage";
import { toast } from "react-toastify";
const cx = classNames.bind(styles);

function PresentationClientDetailPage() {
   const presentationClientDetailStore = usePresentationClientDetailStore();
   const {
      showChatBox,
      setShowChatBox,
      showQuestionModal,
      setShowQuestionModal,
      showSendQuestionModal,
      setShowSendQuestionModal
   } = presentationClientDetailStore;
   const socket = useContext(SocketContext);
   const authContext = useContext(AuthContext);
   const code = useParams().code;

   const [chatMessageList, setChatMessageList] = useState([]);
   const [questionList, setQuestionList] = useState([]);
   const [optionIndex, setOptionIndex] = useState(-1);
   const [options, setOptions] = useState([]);
   const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);
   const [message, setMessage] = useState("Please wait the host present slide");

   useEffect(() => {
      socket.on(PRESENTATION_EVENT.SLIDE, (data) => {
         if (!data) {
            setMessage("Invalid slide");
            return;
         }
         switch (data?.slide_type_id) {
            case 1: // multi choice
               setIsSubmitSuccess(false);
               setOptions(data?.body);
               setOptionIndex(-1);
               if (data?.submitBy) {
                  const currentUID = getItem(LOCAL_STORAGE.UUID);
                  if (
                     data?.submitBy.includes(currentUID) ||
                     data?.submitBy.includes(authContext?.user?.id)
                  ) {
                     setMessage("You are submit answer, please the host change other slide");
                     setIsSubmitSuccess(true);
                  }
               }
               break;
            case 2: // Heading
               setMessage("Slide with Heading");
               setIsSubmitSuccess(true);
               break;
            case 3: // Paragraph
               setMessage("Slide with Paragraph");
               setIsSubmitSuccess(true);
               break;
            default:
               setMessage(data);
               setIsSubmitSuccess(true);
         }
      });
      socket.on(PRESENTATION_EVENT.QUESTION, (data) => {
         setQuestionList(data);
      });
      socket.on(PRESENTATION_EVENT.NEW_MESSAGE, (data) => {
         if (data) {
            const newChat = {
               id: data.id,
               userId: data.user_id,
               message: data.message,
               uid: data.uid,
               avatar: data.avatar,
               fullName: data.full_name
            };
            setChatMessageList((prev) => [...prev, newChat]);
         }
      });

      return () => {
         socket.off(PRESENTATION_EVENT.SLIDE);
         socket.off(PRESENTATION_EVENT.QUESTION);
         socket.off(PRESENTATION_EVENT.NEW_MESSAGE);
      };
   }, []);

   useEffect(() => {
      const loadData = async () => {
         const clientJoin = await presentationServices.clientJoinPresentationByCode(code);
         if (!clientJoin.status) {
            setMessage(clientJoin.message);
            setIsSubmitSuccess(true);
            return;
         }
         socket.emit(PRESENTATION_EVENT.JOIN_CLIENT, { data: clientJoin.data.join_client });
         if (!clientJoin.data.slide) {
            setMessage("Please wait the host present slide");
            setIsSubmitSuccess(true);
         } else {
            switch (clientJoin?.data.slide.slide_type_id) {
               case 1: // multi choice
                  setIsSubmitSuccess(false);
                  setOptions(clientJoin.data?.slide?.body);
                  if (clientJoin.data?.slide?.submitBy) {
                     const currentUID = getItem(LOCAL_STORAGE.UUID);
                     if (
                        clientJoin.data?.slide?.submitBy.includes(currentUID) ||
                        clientJoin.data?.slide?.submitBy.includes(authContext?.user?.id)
                     ) {
                        setMessage("You are submit answer, please the host change other slide");
                        setIsSubmitSuccess(true);
                     }
                  }
                  break;
               case 2: // Heading
                  setMessage("Slide with Heading");
                  setIsSubmitSuccess(true);
                  break;
               case 3: // Paragraph
                  setMessage("Slide with Paragraph");
                  setIsSubmitSuccess(true);
                  break;
               default:
                  setMessage(clientJoin.data.slide || "");
                  setIsSubmitSuccess(true);
            }
         }
         const chatMessageListTemp = await presentationServices.getChatByPresentationCode(code);
         const newChatMessageListTemp = chatMessageListTemp?.map((chatMessage) => {
            const {
               id,
               userId,
               message,
               uid,
               user: { avatar, fullName }
            } = chatMessage;
            return { id, userId, message, uid, avatar, fullName };
         });
         setChatMessageList((prev) => [...newChatMessageListTemp.reverse()]);

         // question:
         const questionListTemp = await presentationServices.getQuestionsByPresentationCode(code);
         setQuestionList((prev) => [...questionListTemp]);
      };
      loadData();
   }, []);

   const handleSubmitAnswer = async () => {
      const name = options[optionIndex]?.name;
      const currentUID = getItem(LOCAL_STORAGE.UUID);
      const submitAns = await presentationServices.submitAnswer(code, name, currentUID);
      if (submitAns.status) {
         setMessage("Please wait the host change slide");
         setIsSubmitSuccess(true);
      } else {
         toast.error(submitAns.message);
      }
   };

   const handleScroll = async (e) => {
      let element = e.target;
      if (element.scrollTop === 0) {
         const chatMessageListTemp = await presentationServices.getChatByPresentationId(
            null,
            Math.ceil((chatMessageList.length + 1) / 20),
            20,
            code
         );
         if (chatMessageListTemp && chatMessageListTemp.length > 0) {
            const newChatMessageListTemp = chatMessageListTemp?.map((chatMessage) => {
               const {
                  id,
                  userId,
                  message,
                  uid,
                  user: { avatar, fullName }
               } = chatMessage;
               return { id, userId, message, uid, avatar, fullName };
            });
            const resultList = [...chatMessageList];
            for (let i = 0; i < newChatMessageListTemp.length; i++) {
               if (newChatMessageListTemp[i].id < resultList[0].id) {
                  const firstArr = newChatMessageListTemp.slice(i).reverse();
                  resultList.unshift(...firstArr);
                  break;
               }
            }
            setChatMessageList(resultList);
         }
      }
   };

   const handleSendMessage = async (message) => {
      await presentationServices.sendMessageByPresentationCode(code, message);
   };

   const handleSendQuestion = async (content) => {
      await presentationServices.addQuestionByPresentationCode(code, content);
   };

   return (
      <div className={cx("wrapper")}>
         <div className={cx("container")}>
            {isSubmitSuccess ? (
               <h1 className={cx("success-message")}>{message}</h1>
            ) : (
               <>
                  <div className={cx("option-list")}>
                     {options.map((option, index) => {
                        return (
                           <div className={cx("option-item")} key={index}>
                              <FontAwesomeIcon
                                 icon={faCircle}
                                 size="1x"
                                 onClick={() => setOptionIndex(index)}
                                 color={optionIndex === index ? "red" : "white"}
                              />
                              <span className={cx("label")}>{option.name}</span>
                           </div>
                        );
                     })}
                  </div>
                  <Button
                     title={"Submit"}
                     rounded
                     basicBlue
                     big
                     w100
                     onClick={handleSubmitAnswer}
                     className={cx("btn")}
                  />
               </>
            )}
            <div className={cx("menu")}>
               <div className={cx("item", "item-has-chat")}>
                  <FontAwesomeIcon
                     className={cx("icon")}
                     size={"1x"}
                     icon={faMessage}
                     onClick={() => setShowChatBox((prev) => !prev)}
                  />
                  {showChatBox && (
                     <Chat
                        chatMessageList={chatMessageList}
                        handleScroll={handleScroll}
                        handleSendMessage={handleSendMessage}
                     />
                  )}
               </div>
               <div className={cx("item")}>
                  <FontAwesomeIcon
                     className={cx("icon")}
                     size={"1x"}
                     icon={faComment}
                     onClick={() => setShowQuestionModal((prev) => !prev)}
                  />
               </div>
               <div className={cx("item")}>
                  <FontAwesomeIcon
                     className={cx("icon")}
                     size={"1x"}
                     icon={faQuestion}
                     onClick={() => setShowSendQuestionModal((prev) => !prev)}
                  />
               </div>
            </div>
         </div>
         {showSendQuestionModal && (
            <SendQuestionModal
               show={showSendQuestionModal}
               setShow={setShowSendQuestionModal}
               handleSendQuestionForm={handleSendQuestion}
            />
         )}
         {showQuestionModal && (
            <QuestionModal
               show={showQuestionModal}
               setShow={setShowQuestionModal}
               questionList={questionList}
            />
         )}
      </div>
   );
}

export default PresentationClientDetailPage;
