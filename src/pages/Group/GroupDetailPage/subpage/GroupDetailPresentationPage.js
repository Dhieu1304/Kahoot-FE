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
import presentationServices from "../../../../services/presentationServices";

function GroupDetailPresentationPage() {
   const [presentations, setPresentations] = useState([]);
   const [isOwnedUser, setIsOwnedUser] = useState(false);
   const inviteToGroupModal = useModal();
   const editUserpModal = useModal();
   const deleteUserpModal = useModal();

   const params = useParams();
   const { groupId } = params;
   const isNotMobile = useMediaQuery({ minWidth: 768 });
   const authStore = useAuthStore();

   const loadData = async () => {
      const presentationsData = await presentationServices.getPresentationsByGroupId(groupId);
      setPresentations(presentationsData);

      console.log("presentationsData: ", presentationsData);

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
                        <TableTh>Name</TableTh>
                        <TableTh>Code</TableTh>
                        <TableTh>Link</TableTh>
                        <TableTh>Action</TableTh>
                     </TableTr>
                  </TableTHead>
                  <TableTBody>
                     {presentations?.map((presentation, index) => {
                        return (
                           <TableTr key={index}>
                              <TableTd>{presentation?.presentation?.id}</TableTd>
                              <TableTd>
                                 <div className={cx("presentation-infor-cell")}>
                                    {presentation?.presentation?.name}
                                 </div>
                              </TableTd>
                              <TableTd>
                                 <div className={cx("presentation-infor-cell")}>
                                    {presentation?.presentation?.code}
                                 </div>
                              </TableTd>
                              <TableTd>
                                 <div className={cx("presentation-infor-cell")}>LINK</div>
                              </TableTd>
                              <TableTd>
                                 {/* {isOwnedUser && (
                                    <div className={cx("action")}>
                                       <FontAwesomeIcon
                                          icon={faEdit}
                                          className={cx("icon")}
                                          size="1x"
                                          color="green"
                                          onClick={() => {
                                             // editUserpModal.setShow(true);
                                             // editUserpModal.setData({
                                             //    userId: presentation?.id,
                                             //    name: presentation?.fullName,
                                             //    roleId: presentation?.roleId
                                             // });
                                          }}
                                       />
                                       <FontAwesomeIcon
                                          icon={faTrash}
                                          className={cx("icon")}
                                          size="1x"
                                          color="red"
                                          onClick={() => {
                                             // deleteUserpModal.setShow(true);
                                             // deleteUserpModal.setData({
                                             //    userId: presentation?.id,
                                             //    name: presentation?.fullName
                                             // });
                                          }}
                                       />
                                    </div> */}
                                 )}
                              </TableTd>
                           </TableTr>
                        );
                     })}
                  </TableTBody>
               </Table>
            ) : (
               <ListGroup className={cx("list")}>
                  {presentations?.map((user, index) => {
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

export default GroupDetailPresentationPage;
