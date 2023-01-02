import { useState } from "react";

const useTableSelect = (defaultRowIds = []) => {
   // filter state
   const [rowIds, setRowIds] = useState(defaultRowIds);
   const [isSelectAll, setIsSelectAll] = useState(false);
   const [selectedRowIds, setSelectedRowIds] = useState([]);

   // handle when select all rows
   const handleSelectedAll = () => {
      // if isSelectAll === true => clear setSelectedRowIds;
      // else checked all rows
      if (isSelectAll) {
         setSelectedRowIds([]);
      } else {
         setSelectedRowIds((prev) => {
            return [...rowIds];
         });
      }

      setIsSelectAll((prev) => !prev);
   };

   // handle when select 1 row
   const handleSelected = (id, isChecked) => {
      // handle checked row
      setSelectedRowIds((prev) => {
         const newSelectedRowIds = [...prev];
         if (isChecked) {
            const index = newSelectedRowIds.indexOf(id);
            newSelectedRowIds.splice(index, 1);
         } else {
            newSelectedRowIds.push(id);
         }
         return [...newSelectedRowIds];
      });

      // If current row is checked => after clicking this row, clear selectAll checkbox
      if (isChecked) {
         setIsSelectAll(false);
      }
   };

   return {
      isSelectAll,
      setIsSelectAll,
      selectedRowIds,
      setSelectedRowIds,
      handleSelectedAll,
      handleSelected,
      setRowIds
   };
};

export { useTableSelect };
