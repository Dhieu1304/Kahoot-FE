import { useTable } from "react-table";

import classNames from "classnames/bind";
import styles from "./UserTable.module.scss";

const cx = classNames.bind(styles);

function UserTable({ data, columns }) {
   const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
      columns,
      data
   });

   console.log("getTableProps(): ", getTableProps());
   return (
      <table {...getTableProps()} className={cx("table")}>
         <thead className={cx("thead")}>
            {headerGroups.map((headerGroup) => {
               return (
                  <tr className={cx("tr")} {...headerGroup.getHeaderGroupProps()}>
                     {headerGroup.headers.map((column) => {
                        return (
                           <th className={cx("th")} {...column.getHeaderProps()}>
                              {column.render("Header")}
                           </th>
                        );
                     })}
                  </tr>
               );
            })}
         </thead>
         <tbody className={cx("tbody")} {...getTableBodyProps()}>
            {rows.map((row, i) => {
               prepareRow(row);
               return (
                  <tr className={cx("tr")} {...row.getRowProps()}>
                     {row.cells.map((cell) => {
                        return (
                           <td className={cx("td")} {...cell.getCellProps()}>
                              {cell.render("Cell")}
                           </td>
                        );
                     })}
                  </tr>
               );
            })}
         </tbody>
      </table>
   );
}

export default UserTable;
