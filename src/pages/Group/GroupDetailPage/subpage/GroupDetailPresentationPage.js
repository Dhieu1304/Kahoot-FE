import { useContext, useEffect, useMemo, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Link, useParams } from "react-router-dom";
import groupService, { getPresentingGroup } from "../../../../services/groupService";
import Table, {
   TableTHead,
   TableTBody,
   TableTd,
   TableTh,
   TableTr
} from "../../../../components/Table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faTrash } from "@fortawesome/free-solid-svg-icons";
import styles from "../GroupDetailPage.module.scss";
const cx = classNames.bind(styles);
import classNames from "classnames/bind";
import { useAuthStore } from "../../../../providers/auth";
import presentationServices from "../../../../services/presentationServices";
import { useGroupLayoutStore } from "../../../../layouts/GroupLayout";
import { PRESENTATION_EVENT } from "../../../../providers/socket/socket.constant";
import { SocketContext } from "../../../../providers/socket";

function GroupDetailPresentationPage() {
   const [presentations, setPresentations] = useState([]);
   const [isOwnedUser, setIsOwnedUser] = useState(false);
   const [isPresenting, setIsPresenting] = useState(false);
   const [currentPresentation, setCurrentPresentation] = useState([
      {
         name: "Presentation Name",
         user: {
            fullName: "Sang"
         }
      }
   ]);

   const socket = useContext(SocketContext);
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

      const presentGroup = await groupService.getPresentingGroup(groupId);
      console.log("presentGroup: ", presentGroup);
      if (presentGroup && presentGroup.length > 0) {
         const currentPresent = [];
         for (let i = 0; i < presentGroup.length; i++) {
            currentPresent.push({
               presentation_id: presentGroup[i]?.presentation?.id,
               name: presentGroup[i]?.presentation?.name,
               code: presentGroup[i]?.presentation?.code,
               user: {
                  user_id: presentGroup[i]?.user?.id,
                  email: presentGroup[i]?.user?.email,
                  fullName: presentGroup[i]?.user?.full_name
               }
            });
         }
         setCurrentPresentation(currentPresent);
         setIsPresenting(true);
      }
   };

   useEffect(() => {
      if (groupId && authStore.user.id) {
         loadData();
      }
   }, [groupId, authStore.user.id]);
   useEffect(() => {
      socket.emit(PRESENTATION_EVENT.JOIN_PRESENT_GROUP, { groupId });
      socket.on(PRESENTATION_EVENT.PRESENT_GROUP, (presentGroup) => {
         if (presentGroup && presentGroup.length > 0) {
            const currentPresent = [];
            for (let i = 0; i < presentGroup.length; i++) {
               currentPresent.push({
                  presentation_id: presentGroup[i]?.presentation?.id,
                  name: presentGroup[i]?.presentation?.name,
                  code: presentGroup[i]?.presentation?.code,
                  user: {
                     user_id: presentGroup[i]?.user?.id,
                     email: presentGroup[i]?.user?.email,
                     fullName: presentGroup[i]?.user?.full_name
                  }
               });
            }
            setCurrentPresentation(currentPresent);
            setIsPresenting(true);
         }
      });

      return () => {
         socket.off(PRESENTATION_EVENT.PRESENT_GROUP);
      };
   }, []);

   return (
      <>
         <div className={cx("header")}>
            <div className={cx("nav")}>
               <h1 className={cx("title")}>sang</h1>
               <div className={cx("btn-group")}>
                  {isPresenting && (
                     <div className={cx("current-presentation")}>{currentPresentation?.name}</div>
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
                                    to={`/presentation-client/${presentation?.presentation?.code}`}
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
