import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Bar, BarChart, LabelList, ResponsiveContainer, XAxis, YAxis } from "recharts";
import presentationServices from "../../../services/presentationServices";

import classNames from "classnames/bind";
import styles from "./PresentationPlayPlay.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { usePresentationDetailStore } from "../PresentationDetailPage/store";
import Button from "../../../components/Button";
const cx = classNames.bind(styles);

function PresentationPlayPlay() {
   const [result, setResult] = useState([]);
   const params = useParams();

   const id = params.id;

   console.log("id: ", id);

   const presentationDetailStore = usePresentationDetailStore();

   const navigate = useNavigate();

   console.log("RENDER PLAY");

   useEffect(() => {
      const loadData = async () => {
         // const id = 1;
         await presentationDetailStore.method.loadPresentationDetail(id);
         const resultData = await presentationServices.getResultBySlideId(id);
         setResult(resultData);
      };
      loadData();
      document.body.requestFullscreen();
   }, []);

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
               navigate("/presentation/1/5");
            }}
         />
         <Button
            title={"->"}
            onClick={() => {
               navigate("/presentation/1/6");
            }}
         />
      </div>
   );
}

export default PresentationPlayPlay;
