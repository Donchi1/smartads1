import React from 'react'
import H2 from './H2'
import Text from './Text'
import formatCurrency from '@/utils/converter'
import { DocumentData } from 'firebase/firestore'

function HistoryData({history}:{history: DocumentData}) {
  return (
    <div key={history.id} className='border border-main-gray rounded-xl p-2'>
    <div className='flex justify-between'>
    <H2 className='!text-[17px] text-black/70'>{history.title}</H2>
    <div>
    <H2 className={`!text-right !text-[17px] ${history.type === "funded"? "text-red-500": "text-green-600"}`}>{history.type==="deducted" && "-"}{formatCurrency(history.amount)}</H2>
     <Text>{new Date(history.date.toDate()).toLocaleDateString(undefined, {
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        year: "numeric",
        month: "short"
     })}</Text>
    </div>
    
    </div>
    <div className='flex justify-between'>
     <Text className='!capitalize'>Balance before changes</Text>
     <Text>{formatCurrency(history?.beforeChangeAmount || 0)}</Text>
    </div>
  </div>
  )
}

export default HistoryData