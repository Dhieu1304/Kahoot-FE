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
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useCallback, useContext, useEffect, useState } from "react";

import { SocketContext } from "../../../providers/socket";
import { PRESENTATION_EVENT, SOCKET_EVENT } from "../../../providers/socket/socket.constant";
import { usePresentationPlayStore } from "./store";

import { HEADING, MULTIPLE_CHOICE, PARAGRAPH } from "../../../config/configSlideTypes";
import QuestionModal from "./components/QuestionModal";
import { toast } from "react-toastify";
import Chat from "./components/Chat";

const cx = classNames.bind(styles);

function PresentationPlayPage() {
   const [slide, setSlide] = useState();
   const [countSlide, setCountSlide] = useState(1);
   const [result, setResult] = useState([]);
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
   const [countOnl, setCountOnl] = useState(0);

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

      // DEBUG
      socket.on(SOCKET_EVENT.ERROR, (message) => {
         console.error(message);
      });
      socket.on(SOCKET_EVENT.NOTIFICATION, (message) => {
         console.info(message);
      });
      socket.on(SOCKET_EVENT.SUCCESS, (message) => {
         console.log(message);
      });
      // DEBUG

      socket.on(PRESENTATION_EVENT.SLIDE_DETAIL, (data) => {
         console.log(">>>>>>>>>>SLIDE_DETAIL: ", data);
         setCountSlide(data?.count_slide || 1);
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
         // Todo: Đá nó ra 1 trang nào đó
      });

      return () => {
         const arrSocketEvent = Object.values(SOCKET_EVENT);
         for (let i = 0; i < arrSocketEvent.length; i++) {
            socket.off(arrSocketEvent[i]);
         }
         socket.emit(PRESENTATION_EVENT.STOP_PRESENT, { presentation_id: presentationId });
         socket.off(PRESENTATION_EVENT.COUNT_ONL);
         socket.off(PRESENTATION_EVENT.SLIDE_DATA);
         socket.off(PRESENTATION_EVENT.SLIDE_DETAIL);
         socket.off(PRESENTATION_EVENT.STOP_PRESENT);
      };
   }, []);

   const handleFullscreen = useFullScreenHandle();

   const handleChangeSlideSocket = useCallback((presentation_id, ordinal_slide_number) => {
      socket.emit(PRESENTATION_EVENT.PRESENT_OTHER_SLIDE, {
         presentation_id,
         ordinal_slide_number
      });
   }, []);

   const handleChangeSlide = (type) => {
      switch (type) {
         case "next":
            if (slide?.ordinal_slide_number < countSlide) {
               handleChangeSlideSocket(slide.presentation_id, slide.ordinal_slide_number + 1);
            } else {
               toast.info("This is the last slide");
            }
            break;
         case "prev":
            if (slide?.ordinal_slide_number > 1) {
               handleChangeSlideSocket(slide.presentation_id, slide.ordinal_slide_number - 1);
            } else {
               toast.info("This is the first slide");
            }
            break;
         default:
            break;
      }
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
               <div className={cx("header-icon-group")}>
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
                           {process.env.REACT_APP_BE_URL + "game"}
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
                                 }}
                              />

                              {showChatBox && <Chat chatMessageList={chatMessageList} />}
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
                              <FontAwesomeIcon
                                 className={cx("icon")}
                                 size={"1x"}
                                 icon={faExpand}
                                 onClick={handleFullscreen.enter}
                              />
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

   // return (
   // <div className={cx("wrapper")}>
   //    <div className={cx("container")}>
   //       <h1 className={cx("infor")}>
   //          Go to
   //          <span className={cx("infor-label")}>{process.env.REACT_APP_BE_URL + "game"}</span>
   //          and use the code
   //          <span className={cx("infor-label")}>
   //             {presentationPlayStore.state.presentation?.code}
   //          </span>
   //       </h1>

   //       <div className={cx("chart-area")}>
   //          <ResponsiveContainer>
   //             <BarChart width={600} height={250} data={result}>
   //                <XAxis dataKey="name" />
   //                <YAxis dataKey="value" domain={[0, "dataMax + 1"]} />
   //                <Bar dataKey="value" fill="#8884d8">
   //                   <LabelList dataKey="value" position="top" />
   //                </Bar>
   //             </BarChart>
   //          </ResponsiveContainer>
   //       </div>
   //       <div className={cx("count-votes")}>
   //          <span className={cx("count-votes-number")}>{countOnl}</span>
   //          <FontAwesomeIcon icon={faUser} size={"1x"} className={cx("count-votes-icon")} />
   //       </div>
   //    </div>

   //    <div className={cx("btn-group")}>
   //       <Button
   //          className={cx("btn")}
   //          title={"<-"}
   //          basicBlue
   //          rounded
   //          big
   //          onClick={() => {
   //             let prevId = parseInt(id) - 1;
   //             if (prevId < 0) prevId = 0;
   //             navigate(`/presentation/1/${prevId}`);
   //          }}
   //       />
   //       <Button
   //          className={cx("btn")}
   //          title={"->"}
   //          basicBlue
   //          rounded
   //          big
   //          onClick={() => {
   //             let nextId = parseInt(id) + 1;
   //             if (nextId >= presentationPlayStore.state.slides?.length)
   //                nextId = presentationPlayStore.state.slides?.length - 1;
   //             navigate(`/presentation/1/${nextId}`);
   //          }}
   //       />
   //    </div>
   // </div>
   // );
}

export default PresentationPlayPage;
