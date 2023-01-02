import classNames from "classnames/bind";
import styles from "../Table.module.scss";
const cx = classNames.bind(styles);

export const TableTd = ({ children }) => {
   return <td className={cx("td")}>{children}</td>;
};
