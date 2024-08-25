
import React from 'react'
import H2 from './H2'
import Text from './Text'
import formatCurrency from '@/utils/converter'
import { DocumentData } from 'firebase/firestore'
import { FaChevronRight } from 'react-icons/fa'



const statusStyles = {
    success: "border-green-500 text-green-500",
    failed: "border-red-600 text-red-600",
    pending: "border-yellow-500 text-yellow-500",
    processing: "border-blue-500 text-blue-500", // Added processing condition
  };

function ReservationRecordData({record, handleSingleOrder, index}:{record: DocumentData, handleSingleOrder: (id: string, index:number) =>void, index: number}) {
   
    const pending = record.status === "pending" 

    const handleClick = (id:string, index:number) => pending && handleSingleOrder(id, index)
      return (
        <div onClick={() => handleClick(record.id, index)} key={record.id} className={`border border-main-gray rounded-xl p-2 ${record.status === "pending" && "cursor-pointer"}`}>
        <div className='flex justify-between'>
        <H2 className='!text-[17px] text-black/70'>{record.name}</H2>
        <div>
        <H2 className={`!text-right !text-[17px]`}>{formatCurrency(record.price)}</H2>
         <Text>{new Date(record.date.toDate()).toLocaleDateString(undefined, {
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            year: "numeric",
            month: "short"
         })}</Text>
        </div>
        
        </div>
        <div className='flex justify-between'>
         <Text className='!capitalize'>{record.type} Ads Order</Text>
         <div className='flex items-center gap-2'>
         <Text className={`${statusStyles[record.status as keyof typeof statusStyles]} border rounded-full px-2 py-1 capitalise`}>{record.status}</Text>
         {record.status === "pending" && <FaChevronRight className='!text-black/80' />}
         </div>
        </div>
      </div>
      )
    }
    

export default ReservationRecordData