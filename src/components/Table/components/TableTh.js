import classNames from "classnames/bind";
import styles from "../Table.module.scss";
const cx = classNames.bind(styles);

export const TableTh = ({ textAlign, children }) => {
   return (
      <th className={cx("th")} style={{ textAlign: textAlign || "left" }}>
         {children}
      </th>
   );
};
