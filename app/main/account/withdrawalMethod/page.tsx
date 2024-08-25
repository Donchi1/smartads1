"use client"
import Layout from '@/app/components/Layout'
import NavHeader from '@/app/components/NavHeader'
import WithdrawalMethod from '@/app/components/WithdrawalMethod'
import { useFormik } from 'formik'
import { useRouter } from 'next/navigation'
import React from 'react'
import * as Yup from "yup"

function Page() {
const router = useRouter()
  const formik = useFormik({
    initialValues: {
      withdrawalType: "",
    },
    validationSchema: Yup.object({
      withdrawalType: Yup.string()
        .oneOf(["usdt-erc20", "usdt-trc20", "revolut"])
        .required()
    }),
    onSubmit: async (values) => {},
  });
  return (
    <>
      <NavHeader headerLeft={{ showHeaderLeft: true }} headerTitle={{ title: "Wallet Binding", showTitle: true }} />
      <main className="w-full h-screen">
        <Layout className="!pt-4">
          <div className='space-y-4 '>
          <WithdrawalMethod onClick={() => router.push(`withdrawalMethod/usdt-trc20`)} type='usdt-trc20' label='USDT TRC20' imageSrc='/img/usdt-new.png' values={formik.values} setFieldValue={formik.setFieldValue} />
          <WithdrawalMethod onClick={() => router.push(`withdrawalMethod/usdt-erc20`)} type='usdt-erc20' label='USDT ERC20' imageSrc='/img/usdt-new.png' values={formik.values} setFieldValue={formik.setFieldValue} />
          <WithdrawalMethod onClick={() => router.push(`withdrawalMethod/revolut`)} type='revolut' label='REVOLUT' imageSrc='/img/revolut.png' values={formik.values} setFieldValue={formik.setFieldValue} />
          </div>
        
          </Layout>
          </main>
    </>
  )
}

export default Page