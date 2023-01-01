import classNames from "classnames/bind";
import styles from "../Table.module.scss";
const cx = classNames.bind(styles);

function TableTh({ children }) {
   return <th className={cx("th")}>{children}</th>;
}

export default TableTh;
