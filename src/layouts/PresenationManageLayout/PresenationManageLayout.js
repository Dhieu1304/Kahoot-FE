import { useMediaQuery } from "react-responsive";

import { LOCAL_STORAGE } from "../../utils/localStorage";
import SideBar, { useSideBar } from "../components/SideBar";
import Header from "../components/Header";
import { menuTop } from "./config";
import Context from "./Context";

import classNames from "classnames/bind";
import styles from "./PresenationManageLayout.module.scss";
const cx = classNames.bind(styles);

function PresenationManageLayout({ children }) {
   const isMobile = useMediaQuery({ maxWidth: 767 });

   const { recentSideBarMenuBottomItems, updateRecentSideBarMenuBottomItems } = useSideBar(
      LOCAL_STORAGE.RECENT_PRESENTATIONS
   );

   // handle when click to /presentation/:id/user
   const handleUpdateRecentSideBarMenuBottomItems = (presentation) => {
      // if this link to exists in recentSideBarMenuBottomItems => do nothing
      if (
         recentSideBarMenuBottomItems.some((resentItem, index) => {
            return resentItem.id === presentation.id;
         })
      ) {
         // donothing
      } else {
         // else => insert this link at the head of newRecentSideBarMenuBottomItems
         // and remove last element of newRecentSideBarMenuBottomItems if length > 5

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
         <Header />
         <div className={cx("container")}>
            <SideBar
               menuTop={menuTop}
               menuBottomLabel={"Recent Presentations"}
               recentSideBarMenuBottomItems={recentSideBarMenuBottomItems}
               preLink="/presentation"
            />
            <Context.Provider
               value={{
                  recentSideBarMenuBottomItems,
                  handleUpdateRecentSideBarMenuBottomItems
               }}
            >
               <div className={cx("content")}>{children}</div>
            </Context.Provider>
         </div>
      </div>
   );
}
export default PresenationManageLayout;
