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
import { genarateRandomFiveDigit, getFromLocalStorage } from '@/utils/helpers'

function Page() {
  const { enqueueSnackbar } = useSnackbar()
  const [genCode, setGenCode] = useState(genarateRandomFiveDigit())

  const formik = useFormik({
    initialValues: {
      newPassword: "",
      repeatPassword: "",
      graphicCode: "",
    },
    validationSchema: Yup.object({
      password: Yup.string().min(5).required(),
      repeatPassword: Yup.string().oneOf([Yup.ref("password"), ""], "password must match").required(),
      graphicCode: Yup.string().length(5).trim().required(),
    }),
    onSubmit: async (values) => {
      return new Promise((resolve, reject) => setTimeout(() => {
        if (values.graphicCode !== genCode) {
          return reject("Graphic code must match")
        }
        return resolve(values.newPassword)
      }, 3000)).then((val) => {
        formik.resetForm()
        enqueueSnackbar("success", { variant: "success" })
      }).catch((err) => {
        formik.setSubmitting(false)
        enqueueSnackbar("error:" + err, { variant: "error" })
      })
    }
  })



  const { touched, values, handleSubmit, isSubmitting, isValidating, setFieldError, errors, getFieldProps, setFieldValue } = formik

  // getting the error keys
  const val = Object.keys(errors);

  useEffect(() => {
    //displaying the first error of the formik errors
    if (val?.length > 0 && isSubmitting && !isValidating)
      enqueueSnackbar(errors[val[0] as keyof typeof errors]);
  }, [!isValidating])


  const genGraphicCode = useCallback(() => {
    const code = genarateRandomFiveDigit()
    setGenCode(code)
  }, [])

  return (
    <>
      <NavHeader headerTitle={{ showTitle: true, title: "Reset Password" }} headerLeft={{ headerLeftTitle: { showTitle: false } }} />
      <section className='w-full h-screen'>

        <Layout className="!pt-0" >
          <header className='mb-6 mt-[2rem] flex justify-center items-center'>
            <div className='size-[6rem] rounded-full bg-[#fcfcf3] flex justify-center items-center'>
              <Image className='w-[5rem] rounded-full' width={500} height={500} src={"/img/reset-logo.png"} alt="logo" />
            </div>

          </header>

          <div className='space-y-6 py-4 w-full'>
            <form className='space-y-6' onSubmit={handleSubmit}>
              <Input
               type='password'
                placeholder='Enter new password'
                error={touched.newPassword && errors.newPassword}
                {...getFieldProps("newPassword")}
              />
              <Input
               type='password'
                placeholder='Repeat Password'
                error={touched.repeatPassword && errors.repeatPassword}
                {...getFieldProps("repeatPassword")}
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
                title={isSubmitting ? <Spinner /> : "Update"}
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