import classNames from "classnames/bind";

import Header from "./components/Header";

import styles from "./PresentationDetailPage.module.scss";
const cx = classNames.bind(styles);

function PresentationDetailPage() {
   return (
      <div className={cx("wrapper")}>
         <Header />

         <div className={cx("container")}>content</div>
      </div>
   );
}

export default PresentationDetailPage;
