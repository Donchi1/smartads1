import React, { useEffect, useState } from 'react'
import useGetDocWithClause from './UseGetDocWithClause';
import { auth, db } from '@/db/firebaseConfig';
import { addDoc, collection, doc, DocumentData, getDoc, serverTimestamp, updateDoc } from 'firebase/firestore';
import useCollection from './UseCollection';
import useGetDocument from './UseDocument';
import { checkOrderType, generateRandomSevenDigit, getFirstThreeParagraphs } from '@/utils/helpers';
import axios from 'axios';
import { description } from '@/utils/constants';
import { enqueueSnackbar } from 'notistack';

function useReservations() {
  const [commercialAds] = useGetDocWithClause({ colls: `reservations/${auth.currentUser?.uid}/reservationDatas`, q: { path: "type", condition: "==", value: "commercial" } })
  const [goldenEgg] = useGetDocWithClause({ colls: `reservations/${auth.currentUser?.uid}/reservationDatas`, q: { path: "type", condition: "==", value: "goldenEgg" } })
  const [count, setCount] = useState<number>(3);
  const [openModal, setOpenModal] = useState(false)
  const [reservations, isLoading] = useCollection(`reservations/${auth.currentUser?.uid}/reservationDatas`)

  const [currentUser] = useGetDocument("users", auth.currentUser?.uid || "uhuih")

  const [openModalHotel, setOpenModalHotel] = useState(false)
  const [hotelData, setHotelData] = useState<DocumentData | null | undefined>(null)

  const [openErrorModal, setOpenErrorModal] = useState(false)
  const [openErrorModal1, setOpenErrorModal1] = useState(false)
  const [openAccountModal, setOpenAccountModal] = useState(false)


  useEffect(() => {
    const getHotelData = async () => {
      if (openModal) {

        if (count > 0) {
          setOpenModal(true)
          const timerId = setTimeout(() => {
            setCount(count - 1);
          }, 1000); // 1 second delay

          return () => clearTimeout(timerId); // Clean up the timeout on unmount
        } else {
          if (
            !(currentUser?.assetBalance >= 50) &&
            !(currentUser?.trialBonus >= 50) &&
            !(currentUser?.freezedAmount >= 50)
          ) {
            setOpenModal(false);
            setCount(3);
            return setOpenErrorModal1(true);
          }
          if (reservations.length === 33) {
            setOpenModal(false)
            setCount(3)
            return setOpenErrorModal(true)
          }

          if (currentUser?.assetBalance >= 50) {
            await updateDoc(doc(db, "users", auth.currentUser?.uid as string), {
              freezedAmount: currentUser?.assetBalance,
              assetBalance: 0
            })
          }

          if (commercialAds.length > 0) {
            setCount(3)
            setOpenModal(false)
            setHotelData(commercialAds[0])
            return setOpenModalHotel(true)
          }
          if (goldenEgg.length > 0) {
            setCount(3)
            setOpenModal(false)
            setHotelData(goldenEgg[0])
            return setOpenModalHotel(true)
          }

          const options = {
            method: 'GET',
            url: 'https://booking-com.p.rapidapi.com/v1/hotels/data',
            params: {
              hotel_id: generateRandomSevenDigit(),
              locale: 'en-gb'
            },
            headers: {
              'x-rapidapi-key': process.env.RAPID_API_KEY,
              'x-rapidapi-host': process.env.RAPID_API_HOST
            }
          };

          try {
            const { data } = await axios.request(options);
            const info = {
              name: data.name,
              description: getFirstThreeParagraphs(data?.description_translations ? data?.description_translations[0]?.description : description),
              country: data.country,
              city: data.city,
              ranking: data.review_nr,
              remark: data.review_score_word || "Best in town",
              address: data.address,
              order_id: data.hotel_id,
              main_photo_url: data.main_photo_url.replace("square60", "max1280x900"),
              proximate: 1430,

            }

            const mPrice = data?.review_score ? data.review_score / 2 : 0.55
            //create reservation in the database
            const { id } = await addDoc(collection(db, `reservations/${auth.currentUser?.uid}/reservationDatas`), {
              ...info,
              price: checkOrderType(currentUser) === "commercial" ? currentUser?.commercialAds.price : Number(mPrice),
              date: serverTimestamp(),
              uid: auth.currentUser?.uid,
              status: "pending",
              comments: [],
              type: checkOrderType(currentUser),
              user: {
                email: currentUser?.email,
                photo: currentUser?.photo
              },
              rating: 0,
            })

            const docInfo = await getDoc(doc(db, "reservations", auth.currentUser?.uid as string, "reservationDatas", id))
            setHotelData({ ...docInfo.data(), id: docInfo.id })
            setOpenModal(false)
            setOpenModalHotel(true)
            setCount(0)

          } catch (error: any) {
            setCount(0)
            enqueueSnackbar("Something went wrong matching orders for you", { variant: "error" });
          }
        }
      }
    }
    getHotelData()
  }, [count, openModal]);


  return ({ hotelData, openModal, reservations, isLoading, currentUser, setOpenModalHotel, setCount, setOpenAccountModal, count, openErrorModal, setOpenErrorModal, setOpenModal, setOpenErrorModal1, openErrorModal1, openAccountModal, openModalHotel })
}

export default useReservations