import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useParams } from "react-router-dom";
import userService from "../../../../services/userService";
import groupService from "../../../../services/groupService";
import Table, {
   TableTHead,
   TableTBody,
   TableTd,
   TableTh,
   TableTr
} from "../../../../components/Table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

import styles from "../GroupDetailPage.module.scss";
const cx = classNames.bind(styles);
import classNames from "classnames/bind";
import Button from "../../../../components/Button";
import { useAuthStore } from "../../../../providers/auth";
import { useModal } from "../../../../components/Modal";
import InviteToGroupModal from "../components/InviteToGroupModal";

import EditUserModal from "../components/EditUserModal/EditUserModal";
import { toast } from "react-toastify";
import DeleteModal from "../components/DeleteModal";

function GroupDetailUserPage() {
   const [users, setUsers] = useState([]);
   const [isOwnedUser, setIsOwnedUser] = useState(false);
   const inviteToGroupModal = useModal();
   const editUserpModal = useModal();
   const deleteUserpModal = useModal();

   const params = useParams();
   const { groupId } = params;
   const isNotMobile = useMediaQuery({ minWidth: 768 });
   const authStore = useAuthStore();

   const loadData = async () => {
      const usersData = await userService.getUsersByGroupId(groupId);
      setUsers(usersData);

      const result = await groupService.checkOwnedUser(groupId, authStore.user.id);
      console.log("result: ", result);
      setIsOwnedUser(result);
   };

   useEffect(() => {
      if (groupId && authStore.user.id) {
         loadData();
      }
   }, [groupId, authStore.user.id]);

   const handleSubmitEditUserModalForm = async (userId, roleId) => {
      const result = await groupService.changeRole(groupId, userId, roleId);

      if (result) {
         toast("Change success");
         await loadData();
      } else {
         toast("Change Fail");
      }
   };

   const handleSubmitDeleteUserModalForm = async (userId) => {
      console.log("userId: ", userId);
      const result = await groupService.deleteUserFromGroup(groupId, userId);

      if (result) {
         toast("Delete success");
         await loadData();
      } else {
         toast("Delete Fail");
      }
   };

   return (
      <>
         <div className={cx("header")}>
            <div className={cx("nav")}>
               <h1 className={cx("title")}>sang</h1>
               <div className={cx("btn-group")}>
                  <Button
                     title={"Invite"}
                     basic
                     basicBlue
                     rounded
                     big
                     className={cx("btn")}
                     leftIcon={<FontAwesomeIcon icon={faAdd} size="1x" />}
                     onClick={() => {
                        inviteToGroupModal.setShow(true);
                     }}
                  />
               </div>
            </div>
         </div>
         <div className={cx("content")}>
            {isNotMobile ? (
               <Table>
                  <TableTHead>
                     <TableTr>
                        <TableTh>Id</TableTh>
                        <TableTh>Email</TableTh>
                        <TableTh>Name</TableTh>
                        <TableTh>Role</TableTh>

                        <TableTh>Action</TableTh>
                     </TableTr>
                  </TableTHead>
                  <TableTBody>
                     {users?.map((user, index) => {
                        return (
                           <TableTr key={index}>
                              <TableTd>{user?.id}</TableTd>
                              <TableTd>
                                 <div className={cx("presentation-infor-cell")}>{user?.email}</div>
                              </TableTd>
                              <TableTd>
                                 <div className={cx("presentation-infor-cell")}>
                                    {user?.fullName}
                                 </div>
                              </TableTd>
                              <TableTd>
                                 <div className={cx("presentation-infor-cell")}>
                                    {user?.groupUsers[0].groupUserRole.name}
                                 </div>
                              </TableTd>
                              <TableTd>
                                 {isOwnedUser && (
                                    <div className={cx("action")}>
                                       <FontAwesomeIcon
                                          icon={faEdit}
                                          className={cx("icon")}
                                          size="1x"
                                          color="green"
                                          onClick={() => {
                                             // deleteGroupModal.setData(user?.groupId);
                                             // deleteGroupModal.setShow(true);
                                             editUserpModal.setShow(true);
                                             editUserpModal.setData({
                                                userId: user?.id,
                                                name: user?.fullName,
                                                roleId: user?.roleId
                                             });
                                          }}
                                       />
                                       <FontAwesomeIcon
                                          icon={faTrash}
                                          className={cx("icon")}
                                          size="1x"
                                          color="red"
                                          onClick={() => {
                                             deleteUserpModal.setShow(true);
                                             deleteUserpModal.setData({
                                                userId: user?.id,
                                                name: user?.fullName
                                             });
                                          }}
                                       />
                                    </div>
                                 )}
                              </TableTd>
                           </TableTr>
                        );
                     })}
                  </TableTBody>
               </Table>
            ) : (
               <ListGroup className={cx("list")}>
                  {users?.map((user, index) => {
                     return (
                        <ListGroup.Item className={cx("item")} key={index}>
                           <div className={cx("top")}>
                              <div className={cx("infor")}>{user?.group?.name}</div>

                              <div className={cx("action")}>
                                 <FontAwesomeIcon
                                    icon={faTrash}
                                    className={cx("icon")}
                                    size="1x"
                                    color="red"
                                    onClick={() => {
                                       // deleteMemberModal.setData(user?.groupId);
                                       // deleteMemberModal.setShow(true);
                                    }}
                                 />
                              </div>
                           </div>
                           <div className={cx("bottom")}>
                              <span className={cx("role")}></span>
                           </div>
                        </ListGroup.Item>
                     );
                  })}
               </ListGroup>
            )}
         </div>

         <>
            {inviteToGroupModal.show && (
               <InviteToGroupModal
                  show={inviteToGroupModal.show}
                  setShow={inviteToGroupModal.setShow}
                  groupId={groupId}
               ></InviteToGroupModal>
            )}

            {editUserpModal.show && (
               <EditUserModal
                  show={editUserpModal.show}
                  setShow={editUserpModal.setShow}
                  data={editUserpModal.data}
                  setData={editUserpModal.setData}
                  groupId={groupId}
                  handleSubmitModalForm={handleSubmitEditUserModalForm}
               ></EditUserModal>
            )}

            {deleteUserpModal && (
               <DeleteModal
                  show={deleteUserpModal.show}
                  setShow={deleteUserpModal.setShow}
                  data={deleteUserpModal.data}
                  setData={deleteUserpModal.setData}
                  handleSubmitModalForm={handleSubmitDeleteUserModalForm}
               ></DeleteModal>
            )}
         </>
      </>
   );
}

export default GroupDetailUserPage;
