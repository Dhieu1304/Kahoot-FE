import classNames from "classnames/bind";
import styles from "./HomePage.module.scss";
const cx = classNames.bind(styles);

function HomePage() {
   return (
      <div className={cx("wrapper")}>
         <div className={cx("container")}>
            <div className={cx("left")}>
               <h1 className={cx("title")}>Engage your audience & eliminate awkward silences</h1>
               <p className={cx("description")}>
                  Our easy-to-build presentations, interactive Polls, Quizzes, and Word Clouds mean
                  more participation and less stress
               </p>
            </div>
         </div>
      </div>
   );
}

export default HomePage;
