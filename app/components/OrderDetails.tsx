import React from 'react'
import useCollection from './hooks/UseCollection'
import Text from './Text'
import { auth } from '@/db/firebaseConfig'

// OrderDetails.tsx


const OrderDetails = ({ order }: { order: { [key: string]: any } }) => {
    const [reservations] = useCollection(`reservations/${auth.currentUser?.uid}/reservationDatas`)
  
    return (
      <div>
        <Text className='text-[17px] !text-black/70'>Order Id: {order?.order_id}</Text>
        <Text className='text-[17px] !text-black/70'>Order time: {new Date(order?.date.toDate()).toLocaleDateString(undefined, { day: "2-digit", weekday: "short", month: "short", minute: "2-digit", second: "2-digit", year: "numeric" })}</Text>
        <Text className='text-[17px] !text-black/70'>Prix: EUR{order?.proximate} x 1</Text>
        <div className='flex justify-between'>
          <Text className='text-[17px] !text-black/70'>Commission: <strong>EUR {order?.price}</strong></Text>
          <Text className='text-[17px] text-red-600'>{order?.index? order?.index : reservations?.length} x Commission </Text>
        </div>
      </div>
    )
  }
  
export default OrderDetails