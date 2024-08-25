import Link from 'next/link'
import React from 'react'
import H2 from './H2'
import { FaChevronRight } from 'react-icons/fa'
import { useRouter } from 'next/navigation'

function LinkInfoDisplay({ href, title }:{href:string, title: string}) {
  const router = useRouter()

  const handleRouting = (link:string) => {
    console.log(link)
    //if(link === "setting/language") return window.location.assign("setting/language")
     router.push(link)
 }
  return (
        <div onClick={() => handleRouting(href)} className="flex justify-between items-center cursor-pointer border-b border-main-gray py-4">
          <H2 className="!text-[16px] text-black/70">{title}</H2>
          <FaChevronRight size={12} />
        </div>
      )
}

export default LinkInfoDisplay