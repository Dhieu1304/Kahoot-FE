import {
   faArrowLeft,
   faArrowRight,
   faComment,
   faEdit,
   faExpand,
   faMessage,
   faUser
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
   Bar,
   BarChart,
   LabelList,
   Legend,
   ResponsiveContainer,
   XAxis,
   YAxis,
   Tooltip
} from "recharts";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import classNames from "classnames/bind";
import styles from "./PresentationPlayPage.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../../../providers/socket";
import { PRESENTATION_EVENT } from "../../../providers/socket/socket.constant";
import { usePresentationPlayStore } from "./store";
import { HEADING, MULTIPLE_CHOICE, PARAGRAPH } from "../../../config/configSlideTypes";
import QuestionModal from "./components/QuestionModal";
import { toast } from "react-toastify";
import Chat from "./components/Chat";
import presentationServices from "../../../services/presentationServices";
import { AuthContext } from "../../../providers/auth";

const cx = classNames.bind(styles);

function PresentationPlayPage() {
   const [slide, setSlide] = useState();
   const [countSlide, setCountSlide] = useState(1);
   const [result, setResult] = useState([]);
   const [chatMessageList, setChatMessageList] = useState([]);
   const [questionList, setQuestionList] = useState([]);
   const [countOnl, setCountOnl] = useState(0);
   const [isNewMessage, setIsNewMessage] = useState(false);
   const [isFullScreen, setIsFullScreen] = useState(false);

   const authContext = useContext(AuthContext);
   const socket = useContext(SocketContext);
   const presentationPlayStore = usePresentationPlayStore();
   const { showChatBox, setShowChatBox, showQuestionModal, setShowQuestionModal } =
      presentationPlayStore;
   const location = useLocation();
   const presentationId = location.pathname.split("/presentation/")[1].split("/")[0];
   const navigate = useNavigate();

   useEffect(() => {
      socket.emit(PRESENTATION_EVENT.PRESENT, {
         presentation_id: presentationId
      });
      socket.on(PRESENTATION_EVENT.COUNT_ONL, (countOnl) => {
         setCountOnl(countOnl);
      });
      socket.on(PRESENTATION_EVENT.SLIDE_DATA, (data) => {
         setSlide(data);
         if (data.slide_type_id === 1) {
            setResult(data.body);
         }
      });
      socket.on(PRESENTATION_EVENT.STOP_PRESENT, (data) => {
         toast.info(data);
         navigate("/presentation");
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

            if (newChat.userId === authContext.user?.id) setIsNewMessage(false);
            else setIsNewMessage(true);
         }
      });

      return () => {
         socket.emit(PRESENTATION_EVENT.STOP_PRESENT, { presentation_id: presentationId });
         socket.off(PRESENTATION_EVENT.COUNT_ONL);
         socket.off(PRESENTATION_EVENT.SLIDE_DATA);
         socket.off(PRESENTATION_EVENT.STOP_PRESENT);
         socket.off(PRESENTATION_EVENT.QUESTION);
         socket.off(PRESENTATION_EVENT.NEW_MESSAGE);
      };
   }, []);

   useEffect(() => {
      const loadData = async () => {
         // get slide & data
         const result = await presentationServices.presentSlideShow(presentationId);
         console.log("result: ", result);
         if (!result) {
            navigate("/presentation");
            return;
         }
         socket.emit(PRESENTATION_EVENT.JOIN_HOST, { data: result.join_host });
         setCountSlide(result.count_slide || 1);
         /*
         const slideRes = await presentationServices.getSlideAndDataPresentation(
            presentationId,
            result.ordinal_slide_number
         );
         console.log("result: ", slideRes);
         */
         if (result.slide) {
            setSlide(result.slide);
            if (result.slide.slide_type_id === 1) {
               setResult(result.slide.body);
            }
         }

         // get chat
         const chatMessageListTemp = await presentationServices.getChatByPresentationId(
            presentationId
         );
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

         // question
         const questionListTemp = await presentationServices.getQuestionsByPresentationId(
            presentationId
         );
         setQuestionList((prev) => [...questionListTemp]);
      };
      loadData();
   }, []);

   const handleFullscreen = useFullScreenHandle();

   const handleChangeSlide = async (type) => {
      switch (type) {
         case "next":
            if (slide?.ordinal_slide_number < countSlide) {
               await presentationServices.presentOtherSlide(
                  slide.presentation_id,
                  slide.ordinal_slide_number + 1
               );
            } else {
               toast.info("This is the last slide");
            }
            break;
         case "prev":
            if (slide?.ordinal_slide_number > 1) {
               await presentationServices.presentOtherSlide(
                  slide.presentation_id,
                  slide.ordinal_slide_number - 1
               );
            } else {
               toast.info("This is the first slide");
            }
            break;
         default:
            break;
      }
   };

   const handleScroll = async (e) => {
      let element = e.target;
      if (element.scrollTop === 0) {
         const chatMessageListTemp = await presentationServices.getChatByPresentationId(
            presentationId,
            Math.ceil((chatMessageList.length + 1) / 20),
            20
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
      await presentationServices.sendMessageByPresentationId(presentationId, message);
   };

   const renderContentBySlideTypeId = () => {
      if (!slide) return;
      const slideTypeId = slide?.slide_type_id || -1;
      switch (slideTypeId) {
         case MULTIPLE_CHOICE:
            return (
               <div className={cx("content-multiphy")}>
                  <h1 className={cx("title")}>{slide?.title}</h1>
                  <div className={cx("chart-area")}>
                     <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                           width={"100%"}
                           height={"100%"}
                           data={result}
                           margin={{
                              top: 5,
                              right: 30,
                              left: 20,
                              bottom: 5
                           }}
                        >
                           <XAxis dataKey="name" />
                           {/* <YAxis dataKey="value" domain={[0, (dataMax) => 1]} /> */}
                           <YAxis dataKey="value" />
                           <Tooltip />
                           <Legend />
                           <Bar
                              dataKey="value"
                              fill="rgba(206, 179, 101)"
                              margin={{
                                 top: 5,
                                 right: 30,
                                 left: 20,
                                 bottom: 5
                              }}
                           >
                              <LabelList dataKey="value" position="top" />
                           </Bar>
                        </BarChart>
                     </ResponsiveContainer>
                  </div>
               </div>
            );

         case HEADING:
            return (
               <div className={cx("content-heading")}>
                  <h1 className={cx("title")}>{slide?.title}</h1>
                  <h1 className={cx("description")}>{slide?.description}</h1>
               </div>
            );
         case PARAGRAPH:
            return (
               <div className={cx("content-paragraph")}>
                  <h1 className={cx("title")}>{slide?.title}</h1>
                  <h1 className={cx("description")}>{slide?.description}</h1>
               </div>
            );

         default:
            return <h1>No slide type</h1>;
      }
   };

   return (
      <div>
         <FullScreen handle={handleFullscreen}>
            <div className={cx("wrapper")}>
               <div
                  className={cx("header-icon-group")}
                  style={{
                     color: presentationPlayStore.state.presentation?.presentationTheme.textColor
                  }}
               >
                  <FontAwesomeIcon
                     icon={faArrowLeft}
                     size="1x"
                     className={cx("icon")}
                     onClick={() => {
                        navigate("/presentation");
                     }}
                  />
                  <FontAwesomeIcon
                     icon={faEdit}
                     size="1x"
                     className={cx("icon")}
                     onClick={() => {
                        navigate(`/presentation/${presentationId}/edit`);
                     }}
                  />
                  <span className={cx("slide-number")}>{slide?.ordinal_slide_number}</span>
                  <span className={cx("slide-number")}>/</span>
                  <span className={cx("slide-number")}>
                     {presentationPlayStore.state?.slides?.length}
                  </span>
               </div>

               <div
                  className={cx("container")}
                  style={{
                     backgroundColor:
                        presentationPlayStore.state.presentation?.presentationTheme.backgroundColor,
                     color: presentationPlayStore.state.presentation?.presentationTheme.textColor
                  }}
               >
                  <div className={cx("board")}>
                     <h1 className={cx("infor")}>
                        Go to
                        <span className={cx("infor-label")}>
                           {process.env.REACT_APP_FE_URL + "/presentation-client"}
                        </span>
                        and use the code
                        <span className={cx("infor-label")}>
                           {presentationPlayStore.state.presentation?.code}
                        </span>
                     </h1>

                     <div className={cx("content")}>
                        {renderContentBySlideTypeId()}

                        <div className={cx("menu")}>
                           <div className={cx("item", "item-has-chat")}>
                              <FontAwesomeIcon
                                 className={cx("icon")}
                                 size={"1x"}
                                 icon={faMessage}
                                 onClick={() => {
                                    setShowChatBox((prev) => !prev);
                                    setIsNewMessage(false);
                                 }}
                              />

                              {isNewMessage && <div className={cx("notify")}></div>}

                              {showChatBox && (
                                 <Chat
                                    chatMessageList={chatMessageList}
                                    handleScroll={handleScroll}
                                    handleSendMessage={handleSendMessage}
                                    theme={
                                       presentationPlayStore.state.presentation?.presentationThemeId
                                    }
                                 />
                              )}
                           </div>
                           <div className={cx("item")}>
                              <FontAwesomeIcon
                                 className={cx("icon")}
                                 size={"1x"}
                                 icon={faComment}
                                 onClick={() => {
                                    setShowQuestionModal((prev) => !prev);
                                 }}
                              />
                           </div>
                           <div className={cx("item")}>
                              <FontAwesomeIcon
                                 className={cx("icon")}
                                 size={"1x"}
                                 icon={faArrowLeft}
                                 onClick={() => handleChangeSlide("prev")}
                              />
                           </div>
                           <div className={cx("item")}>
                              <FontAwesomeIcon
                                 className={cx("icon")}
                                 size={"1x"}
                                 icon={faArrowRight}
                                 onClick={() => handleChangeSlide("next")}
                              />
                           </div>
                           <div className={cx("item")}>
                              {isFullScreen ? (
                                 <FontAwesomeIcon
                                    className={cx("icon")}
                                    size={"1x"}
                                    icon={faExpand}
                                    onClick={async () => {
                                       setIsFullScreen(false);
                                       await handleFullscreen.exit();
                                    }}
                                 />
                              ) : (
                                 <FontAwesomeIcon
                                    className={cx("icon")}
                                    size={"1x"}
                                    icon={faExpand}
                                    onClick={async () => {
                                       setIsFullScreen(true);
                                       await handleFullscreen.enter();
                                    }}
                                 />
                              )}
                           </div>
                           <div className={cx("item")}>
                              <span className={cx("count-votes-number")}>{countOnl}</span>
                              <FontAwesomeIcon className={cx("icon")} icon={faUser} size={"1x"} />
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            {showQuestionModal && <QuestionModal questionList={questionList} />}
         </FullScreen>
      </div>
   );
}

export default PresentationPlayPage;
