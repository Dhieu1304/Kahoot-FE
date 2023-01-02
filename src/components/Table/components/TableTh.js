import classNames from "classnames/bind";
import styles from "../Table.module.scss";
const cx = classNames.bind(styles);

export const TableTh = ({ children }) => {
   return <th className={cx("th")}>{children}</th>;
};
