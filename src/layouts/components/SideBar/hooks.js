import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { AuthContext } from "../../../providers/auth";
import * as localStorageApp from "../../../utils/localStorage";

const useSideBar = (localStorageKey) => {
   const authContext = useContext(AuthContext);

   const [recentSideBarMenuBottomItems, setRecentSideBarMenuBottomItems] = useState([]);

   // load recent menuBottom items
   useEffect(() => {
      const recentMenuBottomItemsObject = localStorageApp.getItem(
         localStorageApp.LOCAL_STORAGE[localStorageKey]
      );

      if (authContext.user.id) {
         if (recentMenuBottomItemsObject && recentMenuBottomItemsObject[authContext.user.id]) {
            const recentMenuBottomItemsFromLocal = recentMenuBottomItemsObject[authContext.user.id];
            setRecentSideBarMenuBottomItems(recentMenuBottomItemsFromLocal);
         } else {
            localStorageApp.setItem(localStorageApp.LOCAL_STORAGE[localStorageKey], {
               [authContext.user.id]: recentSideBarMenuBottomItems
            });
         }
      }
   }, [authContext.user.id]);

   const updateRecentSideBarMenuBottomItems = (newRecentSideBarMenuBottomItems) => {
      localStorageApp.setItem(localStorageApp.LOCAL_STORAGE[localStorageKey], {
         [authContext.user.id]: newRecentSideBarMenuBottomItems
      });

      setRecentSideBarMenuBottomItems(newRecentSideBarMenuBottomItems);
   };

   return {
      recentSideBarMenuBottomItems,
      updateRecentSideBarMenuBottomItems
   };
};

export { useSideBar };
