"use client"
import AccountModal from '@/app/components/AccountModal'
import BottomTab from '@/app/components/BottomTab'
import Button from '@/app/components/Buttons'
import CommentCheckbox from '@/app/components/CommercialCheckBox'
import H2 from '@/app/components/H2'
import useCollection from '@/app/components/hooks/UseCollection'
import useGetDocument from '@/app/components/hooks/UseDocument'
import useGetDocWithClause from '@/app/components/hooks/UseGetDocWithClause'
import useReservations from '@/app/components/hooks/useReservations'
import Layout from '@/app/components/Layout'
import Loading from '@/app/components/Loading'
import Modal from '@/app/components/Modal'
import ModalInfoData from '@/app/components/ModalInfoData'
import OrderDetails from '@/app/components/OrderDetails'
import Rating from '@/app/components/Rating'
import Spinner from '@/app/components/Spinner'
import Text from '@/app/components/Text'
import { auth, db } from '@/db/firebaseConfig'
import { calCulateDivident, createTransaction, filteredComments, getFirstThreeParagraphs, transData } from '@/utils/helpers'
import { User } from 'firebase/auth'
import { collection, doc, DocumentData, getDocs, updateDoc } from 'firebase/firestore'
import { useFormik } from 'formik'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useSnackbar } from 'notistack'
import React, { useState } from 'react'
import * as Yup from "yup"




function Page() {
  const { enqueueSnackbar } = useSnackbar()
  const router = useRouter()
  const [finalOrderForm, setfinalOrderForm] = useState(false)
  const { 
    hotelData, 
    openAccountModal, 
    setCount, 
    setOpenModalHotel, 
    setOpenErrorModal1, 
    openErrorModal1, 
    setOpenAccountModal, 
    setOpenErrorModal, 
    count, 
    isLoading,
    reservations,
    currentUser, 
    openErrorModal, 
    openModal, 
    openModalHotel, 
    setOpenModal } = useReservations()



  const formik = useFormik({
    initialValues: {
      rating: 0,
      comments: {
        'excellent stay': false,
        'amazing hotel and staff': false,
        'fresh and clean, well maintained': false,
        'exceptional': false,
        'value in line with expectations': false
      },
    },
    validationSchema: Yup.object({
      comments: Yup.mixed().required(),
      rating: Yup.number().required(),
    }),
    onSubmit: async (values) => {
      try {
        await updateDoc(doc(db, "reservations", auth.currentUser?.uid as string, "reservationDatas", hotelData?.id), {
          rating: values.rating,
          comments: Object.keys(filteredComments(values.comments)),
          type: hotelData?.type === "goldenEgg" ? "normal" : hotelData?.type,
          status: "success"
        })
        const docRef = doc(db, "users", auth.currentUser?.uid as string)
        const res = (await getDocs(collection(db, "reservations", auth.currentUser?.uid as string, "reservationDatas")))?.docs
        const updatedReservations: DocumentData[] = res.map(each => ({ ...each.data(), id: each.id }))


        if (updatedReservations?.length === 33) {
          if (currentUser?.freezedAmount >= 50 && updatedReservations.every(each => each.status === "success")) {
            await updateDoc(docRef, {
              assetBalance: currentUser?.freezedAmount,
              freezedAmount: 0
            })
          }
          //check if the user is making order with trial bonus
          if (currentUser?.trialBonus === 300) {
            //if yes, then make it to be 0
            await updateDoc(docRef, {
              trialBonus: 0
            })
            //create a transation in the history
            await createTransaction(auth.currentUser as User, transData(currentUser?.trialBonus, "deducted", "Trial bonus deducted", currentUser?.trialBonus))
          }
        }
        await updateDoc(docRef, {
          commission: calCulateDivident(hotelData) + currentUser?.commission,
          "goldenEgg.show": hotelData?.type === "goldenEgg" ? false : currentUser?.goldenEgg.show,
          "goldenEgg.price": hotelData?.type === "goldenEgg" ? 0 : currentUser?.goldenEgg.price
        })
        formik.resetForm()
        enqueueSnackbar(
          "Order completed",
          {
            variant: "success",
            onClose: () => {
              setOpenModalHotel(false)
              setOpenModal(false)
              setfinalOrderForm(false)
              setCount(0)
            }
          })
      } catch (error) {

        formik.setSubmitting(false)
        setOpenModal(false)
        setCount(3)
        enqueueSnackbar("There was an error completing your order.", { variant: "error" })
      }

    },
  })


  const handleBooking = () => {
    setOpenModal(true)
  }




  const handleContact = () => {
    setOpenModal(false)
    setOpenModalHotel(false)
    setCount(3)
    router.push("/main/customerService")

  }

  if(isLoading) return <Loading/>

  return (
    <>
      <header className={` max-w-full flex justify-center items-center lg:max-w-lg mx-auto sticky top-0 min-h-[8vh]  bg-white `}>
        <div className='w-[96%] mx-auto'>
          <Image className='w-24' width={100} height={200} src={"/img/logo-ads.png"} alt='logo' />
        </div>
      </header>
      <main className="w-full h-screen">
        <Layout className="!pt-0 !px-0 " innerClassName='!w-full !mb-[12vh] !relative'>
          <div className='h-[45vh] lg:h-[70vh] -mb-[5rem]'>
            <Image onClick={handleBooking} className='w-full h-full' width={500} height={600} src={"/img/make-booking.gif"} alt='make booking' />
          </div>
          <div className='bg-white rounded-t-2xl pt-4 px-2 space-y-4 absolute w-full'>
            <div className='space-y-6'>
              <Image className='w-20' width={100} height={100} src={"/img/google-logo.png"} alt='google logo' />
              <div>
                <Text className='!text-black/70'>Google search Center offers a variety of SEO resources that can healp you get your site to show up in Google search results.</Text>
                <Text className='!text-black/70'>Order received today: {reservations?.length}</Text>
              </div>
            </div>
            <div className='grid grid-cols-3 grid-rows-subgrid gap-4'>
              <Link href={"/main/customerService"} className='rounded-xl cursor-pointer flex justify-center flex-col items-center py-2 gap-2 bg-[#feeeee]'>
                <Image className='size-[40px]' width={100} height={100} src={"/img/icon-bulb.png"} alt="Contact" />
                <Text className='!text-black/70'>Contact Us</Text>
              </Link>
              <Link href={"reservation/record"} className='rounded-xl cursor-pointer flex justify-center flex-col items-center py-2 gap-2 bg-[#e1f1fe]'>
                <Image className='size-[40px]' width={100} height={100} src={"/img/icon-paper.png"} alt="orders" />
                <Text className='!text-black/70'>Orders</Text>
              </Link>
              <div onClick={() => setOpenAccountModal(true)} className='rounded-xl cursor-pointer flex justify-center flex-col items-center py-2 gap-2 bg-[#f5f2eb]'>
                <Image className='size-[40px]' width={100} height={100} src={"/img/icon-copy.png"} alt="Account" />
                <Text className='!text-black/70'>Account</Text>
              </div>
            </div>
            <div className='space-y-2'>
              <Text className='!text-black/70'>New Vacation Home compound report for all search results in search console.</Text>
              <Image src={"/img/reports.png"} alt="report" width={400} height={500} className=' object-cover w-full' />
            </div>
          </div>
        </Layout>
        <Modal
          classes={{
            modalContentClassName: "bg-white min-h-52 min-w-md !px-0 !pt-2",
            headerClassName: {
              buttonClassName: "hidden",
            }
          }} placement="center" open={openModal} onClose={() => {
            setOpenModal(false)
            setCount(0)
          }}>
          <div className="flex justify-center items-center w-full flex-col ">
            <div className="w-full flex justify-center items-center ">
              <Image className='w-[400px] h-[180px]' width={300} height={500} src={"/img/loading.gif"} alt='booking' />
            </div>
            <div className="flex gap-2 flex-col mb-2 items-center justify-center *:transition-colors *:ease-linear *:duration-400">
              <Text className="text-center !text-black/70 !text-[17px] ">Matching realtime ads order for you</Text>
              <Text className='!text-black/70 !text-[17px]'><span className='text-main-color'>{count}</span>s</Text>
            </div>
          </div>

        </Modal>
        <Modal
          showFooter
          classes={{
            modalContentClassName: "!relative min-h-52 lg:!max-w-lg w-full !px-0 !py-0",
            headerClassName: {
              buttonClassName: "hidden",
            }
          }} placement="center" open={openModalHotel} onClose={() => {
            setOpenModalHotel(false)
            setCount(3)
          }}>

          <div className="relative">
            {hotelData?.type === "commercial" && <div >
              <Image className='w-full h-[400px]' width={300} height={400} src={"/img/commercial-trophy.gif"} alt='commercial-ads' />
              <div className='px-2 mb-4'>
                <H2 className='!text-[20px] !text-red-600'>Congratulation, You got a commercial Ads</H2>
                <H2 className='!text-[17px]'>You will get 9X commission on this current order.</H2>
                <H2 className='!text-[17px]'>Commission: <span className='text-green-700'>EUR{hotelData?.price} x 9</span></H2>
                <Text className='!text-[16px] !text-black/90'>Please contact customer service to help you clear this order.</Text>
                <Button className='w-full mt-2 bg-main-color cursor-pointer' title={"Customer Service"} onClick={handleContact} />
              </div>
            </div>}
            {hotelData?.type === "goldenEgg" && <div >
              <Image className='w-full h-[400px]' width={300} height={400} src={"/img/golden-egg.png"} alt='commercial-ads' />
              <div className='px-2 mb-4'>
                <H2 className='!text-[20px] !text-red-600'>Congratulation, You got a Golden Egg Ads</H2>
                <H2 className='!text-[17px]'>You will get 3X commission on this current order.</H2>
                <H2 className='!text-[17px]'>Commission: <span className='text-green-700'>EUR{hotelData?.price} x 3</span></H2>
                <Text className='!text-[16px] !text-black/90'>Please contact customer service to help you clear this order.</Text>
                <Button className='w-full mt-2 bg-main-color cursor-pointer' disabled={finalOrderForm} title={"book now"} onClick={() => setfinalOrderForm(true)} />
              </div>
            </div>}
            {hotelData?.type === "normal" && <>
              <div className="w-full flex justify-center items-center ">
                <Image className='w-full h-[180px]' width={300} height={500} src={hotelData?.main_photo_url} alt='booking' />
              </div>
              <div className=" my-2 px-2 space-y-4">

                <Text className=" !text-black/90 uppercase !text-[16px] !font-bold ">{hotelData?.name}</Text>
                <Text className=" !text-black/90 !text-[16px] ">{hotelData && getFirstThreeParagraphs(hotelData?.description)}</Text>

                <div className='space-y-1 mt-2 [&_strong]:uppercase *:!text-[14px]'>

                  <Text className=" !text-black/90 !text-[16px] "><strong>Country:</strong> {hotelData?.country}</Text>
                  <Text className=" !text-black/90 !text-[16px] "><strong>City:</strong> {hotelData?.city}</Text>
                  <Text className=" !text-black/90 !text-[16px] "><strong>Ranking:</strong> {hotelData?.ranking}</Text>
                  <Text className=" !text-black/90 !text-[16px] "><strong>Remark:</strong> {hotelData?.remark}</Text>
                  <Text className=" !text-black/90 !text-[16px] "><strong>Address:</strong> {hotelData?.address}</Text>

                </div>
                <div className=''>

                  <Button className='w-full bg-main-color cursor-pointer' disabled={finalOrderForm} title={"book now"} onClick={() => setfinalOrderForm(true)} />
                </div>
              </div>
            </>}
          </div>
          {finalOrderForm && <div className='absolute top-0 left-0 right-0 bottom-0 w-full p-4 bg-gray-400/90  min-h-48'>
            <form onSubmit={formik.handleSubmit} className='bg-gray-300 rounded-xl  p-3 space-y-4'>
              <OrderDetails order={hotelData as any} />
              <div>
                <Text className='!text-[17px] !text-red-600 font-bold'>Hello give us a rating of this hotel</Text>
                <div>
                  {Object.keys(formik.values.comments).map((comment) => (
                    <CommentCheckbox key={comment} label={comment} onChange={() => formik.setFieldValue(`comments.${comment}`, !formik.values.comments[comment as keyof typeof formik.values.comments])}
                      checked={formik.values.comments[comment as keyof typeof formik.values.comments]} />
                  ))}
                  <div className='flex gap-6 items-center'>

                    <Rating onRate={(rating) => formik.setFieldValue("rating", rating)} rating={formik.values.rating} />
                    <H2>{formik.values.rating}/5</H2>
                  </div>
                </div>
                <div className='mt-2'>

                  <Button className='w-full bg-main-color cursor-pointer' title={formik.isSubmitting ? <Spinner /> : "Complete Order"} type='submit' />
                </div>
              </div>
            </form>
          </div>}
        </Modal>

        <AccountModal openAccountModal={openAccountModal} setOpenAccountModal={setOpenAccountModal} />

        <Modal title="Notice" classes={{ modalContentClassName: "bg-white max-w- min-h-28 !p-0", headerClassName: { buttonClassName: "hidden", titleClassName: "uppercase bg-yellow-600 text-white w-full text-center py-2" } }} placement="center" open={openErrorModal1} onClose={() => setOpenErrorModal1(false)}>
          <ModalInfoData text='Sorry you do not have enough balance you match your orders. Please contact customer service for possible solutions.' setOpenErrorModal={setOpenErrorModal1} />
        </Modal>
        <Modal title="Notice" classes={{ modalContentClassName: "bg-white min-h-28 !p-0", headerClassName: { buttonClassName: "hidden", titleClassName: "uppercase bg-yellow-600 text-white w-full text-center py-2" } }} placement="center" open={openErrorModal} onClose={() => setOpenErrorModal(false)}>
          <ModalInfoData text='You have completed 33 orders, please contact customer service for a reset.' setOpenErrorModal={setOpenErrorModal} />
        </Modal>
      </main>
      <BottomTab />
    </>
  )
}







export default Page