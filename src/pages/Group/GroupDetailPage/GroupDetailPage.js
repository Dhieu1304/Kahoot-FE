import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMediaQuery } from "react-responsive";
import Button from "../../../components/Button";

const cx = classNames.bind(styles);
import classNames from "classnames/bind";
import styles from "./GroupDetailPage.module.scss";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import Tab from "../../../components/Tabs/Tabs";
import { useLocation, useParams } from "react-router-dom";
import Context from "./Context";
import { useState } from "react";
import { useEffect } from "react";
import groupService from "../../../services/groupService";

const tabItems = [
   {
      label: "Users",
      to: "user"
   },
   {
      label: "Presentations",
      to: "presentation"
   }
];

function GroupDetailPage({ children }) {
   const [group, setGroup] = useState();
   const isMobile = useMediaQuery({ maxWidth: 767 });

   const params = useParams();
   const { groupId } = params;

   useEffect(() => {
      const loadData = async () => {
         const groupData = await groupService.getGroupById(groupId);
         if (groupData) {
            setGroup(groupData);
         }
      };
      loadData();
   }, []);

   return (
      <Context.Provider value={{ group, setGroup }}>
         <div className={cx("wrapper", { isMobile })}>
            <div className={cx("tab-bar")}>
               <Tab tabItems={tabItems} preLink={`/group/${groupId}`} />
            </div>

            <div className={cx("container")}>{children}</div>
         </div>
      </Context.Provider>
   );
}

export default GroupDetailPage;
