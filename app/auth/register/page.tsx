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
import { genarateRandomFiveDigit, saveToFirestore} from '@/utils/helpers'
import { auth} from '@/db/firebaseConfig'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import useValidationError from '@/app/components/hooks/UseValidationError'

function Page() {
  const { enqueueSnackbar } = useSnackbar()
  const [genCode,setGenCode]= useState(genarateRandomFiveDigit())
  const router = useRouter()

  const formik = useFormik({
    initialValues: {
      email: "",
      phoneNumber: "",
      password: "",
      graphicCode: "",
      repeatPassword: "",
      invitationCode: ""
    },
    validationSchema: Yup.object({
      email: Yup.string().email().trim().lowercase().required(),
      phoneNumber: Yup.string().min(10).trim().required(),
      graphicCode: Yup.string().length(5).trim().required(),
      password: Yup.string().min(5).required(),
      repeatPassword: Yup.string().oneOf([Yup.ref("password"), ""], "password must match").required(),
      invitationCode: Yup.string().optional(),
    }),
    onSubmit: async (values) => {
      handleFormSubmit(values)
    }
})

  const handleFormSubmit = async (values: typeof formik.values) => {
    formik.setSubmitting(true)
    if(values.graphicCode !== genCode){
      return enqueueSnackbar("Graphic code must match")
    }
    try {

      //register User
      const { user } = await createUserWithEmailAndPassword(auth, values.email, values.password);

      //Create a reference for the image 
      // const storageRef = ref(storage, `users/${user?.uid}`);

      // await uploadBytes(storageRef, values.photo as Blob);
      // const url = await getDownloadURL(storageRef);
      //const q = query(collection(db, "users"), where("referrerCode", "==", refCode))

      //const referrer = refCode && (await getDocs(q)).docs[0]?.data()


      try {
        //create user on firestore
       
        await saveToFirestore(user, values)
        formik.resetForm();
        
        enqueueSnackbar("success", { variant: "success",
          onClose: () => 
            router.push("verify")
        })
      } catch (err: any) {
        formik.setSubmitting(false)
        enqueueSnackbar("error:" + err, { variant: "error" })
      }
    } catch (err: any) {
      const msg = err.code.split("/")[1];
      formik.setSubmitting(false)
      enqueueSnackbar("error:" + msg, { variant: "error" })
     
    }
  };



  const { touched, values, handleSubmit, isSubmitting, isValidating,setFieldError, errors, getFieldProps, setFieldValue } = formik


  // useEffect(() => {
  //   //displaying the first error of the formik errors
  //   if (val?.length > 0 && isSubmitting && !isValidating)
  //     enqueueSnackbar(errors[val[0] as keyof typeof errors]);
  // }, [!isValidating])

  useValidationError(formik)

  const genGraphicCode = useCallback(() =>{
   const code =  genarateRandomFiveDigit()
   setGenCode(code)
  },[])

  return (
    <>
     <NavHeader headerTitle={{ showTitle: true, title: "Register" }} headerLeft={{headerLeftTitle:{showTitle: false}}} />
    <section className='w-full h-screen'>

      <Layout className="!pt-0" >
        <header className='mb-6 mt-[2rem] flex justify-center items-center'>
          <Image className='w-[6rem]' width={500} height={500} src={"/img/reg-logo.png"} alt="logo" />
        </header>

        <div className='space-y-6 py-4 w-full'>
          <form className='space-y-6' onSubmit={handleSubmit}>
          <Input
                placeholder='Enter your email'
                error={touched.email && errors.email}
                {...getFieldProps("email")}
              />
            <PhoneNumberInput
              value={values.phoneNumber}
              error={touched.phoneNumber && errors.phoneNumber}
              onChange={(phone) => setFieldValue("phoneNumber", phone)}
            />
            <div className='flex justify-between items-center w-full rounded-full bg-main-gray/50'>

              <Input
                className='!bg-transparent !w-[81%] !text-[14px] placeholder:!text-[14px]'
                error={touched.graphicCode && errors.graphicCode}
                placeholder='Enter graphic code'
                value={values.graphicCode}
                onChange={(e) => {             
                  if(e.target.value.length <= 5) setFieldValue("graphicCode", e.target.value)
                    return
                }}
                // {...getFieldProps("graphicCode")}
              />

              <div className='min-w-[17%]  text-main-color mr-1 md:mr-0 flex items-center'>
                <span className='bg-black text-white rounded-md px-1 text-[15px] inline-block slashed-zero oldstyle-nums italic'>{genCode}</span>
                <Image className='size-7' width={300} onClick={ genGraphicCode} height={400} src={"/img/refresh.png"} alt='refresh' />
              </div>

            </div>
            <div className=''>

              <Input
              className='!text-[14px] placeholder:!text-[14px]'
                error={touched.password && errors.password}
                type='password'
                placeholder='Enter your password'
                {...getFieldProps("password")}
              />
            </div>
            <div className=''>

              <Input
              className='!text-[14px] placeholder:!text-[14px]'
                error={touched.repeatPassword && errors.repeatPassword}
                type='password'
                placeholder='Repeat Password'
                {...getFieldProps("repeatPassword")}
              />
            </div>
            <div className=''>

              <Input
              className='!text-[14px] placeholder:!text-[14px]'
                error={touched.invitationCode && errors.invitationCode}
                placeholder='Enter invitation Code'
                {...getFieldProps("invitationCode")}
              />
            </div>
            <div className='flex items-center gap-2'>
              <Image className='size-5'
                width={300}
                height={300}
                src={"/img/checked.png"}
                alt='privacy'
              />
              <Text>
                By registering, you have read and agree to our 
                <Link href="/privacy-policy" className="text-main-color underline ml-1">Privacy Policy</Link>.
              </Text>
            </div>
            <Button className='!bg-main-color !w-full !py-3 disabled:!bg-main-color/70'
              title={isSubmitting ? <Spinner /> : "Register"}
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