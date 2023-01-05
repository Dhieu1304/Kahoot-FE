import { faCircle, faComment, faMessage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import { useCallback, useContext, useEffect, useState } from "react";
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

   const [chatMessageList, setChatMessageList] = useState([
      {
         userId: 1,
         content: "Hello World 1"
      },
      {
         userId: 2,
         content: "Hello World 2"
      },
      {
         userId: 3,
         content: "Hello World 3"
      },
      {
         userId: 4,
         content: "Hello World 4"
      },
      {
         userId: 5,
         content: "Hello World 5"
      },
      {
         userId: 5,
         content: "Hello World 5"
      },
      {
         userId: 5,
         content: "Hello World 5"
      },
      {
         userId: 5,
         content: "Hello World 5"
      },
      {
         userId: 5,
         content: "Hello World 5"
      },
      {
         userId: 1,
         content: "Hello World 1"
      }
   ]);

   const [questionList, setQuestionList] = useState([
      {
         userId: 1,
         content: "Hello World 1"
      },
      {
         userId: 2,
         content: "Hello World 2"
      },
      {
         userId: 3,
         content: "Hello World 3"
      },
      {
         userId: 4,
         content: "Hello World 4"
      },
      {
         userId: 5,
         content: "Hello World 5"
      },
      {
         userId: 5,
         content: "Hello World 5"
      },
      {
         userId: 5,
         content: "Hello World 5"
      },
      {
         userId: 5,
         content: "Hello World 5"
      },
      {
         userId: 5,
         content: "Hello World 5"
      },
      {
         userId: 1,
         content: "Hello World 1"
      }
   ]);
   const defaultMessage = "Please waiting host change slide";
   const [optionIndex, setOptionIndex] = useState(-1);
   const [options, setOptions] = useState([]);
   const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);
   const [message, setMessage] = useState(defaultMessage);

   const socket = useContext(SocketContext);
   const code = useParams().code;

   const authContext = useContext(AuthContext);

   useEffect(() => {
      socket.emit(PRESENTATION_EVENT.JOIN, { code });
      socket.on(PRESENTATION_EVENT.SLIDE, (data) => {
         switch (data.slide_type_id) {
            case 1: // multi choice
               setOptions(data.body);
               setIsSubmitSuccess(false);
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

      return () => {
         socket.off(PRESENTATION_EVENT.SLIDE);
         socket.emit(PRESENTATION_EVENT.LEAVE);
      };
   }, []);

   /////////////

   useEffect(() => {
      //load data
      const loadData = async () => {
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

         setChatMessageList((prev) => [...newChatMessageListTemp]);
      };
      loadData();
   }, []);

   const handleScroll = (e) => {
      let element = e.target;
      if (element.scrollTop === 0) {
         //fetch messages
         console.log("LOADDDDDDDDDDDDD NEW MESSAGE");
      }
   };

   /////////////

   const handleSubmit = useCallback((name) => {
      socket.emit(PRESENTATION_EVENT.SUBMIT_ANSWER, { code, name });
      setMessage(defaultMessage);
      setIsSubmitSuccess(true);
   }, []);

   const handleSubmitAnswer = () => {
      const name = options[optionIndex]?.name;
      handleSubmit(name);
   };

   const handleSendMessage = async (message) => {
      console.log("handleSendMessage: ", message);

      const result = presentationServices.sendMessage(code, message);

      setChatMessageList((prev) => {
         const newChatMessageList = [...prev];

         const userId = authContext.user?.id;
         const newChatMessage = { userId, message };
         newChatMessageList.push(newChatMessage);

         return [...newChatMessageList];
      });
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
            </div>
         </div>
         {showSendQuestionModal && (
            <SendQuestionModal show={showSendQuestionModal} setShow={setShowSendQuestionModal} />
         )}
         {showQuestionModal && <QuestionModal questionList={questionList} />}
      </div>
   );
}

export default PresentationClientDetailPage;
