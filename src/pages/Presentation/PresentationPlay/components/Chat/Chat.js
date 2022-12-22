import classNames from "classnames/bind";
import Avatar from "../../../../../components/Avatar/Avatar";
import styles from "./Chat.module.scss";
const cx = classNames.bind(styles);

function Chat({ show, setShow }) {
   return (
      <div className={cx("container")}>
         <div className={cx("list")}>
            <div className={cx("item", { left: true })}>
               <Avatar
                  title={"Avatar"}
                  placeholder={"Avatar"}
                  size={25}
                  rounded
                  //   src={authContext?.user?.avatar}
               />
               <div className={cx("message")}>
                  <span className={cx("text")}>Hello World</span>
               </div>
            </div>
            <div className={cx("item", { right: true })}>
               <Avatar
                  title={"Avatar"}
                  placeholder={"Avatar"}
                  size={25}
                  rounded
                  //   src={authContext?.user?.avatar}
               />
               <div className={cx("message")}>
                  <span className={cx("text")}>Hello World</span>
               </div>
            </div>
            <div className={cx("item", { right: true })}>
               <Avatar
                  title={"Avatar"}
                  placeholder={"Avatar"}
                  size={25}
                  rounded
                  //   src={authContext?.user?.avatar}
               />
               <div className={cx("message")}>
                  <span className={cx("text")}>Hello World</span>
               </div>
            </div>
            <div className={cx("item", { right: true })}>
               <Avatar
                  title={"Avatar"}
                  placeholder={"Avatar"}
                  size={25}
                  rounded
                  //   src={authContext?.user?.avatar}
               />
               <div className={cx("message")}>
                  <span className={cx("text")}>Hello World</span>
               </div>
            </div>
            <div className={cx("item", { right: true })}>
               <Avatar
                  title={"Avatar"}
                  placeholder={"Avatar"}
                  size={25}
                  rounded
                  //   src={authContext?.user?.avatar}
               />
               <div className={cx("message")}>
                  <span className={cx("text")}>Hello World</span>
               </div>
            </div>
            <div className={cx("item", { left: true })}>
               <Avatar
                  title={"Avatar"}
                  placeholder={"Avatar"}
                  size={25}
                  rounded
                  //   src={authContext?.user?.avatar}
               />
               <div className={cx("message")}>
                  <span className={cx("text")}>Hello World</span>
               </div>
            </div>
            <div className={cx("item", { left: true })}>
               <Avatar
                  title={"Avatar"}
                  placeholder={"Avatar"}
                  size={25}
                  rounded
                  //   src={authContext?.user?.avatar}
               />
               <div className={cx("message")}>
                  <span className={cx("text")}>Hello World</span>
               </div>
            </div>
            <div className={cx("item", { left: true })}>
               <Avatar
                  title={"Avatar"}
                  placeholder={"Avatar"}
                  size={25}
                  rounded
                  //   src={authContext?.user?.avatar}
               />
               <div className={cx("message")}>
                  <span className={cx("text")}>Hello World</span>
               </div>
            </div>
         </div>
      </div>
   );
}

export default Chat;
