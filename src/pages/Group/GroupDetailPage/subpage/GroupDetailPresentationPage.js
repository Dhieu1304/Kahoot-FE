import { useEffect, useMemo, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Link, useParams } from "react-router-dom";
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
import { faAdd, faEdit, faPlay, faTrash } from "@fortawesome/free-solid-svg-icons";

import styles from "../GroupDetailPage.module.scss";
const cx = classNames.bind(styles);
import classNames from "classnames/bind";

import { useAuthStore } from "../../../../providers/auth";

import presentationServices from "../../../../services/presentationServices";
import { useGroupLayoutStore } from "../../../../layouts/GroupLayout/hooks";

function GroupDetailPresentationPage() {
   const [presentations, setPresentations] = useState([]);
   const [isOwnedUser, setIsOwnedUser] = useState(false);
   const [isPresenting, setIsPresenting] = useState(true);
   const [currentPrentation, setCurrentPrentation] = useState({
      name: "Presentation XXX",
      user: {
         fullName: "Sang"
      }
   });

   const params = useParams();
   const { groupId } = params;
   const isNotMobile = useMediaQuery({ minWidth: 768 });
   const authStore = useAuthStore();

   const recentSideBarMenuBottomItems = useGroupLayoutStore();
   console.log("recentSideBarMenuBottomItems: ", recentSideBarMenuBottomItems);

   const groupName = useMemo(() => {
      recentSideBarMenuBottomItems;
   }, [groupId]);

   const loadData = async () => {
      const presentationsData = await presentationServices.getPresentationsByGroupId(groupId);
      setPresentations(presentationsData);

      const result = await groupService.checkOwnedUser(groupId, authStore.user.id);

      setIsOwnedUser(result);
   };

   useEffect(() => {
      if (groupId && authStore.user.id) {
         loadData();
      }
   }, [groupId, authStore.user.id]);

   return (
      <>
         <div className={cx("header")}>
            <div className={cx("nav")}>
               <h1 className={cx("title")}>sang</h1>
               <div className={cx("btn-group")}>
                  {isPresenting && (
                     <div className={cx("current-presentation")}>{currentPrentation?.name}</div>
                  )}
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
                                 <Link
                                    to={`presentation-client/${presentation?.presentation?.code}`}
                                    className={cx("presentation-infor-cell")}
                                 >
                                    <FontAwesomeIcon size="1x" icon={faPlay} />
                                 </Link>
                              </TableTd>
                              {/* <TableTd>
                                 {isOwnedUser && (
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
                                    </div>
                                 )}
                              </TableTd> */}
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

                              <div className={cx("create")}>
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
      </>
   );
}

export default GroupDetailPresentationPage;
