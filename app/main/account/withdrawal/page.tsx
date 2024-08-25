"use client"
import Button from '@/app/components/Buttons'
import Input from '@/app/components/Input'
import Layout from '@/app/components/Layout'
import NavHeader from '@/app/components/NavHeader'
import Spinner from '@/app/components/Spinner'
import Text from '@/app/components/Text'
import React, { useCallback, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSnackbar } from "notistack"
import { addDoc, collection, doc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "@/db/firebaseConfig";
import formatCurrency from "@/utils/converter";
import WithdrawalMethod from '@/app/components/WithdrawalMethod'
import useValidationError from '@/app/components/hooks/UseValidationError'
import useGetDocument from '@/app/components/hooks/UseDocument'
import Axios from 'axios'
import { createTransaction, genarateRandomFiveDigit, transData } from '@/utils/helpers'
import { User } from 'firebase/auth'
import useCollection from '@/app/components/hooks/UseCollection'
import NoticeModal from '@/app/components/NoticeModal'
import BottomSheetModal from '@/app/components/BottomSheetModal'
import Image from 'next/image'
import Link from 'next/link'

const WithdrawalPage = () => {
  const [currentUser] = useGetDocument("users", auth.currentUser?.uid || "6rfg");
  const [reservations] = useCollection(`reservations/${auth.currentUser?.uid}/reservationDatas`)
  const { enqueueSnackbar } = useSnackbar();
  const [openModal, setOpenModal] = useState(false);
  const [currencyRate, setCurrencyRate] = useState(0)
  const [openBottomSheet, setOpenBottomSheet] = useState(false)
  const [genCode, setGenCode] = useState(genarateRandomFiveDigit())

  const formikWpassword = useFormik({
    initialValues: {
      withdrawalPassword: "",
      graphicCode: ""
    },
    validationSchema: Yup.object({
      withdrawalPassword: Yup.string()
        .min(3, 'Withdrawal Password must be at least 3 characters')
        .required('Withdrawal Password required'),
      graphicCode: Yup.string().length(5).trim().required(),
    }),
    onSubmit: async (values) => {

      if (values.withdrawalPassword !== currentUser?.withdrawalPassword) {
        return enqueueSnackbar("Incorrect withdrawal password", { variant: "error" })
      }
      //deduct the withdrawal request amount from the main balance
      const newBalance = currentUser?.commission - Number(formik.values.withdrawalAmount)
      try {
        await addDoc(
          collection(
            db,
            `withdrawals/${auth.currentUser?.uid}/withdrawalDatas`
          ),
          {
            ...values,
            uid: auth.currentUser?.uid,
            date: serverTimestamp(),
          }
        );

        await createTransaction(auth.currentUser as User, transData(Number(formik.values.withdrawalAmount), "deducted", "Made a withdrawal", currentUser?.commission))

        await updateDoc(doc(db, `users/${auth.currentUser?.uid}`), {
          commission: newBalance
        })
        setOpenBottomSheet(false)
        formik.resetForm()
        formikWpassword.resetForm()
        enqueueSnackbar("Your withdrawal request has been sent successfully. Wait while it is processed.", { variant: "success", autoHideDuration: 8000 })
      } catch (err) {
        enqueueSnackbar("Error processing your request");
      }
    }
  })

  const formik = useFormik({
    initialValues: {
      withdrawalAmount: "",
      withdrawalAddress: "none",
      withdrawalType: "",
    },
    validationSchema: Yup.object({
      withdrawalType: Yup.string()
        .oneOf(["usdt-erc20", "usdt-trc20", "revolut"])
        .required(),
      withdrawalAddress: Yup.string().required(),
      withdrawalAmount: Yup.number().required(),
    }),
    onSubmit: async (values) => {
      if (values.withdrawalAddress === "none") {
        formik.resetForm();
        return setOpenModal(true);
      }
      if (!reservations.every(each => each.status === "success")) {
        formik.setSubmitting(false);
        return enqueueSnackbar(
          "You currently have a pending order please complete all orders to continue.", { variant: "info" }
        );
      }
      if (currentUser?.commercialAds?.show) {
        formik.setSubmitting(false);
        return enqueueSnackbar(
          "You currently have a pending commercial Ads order.", { variant: "info" }
        );
      }
      if (currentUser?.commission < 1) {
        formik.setSubmitting(false);
        return enqueueSnackbar("Low or no balance for withdrawal", { variant: "error" });
      }
      //check if the withdrawal AMOUNT is greater than the main balance
      if (currentUser?.commission < Number(values.withdrawalAmount) + 1) {
        formik.setSubmitting(false);
        return enqueueSnackbar("Insufficient balance", { variant: "error" });
      }
      formik.setSubmitting(false)
      return setOpenBottomSheet(true)

    },
  });

  const { getFieldProps, values, handleSubmit, isSubmitting } = formik;

  // useEffect(() => {
  //   if (Object.keys(errors).length > 0 && isSubmitting && !isValidating) {
  //     enqueueSnackbar(errors[Object.keys(errors)[0] as keyof typeof values]);
  //   }
  // }, [isValidating]);
  useValidationError(formik)
  useValidationError(formikWpassword)

  useEffect(() => {
    (async () => {
      const res = await Axios.get("https://min-api.cryptocompare.com/data/price?fsym=EUR&tsyms=USDT")
      setCurrencyRate(res.data.USDT)
    })()
  }, [values.withdrawalAmount])

  const genGraphicCode = useCallback(() => {
    const code = genarateRandomFiveDigit()
    setGenCode(code)
  }, [])

  return (
    <>
      <NavHeader headerLeft={{ showHeaderLeft: true }} headerTitle={{ title: "Withdrawal", showTitle: true }} />
      <main className="w-full h-screen">
        <Layout className="!pt-0">
          <form onSubmit={handleSubmit} className="mb-10">
            <div className="shadow-sm  rounded-xl" >
              <div className="bg-cover bg-center py-4 px-2 w-full h-full" style={{ backgroundImage: "url(/img/withdrawal-bal-bg1.png)" }}>

                <Text className="font-bold text-[15px]">Total Balance</Text>
                <Text className="text-bold text-[20px] !text-black/70">{formatCurrency(Number(currentUser?.assetBalance + currentUser?.commission) ?? 0)}</Text>
              </div>
            </div>
            <div className="space-y-3">
              <Text className="!mt-3 !text-black/70">Collection Address</Text>
              <WithdrawalMethod currentUser={currentUser} type='usdt-trc20' label='USDT TRC20' imageSrc='/img/usdt-new.png' values={formik.values} setFieldValue={formik.setFieldValue} />
              <WithdrawalMethod currentUser={currentUser} type='usdt-erc20' label='USDT ERC20' imageSrc='/img/usdt-new.png' values={formik.values} setFieldValue={formik.setFieldValue} />
              <WithdrawalMethod currentUser={currentUser} type='revolut' label='REVOLUT' imageSrc='/img/revolut.png' values={formik.values} setFieldValue={formik.setFieldValue} />
            </div>
            <div className="space-y-2 mt-2">
              <Text className="!text-black/70 text-[17px]">Withdrawal Address</Text>
              <span className="!bg-red-100 text-[14px] inline-block px-2 py-px rounded-sm">{values.withdrawalAddress}</span>
              <div className="space-y-2">
                <label className="!text-black/70 text-[17px]" htmlFor="amount">Withdrawal Amount</label>
                <div className="flex gap-4 items-center bg-main-gray/50 px-2 rounded-xl">
                  €<Input className="bg-transparent" type="number" placeholder="Enter your Amount" id="amount" {...getFieldProps("withdrawalAmount")} />
                </div>
                <span className="inline-block px-1 py-px text-[14px] bg-red-100 rounded-sm">{formatCurrency(Number(values?.withdrawalAmount) || 0)} = USDT {currencyRate * Number(values?.withdrawalAmount)}</span>
                <Text className="!text-black/70">Service Charge: {formatCurrency(0)}</Text>
                <Text className="!text-black/70 !text-[17px]">Total Assets: {formatCurrency(Number(values?.withdrawalAmount) || 0)}</Text>
              </div>
              <Button className="w-full bg-main-color" type="submit" title={isSubmitting ? <Spinner /> : "Withdraw Now"} />
            </div>
          </form>
          <NoticeModal noticeModal={openModal} setNoticeModal={setOpenModal} message={`Please bind your ${values.withdrawalType} wallet address`} />
        </Layout>
      </main>
      <BottomSheetModal
        wrapperClassName='!p-4'
        open={openBottomSheet}
        onClose={() => setOpenBottomSheet(false)}
      >
        <div className='space-y-6 py-4 w-full'>
          <form onSubmit={formikWpassword.handleSubmit} className='space-y-6'>

            <div className='flex justify-between items-center w-full rounded-full bg-main-gray/50'>
              <Input
                className='!bg-transparent !w-[81%]'
                id="password"
                placeholder='Enter withdrawal password'
                error={formikWpassword.touched.withdrawalPassword && formikWpassword.errors.withdrawalPassword}
                {...formikWpassword.getFieldProps("withdrawalPassword")}
              />
              <Link className='min-w-[17%]  text-main-color mr-1 md:mr-0' href={"setting/withdrawalPassword"}>Get One?</Link>
            </div>
            <div className='flex justify-between items-center w-full rounded-full bg-main-gray/50'>

              <Input
                className='!bg-transparent !w-[81%] !text-[14px] placeholder:!text-[14px]'
                error={formikWpassword.touched.graphicCode && formikWpassword.errors.graphicCode}
                placeholder='Enter graphic code'
                value={formikWpassword.values.graphicCode}
                onChange={(e) => {
                  if (e.target.value.length <= 5) formikWpassword.setFieldValue("graphicCode", e.target.value)
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
              title={formikWpassword.isSubmitting ? <Spinner /> : "Proceed"}
              type='submit'
              disabled={formikWpassword.isSubmitting}
            />
          </form>
        </div>
      </BottomSheetModal>
    </>
  );
};

export default WithdrawalPage;