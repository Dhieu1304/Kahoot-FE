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

   const { watch } = useFormContext();

   const [result, setResult] = useState([]);

   useEffect(() => {
      // const loadData = async () => {
      //    const resultData = await presentationServices.getResultBySlideId(
      //       presentationDetailStore.state.currentSlide?.id
      //    );

      //    setResult(resultData);
      // };

      // loadData();
      setResult(watch("options"));
   }, [watch("options")]);

   return (
      <div className={cx("wrapper")}>
         <div className={cx("container")}>
            <h1 className={cx("infor")}>
               Go to
               <span className={cx("infor-label")}>{process.env.REACT_APP_BE_URL + "game"}</span>
               and use the code
               <span className={cx("infor-label")}>11 22 44</span>
            </h1>
            <h1 className={cx("title")}>{watch("title")}</h1>
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
      </div>
   );
}

export default SlideArea;
