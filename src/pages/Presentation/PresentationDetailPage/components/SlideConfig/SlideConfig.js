import classNames from "classnames/bind";
import styles from "./SlideConfig.module.scss";
import Input from "../../../../../components/Input";
import { usePresentationDetailStore } from "../../store";
import Button from "../../../../../components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faX } from "@fortawesome/free-solid-svg-icons";
import { useFieldArray, useForm, useFormContext } from "react-hook-form";
const cx = classNames.bind(styles);

function SlideConfig() {
   const presentationDetailStore = usePresentationDetailStore();

   const currentIndex = presentationDetailStore.state.currentSlideIndex;

   return (
      <div className={cx("config-container")}>
         <div>
            <div className={cx("config-container-content")}>
               <span className={cx("config-label")}>Your question?</span>
               <input
                  value={presentationDetailStore.state?.slides[currentIndex]?.title}
                  onChange={(e) => {
                     const val = e.target.value;
                     const slide = { ...presentationDetailStore.state?.slides[currentIndex] };
                     slide.title = val;
                     presentationDetailStore.method.changeSlides(slide);
                  }}
               />
            </div>

            <div className={cx("config-container-content")}>
               <span className={cx("config-label")}>Options</span>
               <div className={cx("option-list")}>
                  {presentationDetailStore.state?.slides[currentIndex]?.body.map(
                     (option, index) => {
                        return (
                           <div key={index} className={cx("option-item")}>
                              <input
                                 value={option.name}
                                 placeholder={`option ${index + 1}`}
                                 onChange={(e) => {
                                    const val = e.target.value;
                                    const slide = {
                                       ...presentationDetailStore.state?.slides[currentIndex]
                                    };
                                    slide.body[index] = val;
                                    presentationDetailStore.method.changeSlides(slide);
                                 }}
                              />
                              <FontAwesomeIcon
                                 icon={faX}
                                 className={cx("remove-icon")}
                                 size={"1x"}
                                 onClick={() => {
                                    const slide = {
                                       ...presentationDetailStore.state?.slides[currentIndex]
                                    };
                                    slide.body.splice(index, 1);
                                    presentationDetailStore.method.changeSlides(slide);
                                 }}
                              />
                           </div>
                        );
                     }
                  )}
               </div>
               <div className={cx("option-add-wrapper")}>
                  <Button
                     title="Add option"
                     basicBlue
                     big
                     rounded
                     leftIcon={<FontAwesomeIcon icon={faAdd} />}
                     onClick={() => {
                        const slide = {
                           ...presentationDetailStore.state?.slides[currentIndex]
                        };
                        slide.body.push({
                           id: "10",
                           name: "New Option"
                        });
                        presentationDetailStore.method.changeSlides(slide);
                     }}
                  />
               </div>
            </div>
         </div>
      </div>
   );
}

export default SlideConfig;
