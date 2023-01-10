import { useState, useEffect } from "react";
// import useDeepCompareEffect from "use-deep-compare-effect";
import { useCustomCompareEffect } from "use-custom-compare";
import isEqual from "lodash/isEqual";

function useDebounce(value, delay) {
   const [debouncedValue, setDebouncedValue] = useState(value);

   useCustomCompareEffect(
      () => {
         const handler = setTimeout(() => setDebouncedValue(value), delay);

         return () => clearTimeout(handler);
      },
      [value],
      (prevDeps, nextDeps) => {
         const result = isEqual(prevDeps, nextDeps);

         return result;
      }
   );

   return debouncedValue;
}

export default useDebounce;
