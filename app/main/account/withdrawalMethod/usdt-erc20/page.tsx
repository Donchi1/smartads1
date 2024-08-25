"use client"
import Button from '@/app/components/Buttons'
import H2 from '@/app/components/H2'
import useValidationError from '@/app/components/hooks/UseValidationError'
import Input from '@/app/components/Input'
import Layout from '@/app/components/Layout'
import NavHeader from '@/app/components/NavHeader'
import Spinner from '@/app/components/Spinner'
import Text from '@/app/components/Text'
import { auth, db } from '@/db/firebaseConfig'
import { getERC20Balance } from '@/utils/helpers'
import { doc, setDoc } from 'firebase/firestore'
import { useFormik } from 'formik'
import { useSnackbar } from 'notistack'
import React from 'react'
import * as Yup from "yup"

function page() {
  const { enqueueSnackbar } = useSnackbar();
  const formik = useFormik({
    initialValues: {
      wallet: "",
    },
    validationSchema: Yup.object({
      wallet: Yup.string().required()
    }),
    onSubmit: async (values) => {
      try {
              //api call 
     const wallatAmount = await getERC20Balance(values.wallet)

      await setDoc(doc(db, `users/${auth.currentUser?.uid}`), {
        wallet:{
          address:{
          erc_20: values.wallet
          },
          type: "usdt-erc20",
          totalAmount: Number(wallatAmount)
        }
      }, {merge: true})
      formik.resetForm()
      enqueueSnackbar("You have successfully bound your wallet", {variant: "success"})
      } catch (error: any) {
      formik.resetForm()
      enqueueSnackbar(error?.message, {variant: "error"})
      }

    },
  });

  useValidationError(formik)


  return (
    <>
    <NavHeader headerLeft={{ showHeaderLeft: true }} headerTitle={{ title: "USDT ERC20", showTitle: true }} />
    <main className="w-full h-screen ">
      <Layout className="!pt-4">
        <div className='space-y-4 mt-4'>
          <form onSubmit={formik.handleSubmit} className='space-y-2'>

          <Input placeholder='Enter wallet address' {...formik.getFieldProps("wallet")} />
          <div>
            <H2 className='!text-[16px] text-black/80'>Instructions for binding ERC20 wallet Addresses:</H2>
            <Text className='text-[17px] !text-black/70'>
              1. The ERC20 network address starts with the number "0", please check if your wallet address is correct.
            </Text>
            <Text className='text-[17px] !text-black/70'>
              2. If the address you have bound is incorrect, you can contact the customer service to rebind.
            </Text>
          </div>
          <Button className='bg-main-color w-full' title={formik.isSubmitting ? <Spinner /> : "Bind Address"} type='submit' />
          </form>
          </div>
        </Layout>
        </main>
          </>
  )
}

export default page