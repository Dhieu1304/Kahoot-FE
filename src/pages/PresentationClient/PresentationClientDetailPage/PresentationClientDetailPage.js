import { faCircle } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../../../components/Button";
import styles from "./PresentationClientDetailPage.module.scss";

const cx = classNames.bind(styles);

const options = [
   {
      id: 1,
      value: "Option 1"
   },
   {
      id: 2,
      value: "Option 2"
   },
   {
      id: 3,
      value: "Option 3"
   },
   {
      id: 4,
      value: "Option 4"
   },
   {
      id: 5,
      value: "Option 5"
   }
];

function PresentationClientDetailPage() {
   const [optionIndex, setOptionIndex] = useState(-1);
   const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);

   const handleSubmitAnswer = async (data) => {
      console.log("handleSubmitAnswer: ", handleSubmitAnswer);
      setIsSubmitSuccess(true);
   };

   return (
      <div className={cx("wrapper")}>
         {!isSubmitSuccess ? (
            <div className={cx("container")}>
               <div className={cx("option-list")}>
                  {options.map((option, index) => {
                     return (
                        <div className={cx("option-item")} key={index}>
                           <FontAwesomeIcon
                              icon={faCircle}
                              size="1x"
                              onClick={() => {
                                 setOptionIndex(index);
                              }}
                              color={optionIndex === index ? "red" : "white"}
                           />
                           <span className={cx("label")}>{option.value}</span>
                        </div>
                     );
                  })}
               </div>
               <Button title={"Submit"} rounded basicBlue big w100 onClick={handleSubmitAnswer} />
            </div>
         ) : (
            <h1 className={cx("success-message")}>Please wating host change slide</h1>
         )}
      </div>
   );
}

export default PresentationClientDetailPage;
