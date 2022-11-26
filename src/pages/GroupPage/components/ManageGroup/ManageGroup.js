import classNames from "classnames/bind";

import TopBar from "./TopBar";
import Avatar from "../../../../components/Avatar";

import styles from "./ManageGroup.module.scss";
import { useContext, useEffect, useMemo, useState } from "react";
const cx = classNames.bind(styles);

import UserTable from "./UserTable";
import { useParams } from "react-router-dom";

import { getUsersByGroupId } from "../../../../services/userService";
import { checkOwnedUser } from "../../../../services/groupService";
import { AuthContext } from "../../../../providers/auth";

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
   }
   // isOwnedUser
   // {
   //    Header: "Action",
   //    Cell: ({ row }) => {
   //       return <span>{row.original.status.name}</span>;
   //    }
   // }
];

function ManageGroup() {
   const authContext = useContext(AuthContext);
   const [users, setUsers] = useState([]);
   const [isOwnedUser, setIsOwnedUser] = useState(false);

   const params = useParams();
   const { id } = params;

   useEffect(() => {
      const loadUsers = async () => {
         const usersData = await getUsersByGroupId(id);
         setUsers(usersData);
      };

      loadUsers();
   }, [id]);

   useEffect(() => {
      const checkIsOwnedUser = async () => {
         if (authContext.user.id) {
            const result = await checkOwnedUser(id, authContext.user.id);
            setIsOwnedUser(result);
         }
      };

      checkIsOwnedUser();
   }, [authContext.user.id]);

   console.log("users: ", users);
   console.log("isOwnedser: ", isOwnedUser);

   const columns = useMemo(() => COLUMNS, []);

   console.log("columns: ", columns);

   return (
      <div className={cx("container")}>
         <TopBar groupId={id} />
         <div className={cx("content")}>
            <UserTable data={users} columns={columns} selection isOwnedUser></UserTable>
         </div>
      </div>
   );
}

export default ManageGroup;
