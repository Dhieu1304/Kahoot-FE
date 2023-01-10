import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate, useParams } from "react-router-dom";
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
import { ListGroup } from "react-bootstrap";
import { useGroupDetailPageStore } from "../hooks";
import RenameGroupModal from "../../conponents/RenameGroupModal";

function GroupDetailUserPage() {
   const [users, setUsers] = useState([]);
   const [isOwnedUser, setIsOwnedUser] = useState(false);
   const groupDetailPageStore = useGroupDetailPageStore();

   const inviteToGroupModal = useModal();
   const editUserpModal = useModal();
   const deleteUserpModal = useModal();
   const deleteGroupModal = useModal();
   const renameGroupModal = useModal();

   const params = useParams();
   const navigate = useNavigate();
   const { groupId } = params;
   const isNotMobile = useMediaQuery({ minWidth: 768 });
   const isDesktop = useMediaQuery({ minWidth: 992 });
   const authStore = useAuthStore();

   const loadData = async () => {
      const usersData = await userService.getUsersByGroupId(groupId);
      setUsers(usersData);

      console.log("groupId, authStore.user.id: ", groupId, authStore.user.id);
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
         toast.success("Delete success");
         await loadData();
      } else {
         toast.error("Delete Fail");
      }
   };

   const handleSubmitDeleteGroupModalForm = async () => {
      const result = await groupService.deleteGroup(groupId);

      if (result) {
         toast.success("Delete success");
         navigate("/group/owned");
      } else {
         toast.error("Delete Fail");
      }
   };

   const handleRenameGroupModal = async (name) => {
      const group = await groupService.renameGroup(groupId, name);
      if (group) {
         groupDetailPageStore.setGroup(group);
      }
   };

   return (
      <>
         <div className={cx("header")}>
            <div className={cx("nav")}>
               <h1 className={cx("title")}>{groupDetailPageStore.group?.name}</h1>
               <div className={cx("btn-group")}>
                  {isOwnedUser && (
                     <Button
                        title={"Delete"}
                        basic
                        basicRed
                        rounded
                        big
                        className={cx("btn")}
                        leftIcon={<FontAwesomeIcon icon={faTrash} size="1x" />}
                        onClick={() => {
                           deleteGroupModal.setShow(true);
                        }}
                     />
                  )}
                  <Button
                     title={"Rename"}
                     basic
                     basicBlue
                     rounded
                     big
                     className={cx("btn")}
                     leftIcon={<FontAwesomeIcon icon={faEdit} size="1x" />}
                     onClick={() => {
                        renameGroupModal.setShow(true);
                     }}
                  />
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

                        {isDesktop && (
                           <>
                              <TableTh>Name</TableTh>
                              <TableTh>Role</TableTh>
                           </>
                        )}

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

                              {isDesktop && (
                                 <>
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
                                 </>
                              )}

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
                              <div className={cx("infor")}>{user?.email}</div>

                              <div className={cx("action")}>
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
                              </div>
                           </div>
                           <div className={cx("bottom")}>
                              <span className={cx("description")}>
                                 {user?.groupUsers[0].groupUserRole.name}{" "}
                              </span>
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

            {deleteGroupModal && (
               <DeleteModal
                  show={deleteGroupModal.show}
                  setShow={deleteGroupModal.setShow}
                  data={deleteGroupModal.data}
                  setData={deleteGroupModal.setData}
                  handleSubmitModalForm={handleSubmitDeleteGroupModalForm}
               ></DeleteModal>
            )}

            {renameGroupModal && (
               <RenameGroupModal
                  show={renameGroupModal.show}
                  setShow={renameGroupModal.setShow}
                  data={renameGroupModal.data}
                  setData={renameGroupModal.setData}
                  handleSubmitModalForm={handleRenameGroupModal}
               ></RenameGroupModal>
            )}
         </>
      </>
   );
}

export default GroupDetailUserPage;
