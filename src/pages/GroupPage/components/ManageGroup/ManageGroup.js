import classNames from "classnames/bind";

import TopBar from "./TopBar";
import Avatar from "../../../../components/Avatar";

import styles from "./ManageGroup.module.scss";
import { useContext, useEffect, useMemo, useState } from "react";
import { useMediaQuery } from "react-responsive";

const cx = classNames.bind(styles);

import UserTable from "./UserTable";
import { useOutletContext, useParams } from "react-router-dom";

import { getUsersByGroupId } from "../../../../services/userService";
import { checkOwnedUser } from "../../../../services/groupService";
import { AuthContext } from "../../../../providers/auth";
import { useGroupItemContext } from "../../../../providers/groupItem/hooks";

const COLUMNS = [
   {
      Header: "Name",
      Cell: ({ cell, row }) => {
         //
         //
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
         //
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

   const groupItemContext = useGroupItemContext();
   const [isOwnedUser, setIsOwnedUser] = useState(false);
   const { showSideBar, setShowSideBar } = useOutletContext();

   const params = useParams();
   const { id } = params;

   const mobile = useMediaQuery({ query: "(max-width: 1224px)" });

   useEffect(() => {
      const loadUsers = async () => {
         const usersData = await getUsersByGroupId(id);
         groupItemContext.method.setUsers(usersData);
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

   const columns = useMemo(() => COLUMNS, []);

   // console.log("ManageGroup re-render");

   return (
      <div className={cx("container")}>
         <TopBar groupId={id} showSideBar={showSideBar} setShowSideBar={setShowSideBar} />
         <div className={cx("content")} style={{ overflowX: mobile ? "scroll" : "auto" }}>
            <UserTable
               groupId={id}
               data={groupItemContext?.state.users}
               columns={columns}
               selection
               isOwnedUser={isOwnedUser}
            ></UserTable>
         </div>
      </div>
   );
}

export default ManageGroup;
