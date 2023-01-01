import classNames from "classnames/bind";
import styles from "../Table.module.scss";
const cx = classNames.bind(styles);

function TableTBody({ children }) {
   return <tbody className={cx("tbody")}>{children}</tbody>;
}

export default TableTBody;
