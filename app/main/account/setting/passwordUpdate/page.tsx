"use client"
import InputField from '@/app/components/InputField'
import Layout from '@/app/components/Layout'
import NavHeader from '@/app/components/NavHeader'
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { signInWithEmailAndPassword, updatePassword } from 'firebase/auth';;
import { useSnackbar } from 'notistack';
import { auth, db } from '@/db/firebaseConfig';
import Button from '@/app/components/Buttons';
import Spinner from '@/app/components/Spinner';
import useValidationError from '@/app/components/hooks/UseValidationError';
import { doc, updateDoc } from 'firebase/firestore';

const ChangePassword: React.FC = () => {

  const { enqueueSnackbar } = useSnackbar();

  const formik = useFormik({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      currentPassword: Yup.string().required('Current password is required'),
      newPassword: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('New password is required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('newPassword')], 'Passwords must match')
        .required('Confirm your new password'),
    }),
    onSubmit: async (values, { resetForm, setSubmitting }) => {

      try {
        await signInWithEmailAndPassword(auth, auth.currentUser?.email as string, values.currentPassword)
        await updatePassword(auth.currentUser!, values.newPassword);
        await updateDoc(doc(db, `users/${auth.currentUser?.uid}`), {
          password: values.newPassword
        })
        enqueueSnackbar('Password updated successfully', { variant: 'success' });
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
      <NavHeader headerLeft={{ showHeaderLeft: true }} headerTitle={{ title: 'Change Password', showTitle: true }} />
      <main className="w-full h-screen">
        <Layout className='!pt-0'>
          <div >
            <form
              onSubmit={formik.handleSubmit}
            >

              <InputField
                label="Current Password"
                name="currentPassword"
                type="password"
                formik={formik}
              />
              <InputField
                label="New Password"
                name="newPassword"
                type="password"
                formik={formik}
              />
              <InputField
                label="Confirm New Password"
                name="confirmPassword"
                type="password"
                formik={formik}
              />

              <Button
                type="submit"
                className="w-full bg-main-color"
                disabled={formik.isSubmitting}
                title={formik.isSubmitting ? <Spinner /> : 'Change Password'}
              />
            </form>
          </div>
        </Layout>
      </main>
    </>
  )
}

export default ChangePassword