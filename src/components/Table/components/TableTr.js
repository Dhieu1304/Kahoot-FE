import classNames from "classnames/bind";
import styles from "../Table.module.scss";
const cx = classNames.bind(styles);

export const TableTr = ({ children }) => {
   return <tr className={cx("tr")}>{children}</tr>;
};
