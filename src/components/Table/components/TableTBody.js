import classNames from "classnames/bind";
import styles from "../Table.module.scss";
const cx = classNames.bind(styles);

export const TableTBody = ({ children }) => {
   return <tbody className={cx("tbody")}>{children}</tbody>;
};
