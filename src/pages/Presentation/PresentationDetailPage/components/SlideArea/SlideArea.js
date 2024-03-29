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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useFormContext } from "react-hook-form";
import { HEADING, MULTIPLE_CHOICE, PARAGRAPH } from "../../../../../config/configSlideTypes";
const cx = classNames.bind(styles);

function SlideArea() {
   const presentationDetailStore = usePresentationDetailStore();

   const configSlideForm = useFormContext();
   const { watch } = configSlideForm;

   const [result, setResult] = useState([]);

   useEffect(() => {
      const currentBody = watch("body");

      const resultWithCount = currentBody?.map((cur) => ({
         ...cur,
         count: 10
      }));

      setResult(resultWithCount);
   }, [watch("body")]);

   const renderContenBySlideTypeId = () => {
      const slideType = watch("slideType");
      switch (slideType.id) {
         case MULTIPLE_CHOICE:
            return (
               <div className={cx("content-multiphy")}>
                  <h1 className={cx("title")}>{watch("title")}</h1>
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
                           <YAxis dataKey="count" domain={[0, "dataMax + 10"]} />
                           <Tooltip />
                           <Legend />
                           <Bar
                              dataKey="count"
                              fill="rgba(206, 179, 101)"
                              margin={{
                                 top: 5,
                                 right: 30,
                                 left: 20,
                                 bottom: 5
                              }}
                           >
                              <LabelList dataKey="count" position="top" />
                           </Bar>
                        </BarChart>
                     </ResponsiveContainer>
                  </div>
               </div>
            );

         case HEADING:
            return (
               <div className={cx("content-heading")}>
                  <h1 className={cx("title")}>{watch("title")}</h1>
                  <h1 className={cx("description")}>{watch("description")}</h1>
               </div>
            );
         case PARAGRAPH:
            return (
               <div className={cx("content-paragraph")}>
                  <h1 className={cx("title")}>{watch("title")}</h1>
                  <h1 className={cx("description")}>{watch("description")}</h1>
               </div>
            );

         default:
            return <h1>No slide type</h1>;
      }
   };

   return (
      <div
         className={cx("container")}
         style={{
            backgroundColor:
               presentationDetailStore.state.presentation?.presentationTheme.backgroundColor,
            color: presentationDetailStore.state.presentation?.presentationTheme.textColor
         }}
      >
         <div className={cx("board")}>
            <h1 className={cx("infor")}>
               Go to
               <span className={cx("infor-label")}>{process.env.REACT_APP_BE_URL + "game"}</span>
               and use the code
               <span className={cx("infor-label")}>
                  {presentationDetailStore.state.presentation?.code}
               </span>
            </h1>

            <div className={cx("content")}>
               {renderContenBySlideTypeId()}

               <div className={cx("count-votes")}>
                  <span className={cx("count-votes-number")}>
                     {result?.reduce((sum, cur) => sum + cur.count, 0) || 0}
                  </span>
                  <FontAwesomeIcon icon={faUser} size={"1x"} className={cx("count-votes-icon")} />
               </div>
            </div>
         </div>
      </div>
   );
}

export default SlideArea;
