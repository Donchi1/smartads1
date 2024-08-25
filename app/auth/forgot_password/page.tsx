"use client"
import React, { useCallback, useEffect, useState } from 'react'
import Input from '@/app/components/Input'
import Layout from '@/app/components/Layout'
import * as Yup from "yup"
import { useFormik } from 'formik'
import Image from 'next/image'
import Link from 'next/link'
import PhoneNumberInput from '@/app/components/PhoneNumberInput'
import Button from '@/app/components/Buttons'
import Spinner from '@/app/components/Spinner'
import { useSnackbar } from 'notistack'
import Text from '@/app/components/Text'
import NavHeader from '@/app/components/NavHeader'
import { genarateRandomFiveDigit, getFromLocalStorage } from '@/utils/helpers'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '@/db/firebaseConfig'
import { appUrl } from '@/utils/constants'
import useValidationError from '@/app/components/hooks/UseValidationError'

function Page() {
  const { enqueueSnackbar } = useSnackbar()
  const [genCode, setGenCode] = useState(genarateRandomFiveDigit())

  const formik = useFormik({
    initialValues: {
      email: "",
      graphicCode: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email().trim().lowercase().required(),
      graphicCode: Yup.string().length(5).trim().required(),
    }),
    onSubmit: async (values) => {
      handleFormSubmit(values)
    }
  })


  const handleFormSubmit = async ({ email }: typeof formik.values) => {
    if (values.graphicCode !== genCode) {
      return enqueueSnackbar("Graphic code must match")
    }
    try {

      //create user on firestore
      await sendPasswordResetEmail(auth, email, { url: `${appUrl as string}/auth/reset_password`, handleCodeInApp: true })
      formik.resetForm()
      enqueueSnackbar("A password reset link was sent to your email.", { variant: "success" })
    } catch (err: any) {
      formik.setSubmitting(false)
      const errMsg = err?.code.split("")[1];
      enqueueSnackbar("error:" + errMsg, { variant: "error" })
    }
  };



  const { touched, values, handleSubmit, isSubmitting, isValidating, setFieldError, errors, getFieldProps, setFieldValue } = formik

  useValidationError(formik)


  const genGraphicCode = useCallback(() => {
    const code = genarateRandomFiveDigit()
    setGenCode(code)
  }, [])

  return (
    <>
      <NavHeader headerTitle={{ showTitle: true, title: "Forgot Password" }} headerLeft={{ headerLeftTitle: { showTitle: false } }} />
      <section className='w-full h-screen'>

        <Layout className="!pt-0" >
          <header className='mb-6 mt-[2rem] flex justify-center items-center'>
            <div className='size-[6rem] rounded-full bg-[#fcfcf3] flex justify-center items-center'>
              <Image className='w-[4rem] rounded-full' width={500} height={500} src={"/img/forgot-logo.png"} alt="logo" />
            </div>

          </header>

          <div className='space-y-6 py-4 w-full'>
            <form className='space-y-6' onSubmit={handleSubmit}>
              <Input
                placeholder='Enter your email'
                error={touched.email && errors.email}
                {...getFieldProps("email")}
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
                title={isSubmitting ? <Spinner /> : "Reset"}
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