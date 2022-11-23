import classNames from "classnames/bind";

import TopBar from "./TopBar";
import Avatar from "../../../../components/Avatar";

import styles from "./ManageGroup.module.scss";
import { useMemo } from "react";
const cx = classNames.bind(styles);

import UserTable from "./UserTable";

const COLUMNS = [
   {
      Header: "Name",
      Cell: ({ row }) => {
         return (
            <div className={cx("user-infor")}>
               <Avatar src={row.original.avatar} title="avatar" size={30} rounded />
               <span className={cx("user-infor-name")}>{row.original.name}</span>
            </div>
         );
      }
   },
   {
      Header: "Role",
      accessor: "role"
   },
   {
      Header: "Status",
      accessor: "status"
   },
   {
      Header: "Action",
      accessor: "action"
   }
];

const data = [
   {
      avatar:
         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1lU_Z3d6va3xVuzGdngT4mBWdhuEFrgNk6hngAsnw&s",
      name: "sang1",
      role: "owned",
      status: "active"
   },
   {
      name: "sang1",

      avatar:
         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1lU_Z3d6va3xVuzGdngT4mBWdhuEFrgNk6hngAsnw&s",
      role: "owned",
      status: "active"
   },
   {
      name: "sang1",
      avatar:
         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1lU_Z3d6va3xVuzGdngT4mBWdhuEFrgNk6hngAsnw&s",
      role: "owned",
      status: "active"
   }
];

function ManageGroup() {
   const columns = useMemo(() => COLUMNS, []);

   console.log("columns: ", columns);

   return (
      <div className={cx("container")}>
         <TopBar />
         <div className={cx("content")}>
            <UserTable data={data} columns={columns} selection></UserTable>
         </div>
      </div>
   );
}

export default ManageGroup;
