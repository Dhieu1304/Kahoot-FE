import { useTable } from "react-table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import classNames from "classnames/bind";
import styles from "./UserTable.module.scss";
import Button from "../../../../../components/Button/Button";
import EditUserModal from "../EditUserModal";
import { useState } from "react";

const cx = classNames.bind(styles);

function UserTable({ groupId, data, columns, isOwnedUser }) {
   const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
      columns,
      data
   });

   const [showEditModalData, setShowEditModalData] = useState(false);
   const [editModalData, setEditModalData] = useState();
   const [editId, setEditId] = useState(-1);

   const handleEditClick = (data) => {
      console.log("handleEditClick: data: ", data);
      setEditId(data.id);
      setEditModalData(data);
      setShowEditModalData(true);
   };
   const handleRemoveClick = (data) => {
      console.log("handleRemoveClick: data: ", data);
   };
   console.log("isOwnedUser: ", isOwnedUser);
   return (
      <>
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
                        {isOwnedUser && <th className={cx("th")}>Action</th>}
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
                        {isOwnedUser && (
                           <td className={cx("td")}>
                              <div className={cx("action-group")}>
                                 <FontAwesomeIcon
                                    icon="fa-solid fa-pen-to-square"
                                    className={cx("action-icon", "action-edit-icon")}
                                    onClick={() => handleEditClick(row.original)}
                                 />
                                 <FontAwesomeIcon
                                    icon="fa-solid fa-trash"
                                    className={cx("action-icon", "action-remove-icon")}
                                    onClick={() => handleRemoveClick(row.original)}
                                 />
                              </div>
                           </td>
                        )}
                     </tr>
                  );
               })}
            </tbody>
         </table>
         <EditUserModal
            show={showEditModalData}
            setShow={setShowEditModalData}
            groupId={groupId}
            userId={editId}
            editModalData
            setEditModalData
         ></EditUserModal>
      </>
   );
}

export default UserTable;
