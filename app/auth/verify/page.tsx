"use client"
import React, { useCallback, useEffect, useState } from 'react'
import Input from '@/app/components/Input'
import Layout from '@/app/components/Layout'
import * as Yup from "yup"
import { useFormik } from 'formik'
import Image from 'next/image'
import Button from '@/app/components/Buttons'
import Spinner from '@/app/components/Spinner'
import { useSnackbar } from 'notistack'
import NavHeader from '@/app/components/NavHeader'
import { genarateRandomFiveDigit } from '@/utils/helpers'
import { doc, updateDoc } from 'firebase/firestore'
import { auth, db } from '@/db/firebaseConfig'
import { useRouter } from 'next/navigation'
import useGetDocument from '@/app/components/hooks/UseDocument'
import useValidationError from '@/app/components/hooks/UseValidationError'

function Page() {
  const router = useRouter()
  const [userDocument, docLoading, userError] = useGetDocument(
      "users",
      auth.currentUser?.uid as string || "tyutuij",
    );
  const { enqueueSnackbar } = useSnackbar()
  const [genCode, setGenCode] = useState(genarateRandomFiveDigit())

  

  const formik = useFormik({
    initialValues: {
      verificationCode: "",
      graphicCode: "",
    },
    validationSchema: Yup.object({
      verificationCode: Yup.string().trim().required(),
      graphicCode: Yup.string().length(5).trim().required(),
    }),
    onSubmit: async (values) => {
     handleformSubmit(values.verificationCode)
}})


  const handleformSubmit = async (code: string) => {
    formik.setSubmitting(true);
    //check if the current user is already verified
    if(userDocument?.verified){
      return enqueueSnackbar("Account already verified", {variant: "info", onClose: () => router.push("login")})
    }
    //check the user verification code
    if (userDocument?.verificationCode !== code) {
      formik.setSubmitting(false);
      return enqueueSnackbar("Wrong verification code", {variant: "error"});
    }
    try {
      await updateDoc(doc(db, `users/${userDocument?.uid}`), {
        verified: true,
      });
      formik.resetForm();
      enqueueSnackbar("Account verification successful", {variant: "success", onClose:() => location.assign("/")})
    } catch (error: any) {
      formik.resetForm();
      enqueueSnackbar(error.message, {variant: "error"});
    }
  };



  const { touched, values, handleSubmit, isSubmitting, errors, getFieldProps, setFieldValue } = formik


useValidationError(formik)


  const genGraphicCode = useCallback(() => {
    const code = genarateRandomFiveDigit()
    setGenCode(code)
  }, [])

  return (
    <>
      <NavHeader headerTitle={{ showTitle: true, title: "verify Account" }} headerLeft={{ headerLeftTitle: { showTitle: false } }} />
      <section className='w-full h-screen'>

        <Layout className="" >
          <header className='mb-6 mt-[2rem] flex justify-center items-center'>
            <div className='size-[6rem] rounded-full bg-[#fcfcf3] flex justify-center items-center'>
              <Image className='w-[5rem] rounded-full' width={500} height={500} src={"/img/reset-logo.png"} alt="logo" />
            </div>

          </header>

          <div className='space-y-6 py-4 w-full'>
            <form className='space-y-6' onSubmit={handleSubmit}>
              <Input
                placeholder='Enter verification Code'
                error={touched.verificationCode && errors.verificationCode}
                {...getFieldProps("verificationCode")}
              />
              <div className='flex justify-between items-center w-full rounded-full bg-main-gray/50'>

                <Input
                  className='!bg-transparent !w-[81%] !text-[14px] placeholder:!text-[14px]'
                  error={touched.graphicCode && errors.graphicCode}
                  placeholder='Enter graphic code'
                  value={values.graphicCode}
                  onChange={(e) => {
                    if (e.target.value.length <= 5) setFieldValue("graphicCode", e.target.value)
                    return
                  }}
                // {...getFieldProps("graphicCode")}
                />

                <div className='min-w-[17%]  text-main-color mr-1 md:mr-0 flex items-center'>
                  <span className='bg-black text-white rounded-md px-1 text-[15px] inline-block slashed-zero oldstyle-nums italic'>{genCode}</span>
                  <Image className='size-7' width={300} onClick={genGraphicCode} height={400} src={"/img/refresh.png"} alt='refresh' />
                </div>

              </div>
              <Button className='!bg-main-color !w-full !py-3 disabled:!bg-main-color/70'
                title={isSubmitting ? <Spinner /> : "Verify"}
                type='submit'
                disabled={isSubmitting}
              />

            </form>

            <div className='flex justify-center  items-center'>
              <Image className='w-[250px]'
                width={500}
                height={500}
                src={"/img/get-started.png"}
                alt='getstarted'
              />
            </div>
          </div>
        </Layout>
      </section>
    </>
  )
}


export default Page