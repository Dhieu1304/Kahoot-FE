import { usePresentationDetailStore } from "../../../store";

import classNames from "classnames/bind";
import styles from "./SlideItem.module.scss";
import { Link, useMatch, useNavigate, useResolvedPath } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGripVertical, faXmark } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

const SlideItem = ({ slide, index, presentationId }) => {
   const navigate = useNavigate();
   const presentationDetailStore = usePresentationDetailStore();
   const { deleteSlideModal } = presentationDetailStore;

   // console.log("slide in slideItem: ", slide);

   const to = `/presentation/${presentationId}/edit/${slide?.ordinalSlideNumber}`;

   // console.log("to: ", to);
   // const to = `/presentation/${presentationId}/${index + 1}/edit`;

   const resolved = useResolvedPath(to);
   const active = useMatch({ path: resolved.pathname, end: false });

   const isNotDesktop = useMediaQuery({ maxWidth: 992 });

   return (
      <div
         className={cx("wrapper", {
            active,
            isNotDesktop,
            isSelectToRemove: deleteSlideModal.show && deleteSlideModal.data === index
         })}
      >
         <div className={cx("left")}>
            <span className={cx("index")}>{index + 1}</span>
            <div className={cx("icon-wrapper")}>
               <FontAwesomeIcon
                  size="1x"
                  icon={faGripVertical}
                  className={cx("icon")}
                  onClick={() => {
                     // deleteSlideModal.setShow(true);
                     // deleteSlideModal.setData(index)
                  }}
               />
            </div>
         </div>
         <Link
            to={to}
            className={cx("container")}
            style={{
               backgroundColor:
                  presentationDetailStore.state.presentation?.presentationTheme.backgroundColor,
               color: presentationDetailStore.state.presentation?.presentationTheme.textColor
            }}
         >
            <h1 className={cx("title")}>{slide?.title}</h1>
         </Link>
         <FontAwesomeIcon
            size="1x"
            icon={faXmark}
            className={cx("delete-icon")}
            onClick={() => {
               deleteSlideModal.setShow(true);
               deleteSlideModal.setData(index);
            }}
         />
      </div>
   );
};

export default SlideItem;
