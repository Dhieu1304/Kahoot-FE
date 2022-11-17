import GroupItem from "./GroupItem";
import TopBar from "./TopBar";

function ManageGroupList() {
   return (
      <div>
         <TopBar />
         <div>
            <GroupItem />
            <GroupItem />
            <GroupItem />
            <GroupItem />
            <GroupItem />
         </div>
      </div>
   );
}

export default ManageGroupList;
