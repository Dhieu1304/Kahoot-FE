import {
   BarChart,
   Bar,
   Cell,
   XAxis,
   YAxis,
   CartesianGrid,
   Tooltip,
   Legend,
   ResponsiveContainer,
   Label,
   LabelList
} from "recharts";

import classNames from "classnames/bind";
import { usePresentationDetailStore } from "../../store";
import styles from "./SlideArea.module.scss";
import { useEffect, useState } from "react";
import presentationServices from "../../../../../services/presentationServices";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useFormContext } from "react-hook-form";
const cx = classNames.bind(styles);

function SlideArea() {
   const presentationDetailStore = usePresentationDetailStore();

   const [result, setResult] = useState([]);

   const currentIndex = presentationDetailStore.state.currentSlideIndex;

   return (
      <div className={cx("container")}>
         <div className={cx("board")}>
            <h1 className={cx("infor")}>
               Go to
               <span className={cx("infor-label")}>{process.env.REACT_APP_BE_URL + "game"}</span>
               and use the code
               <span className={cx("infor-label")}>
                  {presentationDetailStore.state.presentation?.code}
               </span>
            </h1>
            <h1 className={cx("title")}>
               {presentationDetailStore.state.slides[currentIndex]?.title}
            </h1>
            <div className={cx("chart-area")}>
               <ResponsiveContainer>
                  <BarChart width={600} height={250} data={result}>
                     <XAxis dataKey="name" />
                     <YAxis dataKey="count" domain={[0, "dataMax + 10"]} />
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
      </div>
   );
}

export default SlideArea;
