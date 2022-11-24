import classNames from "classnames/bind";

import TopBar from "./TopBar";
import Avatar from "../../../../components/Avatar";

import styles from "./ManageGroup.module.scss";
import { useEffect, useMemo, useState } from "react";
const cx = classNames.bind(styles);

import UserTable from "./UserTable";
import { useParams } from "react-router-dom";

import { getUsersByGroupId } from "../../../../services/userService";

const COLUMNS = [
   {
      Header: "Name",
      Cell: ({ cell, row }) => {
         // console.log("row.original: ", row.original);
         // console.log("cell: ", cell);
         return (
            <div className={cx("user-infor")}>
               <Avatar src={row.original.avatar} title="avatar" size={30} rounded />
               <span className={cx("user-infor-name")}>{row.original.fullName}</span>
            </div>
         );
      }
   },

   {
      Header: "Role",
      Cell: ({ row }) => {
         // console.log(
         //    "row.original.groupUsers[0].groupUserRole.name",
         //    row.original.groupUsers[0].groupUserRole.name
         // );
         return <span>{row.original.groupUsers[0].groupUserRole.name}</span>;
      }
   },
   {
      Header: "Status",
      Cell: ({ row }) => {
         return <span>{row.original.status.name}</span>;
      }
   },
   {
      Header: "Action",
      accessor: "action"
   }
];

function ManageGroup() {
   const params = useParams();

   const [group, setGroup] = useState([]);
   const { id } = params;

   useEffect(() => {
      const loadGroups = async () => {
         const groupData = await getUsersByGroupId(id);
         setGroup(groupData);
      };

      loadGroups();
   }, [id]);

   console.log("group: ", group);

   const columns = useMemo(() => COLUMNS, []);

   console.log("columns: ", columns);

   return (
      <div className={cx("container")}>
         <TopBar />
         <div className={cx("content")}>
            <UserTable data={group} columns={columns} selection></UserTable>
         </div>
      </div>
   );
}

export default ManageGroup;
