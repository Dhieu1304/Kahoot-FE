import classNames from "classnames/bind";
import styles from "../Table.module.scss";
const cx = classNames.bind(styles);

export const TableTd = ({ textAlign, children }) => {
   return (
      <td className={cx("td")} style={{ textAlign: textAlign || "left" }}>
         {children}
      </td>
   );
};
