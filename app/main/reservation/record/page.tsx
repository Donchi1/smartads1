"use client";
import React, {  useState } from "react";
import H2 from "@/app/components/H2";
import useCollection from "@/app/components/hooks/UseCollection";
import Layout from "@/app/components/Layout";
import NavHeader from "@/app/components/NavHeader";
import ReservationRecordData from "@/app/components/ReservationRecordData";
import { auth, db } from "@/db/firebaseConfig";
import Modal from "@/app/components/Modal";
import { collection, doc, DocumentData, getDocs, updateDoc } from "firebase/firestore";
import Image from "next/image";
import Text from "@/app/components/Text";
import Button from "@/app/components/Buttons";
import { useRouter } from "next/navigation";
import { calCulateDivident, createTransaction, filteredComments, getFirstThreeParagraphs, transData } from "@/utils/helpers";
import CommentCheckbox from "@/app/components/CommercialCheckBox";
import Rating from "@/app/components/Rating";
import Spinner from "@/app/components/Spinner";
import OrderDetails from "@/app/components/OrderDetails";
import { useFormik } from "formik";
import { useSnackbar } from "notistack";
import * as Yup from "yup"
import useGetDocument from "@/app/components/hooks/UseDocument";
import { User } from "firebase/auth";
import Loading from "@/app/components/Loading";

function Page() {
  const { enqueueSnackbar } = useSnackbar()
  const router = useRouter()
  const [tab, setTab] = useState(false);
  const [reservations, isLoading] = useCollection(`reservations/${auth.currentUser?.uid}/reservationDatas`);
  const [currentUser] = useGetDocument("users", auth.currentUser?.uid || "uhuih")
  const tabData = tab ? "pending" : "success";
  const filteredReservations = reservations.filter((each) => each.status === tabData);
  const [openModalHotel, setOpenModalHotel] = useState(false)
  const [hotelData, setHotelData] = useState<DocumentData | null>(null)
  const [finalOrderForm, setfinalOrderForm] = useState(false)



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
        //udate the reservation information
      await updateDoc(doc(db, "reservations", auth.currentUser?.uid as string, "reservationDatas", hotelData?.id), {
          rating: values.rating,
          comments: Object.keys(filteredComments(values.comments)),
          type: hotelData?.type === "goldenEgg"? "normal": hotelData?.type,
          status: "success"
        })
        const res = (await getDocs(collection(db, "reservations", auth.currentUser?.uid as string, "reservationDatas")))?.docs
        const updatedReservations:DocumentData[] = res.map(each => ({...each.data(), id: each.id}))
    
        //user document reference
        const docRef = doc(db, "users", auth.currentUser?.uid as string)

        //check if the reservation is already 33 and update the frrezed and the asset Balance
        if(updatedReservations?.length === 33){
          if(currentUser?.freezedAmount >= 50 && updatedReservations?.every(each => each.status === "success")){
            await updateDoc(docRef, {
             assetBalance: currentUser?.freezedAmount,
             freezedAmount: 0
            })
          }
          if(currentUser?.trialBonus === 300 && updatedReservations?.every(each => each.status === "success")){
            await updateDoc(docRef, {
              trialBonus: 0
             })
             await createTransaction(auth.currentUser as User,transData(currentUser?.trialBonus, "deducted","Trial bonus deducted", currentUser?.trialBonus) )
          }
        }
        await updateDoc(docRef, {
          commission: calCulateDivident(hotelData) + currentUser?.commission,
          "goldenEgg.show":hotelData?.type === "goldenEgg"? false: currentUser?.goldenEgg.show,
          "goldenEgg.price":hotelData?.type === "goldenEgg"? 0 : currentUser?.goldenEgg.price
        })
        formik.resetForm()
        enqueueSnackbar(
          "Order completed",
          {
            variant: "success",
            onClose: () => {
              setOpenModalHotel(false)
              setfinalOrderForm(false)
            }
          })
      } catch (error) {
        formik.setSubmitting(false)
        enqueueSnackbar("There was an error completing your order.", { variant: "error" })
      }

    },
  })



  const handleSingleOrder = (id: string, index:number) => {

    const selectedHotelData = reservations.length > 0 ? reservations.find(each => each.id === id) : null;
    setHotelData({...selectedHotelData as DocumentData | null, index}); // Type assertion to DocumentData or null
    setOpenModalHotel(true);
}

  const handleContact = () => {
    setOpenModalHotel(false)
    router.push("/main/customerService")

}
if(isLoading) return <Loading/>

  return (
    <>
      <NavHeader headerLeft={{ showHeaderLeft: true }} headerTitle={{ title: "Order History", showTitle: true }} />
      <main className="w-full h-screen">
        <Layout className="!pt-8 lg:!pt-4">
          <div className="bg-white rounded-t-xl rounded-b-none pb-4">
            <fieldset className="space-y-1">
              <div className="flex items-center gap-8 py-4 px-8 mb-2 rounded-xl shadow-sm">
                {["Completed", "Pending"].map((text, index) => (
                  <div key={index} className="flex flex-col">
                    <p onClick={() => setTab(index === 1)} className="cursor-pointer">{text}</p>
                    <span className={`inline-block w-[4rem] h-1 ${tab === (index === 1) && "bg-main-color"}`}></span>
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                {filteredReservations.length > 0 ? (
                  filteredReservations.map((reservation, index) => (
                    <ReservationRecordData index={index === 0 ? 1 : index} key={reservation.id} record={reservation} handleSingleOrder={handleSingleOrder} />
                  ))
                ) : (
                  <div className="flex justify-center items-center h-[20%]">
                    <H2 className="!text-red-500">No Record</H2>
                  </div>
                )}
              </div>
            </fieldset>
          </div>
        </Layout>
        <Modal
          showFooter
          classes={{
            modalContentClassName: "!relative min-h-52 lg:!max-w-lg w-full !px-0 !py-0",
            headerClassName: {
              buttonClassName: "hidden",
            }
          }} placement="center" open={openModalHotel} onClose={() => {
            setOpenModalHotel(false)
            setfinalOrderForm(false)
            }}>

          <div className="relative">
            {hotelData?.type === "commercial" && <div >
              <Image className='w-full h-[400px]' width={300} height={400} src={"/img/commercial-trophy.gif"} alt='commercial-ads'/>
             <div className='px-2 mb-4'>
              <H2 className='!text-[20px] !text-red-600'>Congratulation, You got a commercial Ads</H2>
              <H2 className='!text-[17px]'>You will get 9X commission on this current order.</H2>
              <H2 className='!text-[17px]'>Commission: <span className='text-green-700'>EUR{hotelData?.price} x 9</span></H2>
              <Text className='!text-[16px] !text-black/90'>Please contact customer service to help you clear this order.</Text>
              <Button className='w-full mt-2 bg-main-color cursor-pointer'  title={"Customer Service"} onClick={handleContact} />
              </div>
            </div>}
            {hotelData?.type === "goldenEgg" && <div >
              <Image className='w-full h-[400px]' width={300} height={400} src={"/img/golden-egg.png"} alt='commercial-ads'/>
             <div className='px-2 mb-4'>
              <H2 className='!text-[20px] !text-red-600'>Congratulation, You got a Golden Egg Ads</H2>
              <H2 className='!text-[17px]'>You will get 3X commission on this current order.</H2>
              <H2 className='!text-[17px]'>Commission: <span className='text-green-700'>EUR{hotelData?.price} x 3</span></H2>
              <Text className='!text-[16px] !text-black/90'>Please contact customer service to help you clear this order.</Text>
              <Button className='w-full mt-2 bg-main-color cursor-pointer'  disabled={finalOrderForm} title={"book now"} onClick={() => setfinalOrderForm(true)} />
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
      </main>
    </>
  );
}

export default Page;