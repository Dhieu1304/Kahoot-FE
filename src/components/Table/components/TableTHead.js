import classNames from "classnames/bind";
import styles from "../Table.module.scss";
const cx = classNames.bind(styles);

export const TableTHead = ({ children }) => {
   return <thead className={cx("thead")}>{children}</thead>;
};
