import React from 'react'
import Modal from './Modal'
import Text from './Text'
import { useRouter } from 'next/navigation'

type NoticeModalType = {
    setNoticeModal: React.Dispatch<React.SetStateAction<boolean>>
    noticeModal: boolean
    message: string
}

function NoticeModal({setNoticeModal, noticeModal, message}: NoticeModalType) {
 const router = useRouter()
  return (
    <Modal title="Notice" classes={{ modalContentClassName: "bg-white min-h-28 !p-0", headerClassName: { buttonClassName: "hidden", titleClassName: "uppercase bg-yellow-600 text-white w-full text-center py-2" } }} placement="center" open={noticeModal} onClose={() => setNoticeModal(false)}>
    <div className="flex justify-center items-center w-full flex-col">
      <div className="w-full flex justify-center items-center h-24"><Text className="text-center text-[17px]">{message}</Text></div>
      <div className="flex gap-28 mb-2 *:uppercase *:transition-colors *:ease-linear *:duration-400">
        <button className="hover:text-yellow-500" onClick={() => setNoticeModal(false)}>No</button>
        <button className="hover:text-yellow-500" onClick={() => router.push("customerService")}>Yes</button>
      </div>
    </div>
  </Modal>
  )
}

export default NoticeModal