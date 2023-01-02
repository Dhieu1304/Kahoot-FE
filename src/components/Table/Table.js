import classNames from "classnames/bind";
import styles from "./Table.module.scss";
const cx = classNames.bind(styles);

function Table({ children }) {
   return <table className={cx("table")}>{children}</table>;
}

export default Table;
