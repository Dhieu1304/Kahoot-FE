import React, { memo, useCallback, useEffect } from "react";

import debounce from "debounce";
import { useFormContext, useWatch } from "react-hook-form";
import useDeepCompareEffect from "use-deep-compare-effect";

// https://codesandbox.io/s/react-hook-form-auto-save-xgulp?file=/src/AutoSave.tsx:0-1680
const AutoSave = memo(({ defaultValues, onSubmit }) => {
   const methods = useFormContext();

   const debouncedSave = useCallback(
      debounce(async () => {
         await methods.handleSubmit(onSubmit)();
      }, 1000),
      []
   );

   const watchedData = useWatch({
      control: methods.control,
      defaultValue: defaultValues
   });

   useDeepCompareEffect(() => {
      if (methods.formState.isDirty) {
         debouncedSave();
      }
   }, [watchedData]);

   return <>{methods.formState.isSubmitting ? "Success" : "Failse"}</>;
});

export default AutoSave;
