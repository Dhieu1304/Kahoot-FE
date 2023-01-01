import classNames from "classnames/bind";
import styles from "../Table.module.scss";
const cx = classNames.bind(styles);

function TableTd({ children }) {
   return <td className={cx("td")}>{children}</td>;
}

export default TableTd;
