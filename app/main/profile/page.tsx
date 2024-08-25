
'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { DocumentData, doc, updateDoc } from 'firebase/firestore';
import { auth, db } from '@/db/firebaseConfig';
import useGetDocument from '@/app/components/hooks/UseDocument';
import BottomSheetModal from '@/app/components/BottomSheetModal';
import Button from '@/app/components/Buttons';
import Input from '@/app/components/Input';
import Layout from '@/app/components/Layout';
import NavHeader from '@/app/components/NavHeader';
import PhoneNumberInput from '@/app/components/PhoneNumberInput';
import ProfileInfo from '@/app/components/ProfileInfo';
import Spinner from '@/app/components/Spinner';
import { EmailAuthProvider, User, reauthenticateWithCredential, sendEmailVerification, updateEmail } from 'firebase/auth';
import useValidationError from '@/app/components/hooks/UseValidationError';

const ProfilePage: React.FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [user] = useGetDocument("users", auth.currentUser?.uid || "utyhgh");
  const [openInput, setOpenInput] = useState<{ type: string; inputName: string }>({ type: "", inputName: "" });
  const formEmailRef = useRef<HTMLFormElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  const formik = useFormik({
    initialValues: {
      phoneNumber: "",
      name: "",
      username: "",
      state: "",
      country: "",
      photo: ""
    },
    validationSchema: Yup.object({
      name: Yup.string().lowercase().trim().required("Name required"),
      username: Yup.string().lowercase().trim().optional(),
      country: Yup.string().lowercase().trim().optional(),
      state: Yup.string().lowercase().optional(),
      phoneNumber: Yup.string().required("Phone number required"),
      photo: Yup.mixed().optional()
    }),
    onSubmit: (values) => {
      handleFormSubmit(values);
    }
  });

  const formikEmail = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").trim().lowercase(),
    }),
    onSubmit: (values) => {
      handleFormEmailSubmit(values);
    }
  })


  const handleFormEmailSubmit = async (values: typeof formikEmail.values) => {
    formikEmail.setSubmitting(true)
    try {
        const newEmail = values.email;

        // Send verification email to the new email address
        await sendEmailVerification(auth.currentUser as User, { url: window.location.href });

        enqueueSnackbar("Verification email sent. Please verify your new email before updating.", { variant: "info" });

        // Reauthenticate user
        const credential = EmailAuthProvider.credential(auth.currentUser?.email as string, prompt('Enter your password') as any);
        await reauthenticateWithCredential(auth.currentUser as User, credential);

        await updateEmail(auth.currentUser as User, newEmail);
        
      // Update email in Firebase Authentication
      await updateEmail(auth.currentUser as User, values.email)
      //update date in firestore db
      await updateDoc(doc(db, "users", auth.currentUser?.uid as string), {
        email: values.email
      })
      formikEmail.setSubmitting(false)
      enqueueSnackbar("Email Updated", { variant: "success" })
      setOpenInput({...openInput, type: ""})
    } catch (error: any) {
      formikEmail.setSubmitting(false)
      enqueueSnackbar(`Error: ${error?.message}`, { variant: "error" })
    }
  }
  const handleFormSubmit = async (values: typeof formik.values) => {
    try {
      await updateDoc(doc(db, "users", auth.currentUser?.uid as string), { ...values });
      formik.setSubmitting(false);
      enqueueSnackbar("Update successful", { variant: "success" });
      setOpenInput({...openInput, type: ""})
    } catch (err: any) {
      formik.setSubmitting(false);
      enqueueSnackbar(err.message, { variant: "error" });
    }
  };

  useEffect(() => {
    formik.setValues({
      name: user?.name || "",
      state: user?.state || "",
      country: user?.country || "",
      phoneNumber: user?.phoneNumber || "",
      username: user?.username || "",
      photo: user?.photo || ""
    });
    formikEmail.setValues({
      email: user?.email || ""
    })
  }, [user]);

  const { values, getFieldProps, touched, errors, isSubmitting, handleSubmit, isValidating, setFieldValue } = formik;

 useValidationError(formik)

  useEffect(() => {
    const inputElement = formRef.current?.querySelector<HTMLInputElement>(`#${openInput.inputName || "phoneNumber"}`);
    const emailInputElement = formEmailRef.current?.querySelector<HTMLInputElement>(`#email`);
    if (openInput.type === "email") {
      emailInputElement?.focus();
    } else {
      inputElement?.focus();
    }
  }, [openInput]);

  return (
    <main className='w-full min-h-screen'>
      <NavHeader headerLeft={{ showHeaderLeft: true }} headerTitle={{ showTitle: true, title: "Profile" }} />
      <Layout className='!pt-0' innerClassName='!w-[94%]'>
        <ProfileInfo setFieldValue={setFieldValue} user={user as DocumentData} setOpenInput={setOpenInput} />
        <BottomSheetModal
          wrapperClassName='!p-4'
          open={openInput.type === "email"}
          onClose={() => setOpenInput({ ...openInput, type: "" })}
        >
          <div className='space-y-6 py-4 w-full'>
            <form onSubmit={formikEmail.handleSubmit} ref={formEmailRef} className='space-y-6'>
              <Input
                id="email"
                placeholder='Enter your email'
                error={formikEmail.touched.email && formikEmail.errors.email}
                {...formikEmail.getFieldProps("email")}
              />
              <Button className='!bg-main-color !w-full !py-3 disabled:!bg-main-color/70'
                title={formikEmail.isSubmitting ? <Spinner /> : "Update"}
                type='submit'
                disabled={formikEmail.isSubmitting}
              />
            </form>
          </div>
        </BottomSheetModal>
        <BottomSheetModal
          wrapperClassName='!p-4'
          open={openInput.type === "others"}
          onClose={() => setOpenInput({ ...openInput, type: "" })}
        >
          <div className='space-y-6 py-4 w-full'>
            <form className='space-y-6' onSubmit={handleSubmit} ref={formRef}>

              <PhoneNumberInput
                value={values.phoneNumber}
                error={touched.phoneNumber && errors.phoneNumber}
                id="phone"
                onChange={(phone) => setFieldValue("phoneNumber", phone)}
              />

              <div className=''>

                <Input
                  className='!text-[14px] placeholder:!text-[14px]'
                  error={touched.username && errors.username}
                  placeholder='Enter your username'
                  id='username'
                  {...getFieldProps("username")}
                />
              </div>
              <div className=''>

                <Input
                  className='!text-[14px] placeholder:!text-[14px]'
                  error={touched.name && errors.name}
                  placeholder='Enter your name'
                  {...getFieldProps("name")}
                  id="name"
                />
              </div>
              <div className='flex justify-between items-center w-full rounded-full bg-main-gray/50'>

                <Input
                  className='!bg-transparent !w-[81%] !text-[14px] placeholder:!text-[14px]'
                  error={touched.country && errors.country}
                  placeholder='country'
                  {...getFieldProps("country")}
                  id='country'
                />
              </div>
              <div className='flex justify-between items-center w-full rounded-full bg-main-gray/50'>

                <Input
                  className='!bg-transparent !w-[81%] !text-[14px] placeholder:!text-[14px]'
                  error={touched.state && errors.state}
                  placeholder='State'
                  {...getFieldProps("state")}
                  id="state"
                />
              </div>
              <Button className='!bg-main-color !w-full !py-3 disabled:!bg-main-color/70'
                title={isSubmitting ? <Spinner /> : "Update"}
                type='submit'
                disabled={isSubmitting}
              />
            </form>
          </div>
        </BottomSheetModal>
      </Layout>
    </main>
  )
}

export default ProfilePage



