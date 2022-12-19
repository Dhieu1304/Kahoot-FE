import { usePresentationDetailStore } from "../../../store";

import classNames from "classnames/bind";
import styles from "./SlideItem.module.scss";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGripVertical } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

const SlideItem = ({ slide, index, presentationId }) => {
   const presentationDetailStore = usePresentationDetailStore();

   const to = `/presentation/${presentationId}/${slide?.ordinalSlideNumber}/edit`;

   const resolved = useResolvedPath(to);
   const active = useMatch({ path: resolved.pathname, end: false });

   const isNotDesktop = useMediaQuery({ maxWidth: 992 });

   return (
      <Link
         to={to}
         className={cx("wrapper", { active, isNotDesktop })}
         onClick={() => presentationDetailStore.method.setCurrentSlide(index)}
      >
         <div className={cx("left")}>
            <span className={cx("index")}>{index}</span>
            <div className={cx("icon-wrapper")}>
               <FontAwesomeIcon size="1x" icon={faGripVertical} className={cx("icon")} />
            </div>
         </div>
         <div className={cx("container")}>
            <h1 className={cx("title")}>{slide?.title}</h1>;
         </div>
      </Link>
   );
};

export default SlideItem;
