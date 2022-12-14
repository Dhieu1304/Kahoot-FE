import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Bar, BarChart, LabelList, ResponsiveContainer, XAxis, YAxis } from "recharts";
import presentationServices from "../../../services/presentationServices";

import classNames from "classnames/bind";
import styles from "./PresentationPlay.module.scss";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { usePresentationDetailStore } from "../PresentationDetailPage/store";
import Button from "../../../components/Button";
import { SocketContext } from "../../../providers/socket";
import { PRESENTATION_EVENT, SOCKET_EVENT } from "../../../providers/socket/socket.constant";
const cx = classNames.bind(styles);

function PresentationPlayPlay() {
   const [result, setResult] = useState([]);
   const [countOnl, setCountOnl] = useState(0);
   const socket = useContext(SocketContext);
   const params = useParams();
   const id = params.id;
   const location = useLocation();
   const presentationId = location.pathname.split("/presentation/")[1].split("/")[0];

   const presentationDetailStore = usePresentationDetailStore();

   const navigate = useNavigate();

   console.log("RENDER PLAY");

   useEffect(() => {
      socket.emit(PRESENTATION_EVENT.PRESENT, {
         presentation_id: presentationId,
         ordinal_slide_number: id
      });
      socket.emit(PRESENTATION_EVENT.NEW_DATA, {
         presentation_id: presentationId,
         ordinal_slide_number: id
      });
      socket.on(SOCKET_EVENT.ERROR, (message) => {
         console.error(message);
      });
      socket.on(SOCKET_EVENT.NOTIFICATION, (message) => {
         console.info(message);
      });
      socket.on(SOCKET_EVENT.SUCCESS, (message) => {
         console.log(message);
      });
      socket.on(PRESENTATION_EVENT.COUNT_ONL, (countOnl) => {
         setCountOnl(countOnl);
      });
      socket.on(PRESENTATION_EVENT.NEW_DATA, (data) => {
         // map data to show chart
         console.log("PRESENTATION_EVENT.NEW_DATA", data);
      });
      socket.on(PRESENTATION_EVENT.SLIDE, (data) => {
         console.log(data);
      });
      document.body.requestFullscreen();

      return () => {
         const arrSocketEvent = Object.values(SOCKET_EVENT);
         for (let i = 0; i < arrSocketEvent.length; i++) {
            socket.off(arrSocketEvent[i]);
         }
         socket.emit(PRESENTATION_EVENT.STOP_PRESENT, { presentation_id: presentationId });
         socket.off(PRESENTATION_EVENT.COUNT_ONL);
         socket.off(PRESENTATION_EVENT.SLIDE);
         socket.off(PRESENTATION_EVENT.NEW_DATA);
      };
   }, [id]);

   return (
      <div className={cx("wrapper")}>
         <div className={cx("container")}>
            <h1 className={cx("infor")}>
               Go to
               <span className={cx("infor-label")}>{process.env.REACT_APP_BE_URL + "game"}</span>
               and use the code
               <span className={cx("infor-label")}>11 22 44 {Math.floor(Math.random() * 100)}</span>
            </h1>

            <div className={cx("chart-area")}>
               <ResponsiveContainer>
                  <BarChart width={600} height={250} data={result}>
                     <XAxis dataKey="name" />
                     <YAxis dataKey="count" domain={[0, "dataMax + 1000"]} />
                     <Bar dataKey="count" fill="#8884d8">
                        <LabelList dataKey="count" position="top" />
                     </Bar>
                  </BarChart>
               </ResponsiveContainer>
            </div>
            <div className={cx("count-votes")}>
               <span className={cx("count-votes-number")}>
                  {result?.reduce((sum, cur) => sum + cur.count, 0) || 0}
               </span>
               <FontAwesomeIcon icon={faUser} size={"1x"} className={cx("count-votes-icon")} />
            </div>
         </div>
         <Button
            title={"<-"}
            onClick={() => {
               const prevId = parseInt(id) - 1;
               navigate(`/presentation/1/${prevId}`);
            }}
         />
         <Button
            title={"->"}
            onClick={() => {
               const nextId = parseInt(id) + 1;
               navigate(`/presentation/1/${nextId}`);
            }}
         />
      </div>
   );
}

export default PresentationPlayPlay;
