import classNames from "classnames/bind";
import { Link } from "react-router-dom";

import styles from "./PresentationPage.module.scss";
const cx = classNames.bind(styles);

function PresentationPage() {
   return (
      <div className={cx("wrapper")}>
         Hello
         <div className={cx("container")}>
            <ul>
               <li>
                  <Link to={"1/1/edit"} title="1">
                     1
                  </Link>
               </li>

               <li>
                  <Link to={"1/2/edit"} title="2">
                     2
                  </Link>
               </li>
               <li>
                  <Link to={"1/3/edit"} title="3">
                     3
                  </Link>
               </li>
               <li>
                  <Link to={"1/4/edit"} title="4">
                     4
                  </Link>
               </li>
               <li>
                  <Link to={"1/5/edit"} title="5">
                     5
                  </Link>
               </li>
            </ul>
         </div>
      </div>
   );
}

export default PresentationPage;
