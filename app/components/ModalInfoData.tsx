import { useRouter } from 'next/navigation'
import React from 'react'
import Text from './Text'



const ModalInfoData = ({ setOpenErrorModal, text }: { setOpenErrorModal: React.Dispatch<React.SetStateAction<boolean>>, text: string}) => {
    const router = useRouter()
    return (<div className="flex justify-center items-center w-full flex-col">
      <div className="w-full flex justify-center items-center h-24"><Text className="text-center text-[17px]">{text}</Text></div>
      <div className="flex gap-28 mb-2 *:uppercase *:transition-colors *:ease-linear *:duration-400">
        <button className="hover:text-yellow-500" onClick={() => setOpenErrorModal(false)}>No</button>
        <button className="hover:text-yellow-500" onClick={() => router.push("/main/customerService")}>Yes</button>
      </div>
    </div>)
  }
  

export default ModalInfoData