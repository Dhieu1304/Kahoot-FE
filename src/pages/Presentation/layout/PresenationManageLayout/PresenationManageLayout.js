import useSideBar from "../../../../components/SideBar/hooks";
import { LOCAL_STORAGE } from "../../../../utils/localStorage";

import classNames from "classnames/bind";
import styles from "./PresenationManageLayout.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUsers } from "@fortawesome/free-solid-svg-icons";
import SideBar from "../../../../components/SideBar/SideBar";
import { createContext } from "react";
import { useMediaQuery } from "react-responsive";

const PresenationManageLayoutContext = createContext();
const cx = classNames.bind(styles);

const menuTop = {
   label: "Manage",
   items: [
      {
         name: "Owned by me",
         leftIcon: <FontAwesomeIcon className={cx("icon")} icon={faUsers} />,
         to: "/presentation/owned"
      },

      {
         name: "Joined by me",
         leftIcon: <FontAwesomeIcon className={cx("icon")} icon={faUser} />,
         to: "/presentation/joined"
      }
   ]
};

function PresenationManageLayout({ children }) {
   const isMobile = useMediaQuery({ maxWidth: 767 });

   const { recentSideBarMenuBottomItems, updateRecentSideBarMenuBottomItems } = useSideBar(
      LOCAL_STORAGE.RECENT_PRESENTATIONS
   );
   const handleUpdateRecentSideBarMenuBottomItems = (presentation) => {
      // let menuIndex = -1;

      console.log("click presentation: ", presentation);

      if (
         recentSideBarMenuBottomItems.some((resentItem, index) => {
            // if (resentItem.id === presentation.id) menuIndex = index;
            return resentItem.id === presentation.id;
         })
      ) {
         // donothing
         // setCurrentSideBarMenuItem({
         //    type: "group",
         //    index: menuIndex
         // });
      } else {
         const newRecentSideBarMenuBottomItems = [presentation, ...recentSideBarMenuBottomItems];
         if (newRecentSideBarMenuBottomItems.length > 5) {
            newRecentSideBarMenuBottomItems.pop();
         }
         updateRecentSideBarMenuBottomItems(newRecentSideBarMenuBottomItems);
      }
   };

   return (
      <div
         className={cx("wrapper", {
            isMobile
         })}
      >
         <SideBar
            menuTop={menuTop}
            menuBottomLabel={"Recent Presentations"}
            recentSideBarMenuBottomItems={recentSideBarMenuBottomItems}
            preLink="/presentation"
         />
         <PresenationManageLayoutContext.Provider
            value={{
               recentSideBarMenuBottomItems,
               handleUpdateRecentSideBarMenuBottomItems
            }}
         >
            {children}
         </PresenationManageLayoutContext.Provider>
         ;
      </div>
   );
}
export default PresenationManageLayout;

export { PresenationManageLayoutContext };
