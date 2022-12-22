import {
   faArrowLeft,
   faArrowRight,
   faComment,
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
import { useContext, useEffect, useState } from "react";

import Button from "../../../components/Button";
import { SocketContext } from "../../../providers/socket";
import { PRESENTATION_EVENT, SOCKET_EVENT } from "../../../providers/socket/socket.constant";
import { usePresentationPlayStore } from "./store";
import Chat from "./components/Chat";

const cx = classNames.bind(styles);

function PresentationPlayPage() {
   const [result, setResult] = useState([]);
   const [countOnl, setCountOnl] = useState(0);
   const socket = useContext(SocketContext);

   const presentatioPlayStore = usePresentationPlayStore();

   const params = useParams();
   const slideId = params.slideId;
   const slide = presentatioPlayStore.state.slides.find((currentSlide) => {
      return currentSlide.ordinalSlideNumber + "" === slideId + "";
   });

   const location = useLocation();
   const presentationId = location.pathname.split("/presentation/")[1].split("/")[0];

   const navigate = useNavigate();

   useEffect(() => {
      const loadData = async () => {
         console.log(">>>>>>>>>>>>>>>>>>>>> loaddata");
         const resultData = slide.body;
         socket.emit(PRESENTATION_EVENT.PRESENT, {
            presentation_id: presentationId,
            ordinal_slide_number: slideId
         });
         socket.emit(PRESENTATION_EVENT.SLIDE_DATA, {
            presentation_id: presentationId,
            ordinal_slide_number: slideId
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

         socket.on(PRESENTATION_EVENT.COUNT_ONL, (countOnl) => {
            setCountOnl(countOnl);
         });
         socket.on(PRESENTATION_EVENT.SLIDE_DATA, (data) => {
            console.log(">>>>>>>>> SLIDE DATA: ", data);
            const newResultData = [...resultData];
            if (data && data.length > 0) {
               for (let i = 0; i < newResultData.length; i++) {
                  for (let j = 0; j < data.length; j++) {
                     if (newResultData[i].name === data[j].name) {
                        newResultData[i].value = data[j].count;
                     }
                  }
               }
            } else {
               for (let i = 0; i < newResultData.length; i++) {
                  newResultData[i].value = 0;
               }
            }
            console.log("newResultData: ", newResultData);
            setResult(newResultData);
         });
         // socket.on(PRESENTATION_EVENT.SLIDE, (data) => {});

         return () => {
            const arrSocketEvent = Object.values(SOCKET_EVENT);
            for (let i = 0; i < arrSocketEvent.length; i++) {
               socket.off(arrSocketEvent[i]);
            }
            socket.emit(PRESENTATION_EVENT.STOP_PRESENT, { presentation_id: presentationId });
            socket.off(PRESENTATION_EVENT.COUNT_ONL);
            socket.off(PRESENTATION_EVENT.SLIDE);
            socket.off(PRESENTATION_EVENT.SLIDE_DATA);
         };
      };

      loadData();
   }, [slideId]);

   const handleFullscreen = useFullScreenHandle();

   return (
      <div>
         <FullScreen handle={handleFullscreen}>
            <div className={cx("wrapper")}>
               {/* <div className={cx("container")}>
                  <h1 className={cx("infor")}>
                     Go to
                     <span className={cx("infor-label")}>
                        {process.env.REACT_APP_BE_URL + "game"}
                     </span>
                     and use the code
                     <span className={cx("infor-label")}>
                        {presentatioPlayStore.state.presentation?.code}
                     </span>
                  </h1>

                  <div className={cx("chart-area")}>
                     <ResponsiveContainer>
                        <BarChart width={600} height={250} data={result}>
                           <XAxis dataKey="name" />
                           <YAxis dataKey="value" domain={[0, "dataMax + 1"]} />
                           <Bar dataKey="value" fill="#8884d8">
                              <LabelList dataKey="value" position="top" />
                           </Bar>
                        </BarChart>
                     </ResponsiveContainer>
                  </div>
                  <div className={cx("count-votes")}>
                     <span className={cx("count-votes-number")}>{countOnl}</span>
                     <FontAwesomeIcon
                        icon={faUser}
                        size={"1x"}
                        className={cx("count-votes-icon")}
                     />
                  </div>
               </div> */}

               <div
                  className={cx("container")}
                  style={{
                     backgroundColor:
                        presentatioPlayStore.state.presentation?.presentationTheme.backgroundColor,
                     color: presentatioPlayStore.state.presentation?.presentationTheme.textColor
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
                           {presentatioPlayStore.state.presentation?.code}
                        </span>
                     </h1>

                     <div className={cx("content")}>
                        {true && (
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
                        )}

                        {false && (
                           <div className={cx("content-heading")}>
                              <h1 className={cx("title")}>{slide?.title}</h1>
                              <h1 className={cx("description")}>{slide?.description}</h1>
                           </div>
                        )}

                        {false && (
                           <div className={cx("content-paragraph")}>
                              <h1 className={cx("title")}>{slide?.title}</h1>
                              <h1 className={cx("description")}>{slide?.description}</h1>
                           </div>
                        )}

                        <div className={cx("menu")}>
                           <div className={cx("item", "item-has-chat")}>
                              <FontAwesomeIcon
                                 className={cx("icon")}
                                 size={"1x"}
                                 icon={faMessage}
                                 onClick={() => {}}
                              />
                              <Chat />
                           </div>
                           <div className={cx("item")}>
                              <FontAwesomeIcon
                                 className={cx("icon")}
                                 size={"1x"}
                                 icon={faComment}
                                 onClick={() => {}}
                              />
                           </div>
                           <div className={cx("item")}>
                              <FontAwesomeIcon
                                 className={cx("icon")}
                                 size={"1x"}
                                 icon={faArrowLeft}
                                 onClick={() => {
                                    let prevSlideId = parseInt(slideId) - 1;
                                    if (prevSlideId < 1) prevSlideId = 1;
                                    navigate(`/presentation/${presentationId}/play/${prevSlideId}`);
                                 }}
                              />
                           </div>
                           <div className={cx("item")}>
                              <FontAwesomeIcon
                                 className={cx("icon")}
                                 size={"1x"}
                                 icon={faArrowRight}
                                 onClick={() => {
                                    let nextSlideId = parseInt(slideId) + 1;
                                    if (nextSlideId > presentatioPlayStore.state.slides?.length)
                                       nextSlideId = presentatioPlayStore.state.slides?.length;
                                    navigate(`/presentation/${presentationId}/play/${nextSlideId}`);
                                 }}
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
   //             {presentatioPlayStore.state.presentation?.code}
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
   //             if (nextId >= presentatioPlayStore.state.slides?.length)
   //                nextId = presentatioPlayStore.state.slides?.length - 1;
   //             navigate(`/presentation/1/${nextId}`);
   //          }}
   //       />
   //    </div>
   // </div>
   // );
}

export default PresentationPlayPage;
