import { useSnackbar } from 'notistack';
import React, { useEffect } from 'react'

function useValidationError(formik:any) {
    const { enqueueSnackbar } = useSnackbar();
    useEffect(() => {
        if (Object.keys(formik.errors).length > 0 && formik.isSubmitting && !formik.isValidating) {
          enqueueSnackbar(formik.errors[Object.keys(formik.errors)[0] as keyof typeof formik.values]);
        }
      }, [formik.isValidating]);
  return {}
}

export default useValidationError