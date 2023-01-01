import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";

import * as localStorageApp from "../../utils/localStorage";
import SidebarItem from "./SidebarItem";

import styles from "./SideBar.module.scss";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../providers/auth";
import { useEffect } from "react";

import Select from "react-select";
import { useMediaQuery } from "react-responsive";

const cx = classNames.bind(styles);

// function SideBar({ recentGroupsList, setRecentGroupsList, showSideBar, setShowSideBar }) {
function SideBar({
   menuTop,
   menuBottomLabel,
   recentSideBarMenuBottomItems,
   preLink
   // handleUpdateSideBarMenuBottomItems
}) {
   // const handleUpdateSideBarMenuBottomItems = (item) => {
   //    if (recentSideBarMenuBottomItems.includes(item)) {
   //       // do nothing
   //    } else {
   //       const newRecentMenuBottomItems = [item, ...recentSideBarMenuBottomItems];
   //       newRecentMenuBottomItems.pop();
   //       setRecentGroupsList(newRecentMenuBottomItems);
   //       localStorageApp.setItem(localStorageApp.LOCAL_STORAGE, newRecentMenuBottomItems);
   //    }
   // };

   const isMobile = useMediaQuery({ maxWidth: 767 });

   const renderForNotMobile = () => {
      return (
         <div
            className={cx("container", {
               /*mobile*/
            })}
         >
            <div className={cx("top")}>
               <span className={cx("label")}>{menuTop?.label}</span>
               <ul className={cx("menu")}>
                  {menuTop?.items?.map((item, index) => (
                     <SidebarItem
                        to={item.to}
                        key={index}
                        label={item.name}
                        leftIcon={item.leftIcon}
                     />
                  ))}
               </ul>
            </div>
            <div className={cx("bottom")}>
               <span className={cx("label")}>{menuBottomLabel}</span>
               <ul className={cx("menu")}>
                  {recentSideBarMenuBottomItems?.map((item, index) => (
                     <SidebarItem
                        key={index}
                        to={`${preLink}/${item?.id.toString()}/user`}
                        label={item.name}
                        matchLink={`${preLink}/${item?.id.toString()}`}

                        // onClick={() => handleUpdateSideBarMenuBottomItems(item)}
                     />
                  ))}
               </ul>
            </div>
         </div>
      );
   };

   const renderForMobile = () => {
      const manageOptions = [...menuTop?.items];
      const itemOptions = [...recentSideBarMenuBottomItems];

      console.log("manageOptions: ", manageOptions);
      console.log("itemOptions: ", itemOptions);

      const options = [
         {
            label: menuTop?.label,
            options: manageOptions
         },
         {
            label: menuBottomLabel,
            options: itemOptions
         }
      ];

      return (
         <Select
            // defaultValue={watch("slideType")}
            placeholder="Select"
            // onChange={onChange}
            // value={value}
            // onBlur={onBlur}
            options={options}
            className={cx("select")}
            isSearchable={false}
            formatOptionLabel={({ name }) => {
               return <div>{name}</div>;
            }}
            getOptionValue={(option) => option.name}
            theme={"white"}
         />
      );
   };

   return isMobile ? renderForMobile() : renderForNotMobile();
}

export default SideBar;
