import classNames from "classnames/bind";
import styles from "../Table.module.scss";
const cx = classNames.bind(styles);

function TableTHead({ children }) {
   return <thead className={cx("thead")}>{children}</thead>;
}

export default TableTHead;
