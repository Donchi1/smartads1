"use client"
import Button from '@/app/components/Buttons';
import useValidationError from '@/app/components/hooks/UseValidationError';
import InputField from '@/app/components/InputField'
import Layout from '@/app/components/Layout'
import NavHeader from '@/app/components/NavHeader'
import Spinner from '@/app/components/Spinner';
import { useAuthStore } from '@/app/store/authStore';
import { auth, db } from '@/db/firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import { useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import React from 'react'
import * as Yup from "yup"

function WithdrawalPassword() {
  const {currentUser} = useAuthStore()
  const { enqueueSnackbar } = useSnackbar();

  const formik = useFormik({
    initialValues: {
      accountPassword: "",
      withdrawalPassword: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      accountPassword: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Account login password requird'),
      withdrawalPassword: Yup.string()
        .min(3, 'Withdrawal Password must be at least 3 characters')
        .required('Withdrawal Password required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('withdrawalPassword')], 'Passwords must match')
        .required('Confirm your withdrawal password'),
    }),
    onSubmit: async (values, { resetForm, setSubmitting }) => {
    if(currentUser?.password !== values.accountPassword) return enqueueSnackbar("Please type your correct account login password", {variant: "error"})
      try {

        await setDoc(doc(db, `users/${auth.currentUser?.uid}`), {
          withdrawalPassword: values.accountPassword
        }, {merge: true})
        enqueueSnackbar('withdrawal password set successfully', { variant: 'success' });
        resetForm();
      } catch (error: any) {
        const errorMessage = error?.message || 'An error occurred. Please try again.';
        enqueueSnackbar(errorMessage, { variant: 'error' });
      } finally {
        setSubmitting(false);
      }
    },
  });
 useValidationError(formik)

  return (
    <>
      <NavHeader headerLeft={{ showHeaderLeft: true }} headerTitle={{ title: "Withdrawal Password", showTitle: true }} />
      <main className="w-full h-screen">
        <Layout className="!pt-3">
          <div>
          <form
              onSubmit={formik.handleSubmit}
            >

              <InputField
                label="Account login Password"
                name="accountPassword"
                type="password"
                formik={formik}
              />
              <InputField
                label="Withdrawal Password"
                name="withdrawalPassword"
                type="password"
                formik={formik}
              />
              <InputField
                label="Confirm withdrawal Password"
                name="confirmPassword"
                type="password"
                formik={formik}
              />

              <Button
                type="submit"
                className="w-full bg-main-color"
                disabled={formik.isSubmitting}
                title={formik.isSubmitting ? <Spinner /> : 'Set Password'}
              />
            </form>
          </div>
        </Layout>
      </main>
    </>
  )
}

export default WithdrawalPassword