"use client"
import React, { useState } from 'react'
import Input from '@/app/components/Input'
import Layout from '@/app/components/Layout'
import * as Yup from "yup"
import { useFormik } from 'formik'
import Image from 'next/image'
import Link from 'next/link'
import Button from '@/app/components/Buttons'
import Spinner from '@/app/components/Spinner'
import { useSnackbar } from 'notistack'
import Text from '@/app/components/Text'
import NavHeader from '@/app/components/NavHeader'
import { HiChevronDown } from 'react-icons/hi'
// import { countryInfo, getFromLocalStorage, setToLocalStorage } from '@/utils/helpers'
import BottomSheetModal from '@/app/components/BottomSheetModal'
import { create } from '@/utils/createCookie'
import { auth, db } from '@/db/firebaseConfig'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import { doc, getDoc } from 'firebase/firestore'
import useValidationError from '@/app/components/hooks/UseValidationError'
import useLangLoader from '@/app/components/hooks/useLangLoader'


function Page() {

  const { enqueueSnackbar } = useSnackbar()
  const [openLang, setOpenLang] = useState(false)
  // const [langCode, setLangCode] = useState(getFromLocalStorage("lang"))
  const router = useRouter()

  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: Yup.object({
      email: Yup.string().email().trim().lowercase().required(),
      password: Yup.string().min(5).required()
    }),
    onSubmit: async (values) => {
     handleFormSubmit(values)
    }
  })

  const handleFormSubmit = async (val: typeof formik.values) => {
    formik.setSubmitting(true);
    const { email, password } = val;

    try {
      //create user on firestore
      await signInWithEmailAndPassword(auth, email, password);
      const userDocument = (await getDoc(doc(db, "users", auth.currentUser?.uid as string))).data()
      if(!userDocument?.verified) return enqueueSnackbar("Account not verified", {variant: "info", onClose: () => router.push("verify")})
      //create cookie
      const cookieData = JSON.stringify({id:auth.currentUser?.uid as string, isAdmin: false})
      create("auth",cookieData)
      //TODO toast
      enqueueSnackbar("Login Success", {variant: "success", onClose: () => router.push("/")})
        
    } catch (err: any) {
      formik.setSubmitting(false);
      const msg = err.code.split("/")[1];
      enqueueSnackbar(msg,{variant: "error"});
    }
  };



  const { touched, values, handleSubmit, isSubmitting, isValidating, errors, getFieldProps, setFieldValue } = formik

useValidationError(formik)


  // const handleCountrySelect = (code: string) => {
  //   setLangCode(code)
  //   setOpenLang(false)
  //   setToLocalStorage(code, "lang")
  // }

  return (
    <>
      <NavHeader headerTitle={{ showTitle: false }} headerLeft={
        {
          className: "text-black",
          headerLeftTitle: {
            onClick: (e) => router.push("language"),
            title: <span className='flex items-center gap-2'>Language<span><HiChevronDown size={25} /></span></span>,
            showTitle: true
          }
        }
      } />
      <section className='w-full h-screen'>

        <Layout className="!pt-0" >
          <header className='mb-8 mt-[4rem] flex justify-center items-center'>
            <Image className='w-[6rem]' width={500} height={500} src={"/img/login-logo.png"} alt="logo" />
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
                  className='!bg-transparent !w-[81%]'
                  error={touched.password && errors.password}
                  type='password'
                  placeholder='Enter your password'
                  {...getFieldProps("password")}
                />

                <Link className='min-w-[17%]  text-main-color mr-1 md:mr-0' href={"forgot_password"}>Forgot?</Link>

              </div>
              <div className='flex items-center gap-2'>
                <Image className='size-5'
                  width={300}
                  height={300}
                  src={"/img/checked.png"}
                  alt='privacy'
                />
                <Text>Agreement And Privacy Policy </Text>
              </div>
              <Button className='!bg-main-color !w-full !py-3 disabled:!bg-main-color/70'
                title={isSubmitting ? <Spinner /> : "Log In"}
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
          {/* <BottomSheetModal
            wrapperClassName='!p-4'
            open={openLang}
            onClose={() => setOpenLang(false)}
          >
             
            <div id="ytWidget" className='[&_form]:!grid has-[.yt-wrapper]:!flex has-[.yt-wrapper]:!justify-between [&_form]:!static [&_form]:!border-none has-[yt-serviceLink]:!hidden  has-[yt-wrapper]:!w-full [&_form]:!grid-cols-3 [&_form]:!w-full [&_div]:!w-full' >
            {/* <ul className='space-y-2'>
              {countryInfo.map(each => (
                <li onClick={() => handleCountrySelect(each.code)} key={each.extURL} className='flex cursor-pointer justify-between items-center'>
                  <div className='flex gap-2 items-center '>
                    <Image className='w-10 h-14 rounded-full ' width={400} height={600} src={each.extURL} alt="countryflag" />
                    {each.languageName}
                  </div>

                  <span>
                    <input checked={each.code === langCode} onChange={() => { }} type='checkbox' className='rounded-lg size-5 border-main-color' />
                  </span>
                </li>
              ))}
            </ul> 
            </div>
          </BottomSheetModal> */}
        </Layout>
      </section>
    </>
  )
}


export default Page