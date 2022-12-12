import { usePresentationDetailStore } from "../../store";

import classNames from "classnames/bind";
import styles from "./SlideItem.module.scss";
import { Link, useMatch, useResolvedPath } from "react-router-dom";

const cx = classNames.bind(styles);

const SlideItem = ({ slide, index, presentationId }) => {
   const presentationDetailStore = usePresentationDetailStore();

   const to = `/presentation/${presentationId}/${slide.id}/edit`;

   const resolved = useResolvedPath(to);
   const active = useMatch({ path: resolved.pathname, end: false });

   return (
      <Link
         to={to}
         className={cx("wrapper", { active })}
         onClick={() => presentationDetailStore.method.setCurrentSlide(index)}
      >
         <span className={cx("index")}>{index}</span>
         <div className={cx("container")}>
            <h1 className={cx("title")}>{slide?.title}</h1>;
         </div>
      </Link>
   );
};

export default SlideItem;
