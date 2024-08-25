"use client"
import BottomTab from '@/app/components/BottomTab'
import Button from '@/app/components/Buttons'
import Layout from '@/app/components/Layout'
import Loading from '@/app/components/Loading'
import Text from '@/app/components/Text'
import useGetDocument from '@/app/components/hooks/UseDocument'
import { auth } from '@/db/firebaseConfig'
import { accountLinks } from '@/utils/constants'
import formatCurrency from '@/utils/converter'
import { maskPhoneNumber } from '@/utils/helpers'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useSnackbar } from 'notistack'
import React from 'react'
import { FaChevronRight, FaCopy } from 'react-icons/fa'

function page() {
  const { enqueueSnackbar } = useSnackbar()
  const router = useRouter()
  const [user, isLoading] = useGetDocument("users", auth.currentUser?.uid || "ghuh")

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        enqueueSnackbar('Copied!', {variant: "success"});
      })
      .catch((err) => {
        enqueueSnackbar('Failed to copy!', {variant: "error"});
        console.error('Failed to copy: ', err);
      });
  };
  if(isLoading){
    return <Loading/>
  }
  return (
    <>
    <main className='min-h-screen w-full'>
      <Layout className='!p-0' innerClassName='!w-full'>
        <div className='h-[40vh] lg:h-[50vh] w-full bg-top  bg-cover -mb-4 bg-no-repeat' style={{backgroundImage: "url(/img/account_bg.png)"}}>
          {/* <Image className='max-w-full w-full h-full ' width={400} height={500} src={"/img/account_bg.png"} alt='account' /> */}
        </div>
        <div className='bg-white rounded-xl z-10 space-y-8 lg:mb-[13vh] mb-[12vh]'>
          <div className='w-[95%] mx-auto space-y-4'>
            <div className='space-y-2'>
            <div className='flex gap-4 items-center'>
              <Link href={"/main/profile"}>
            <Image className='size-[4rem] rounded-full' width={200} height={200} src={user?.photo || "/img/account-user.png"} alt="User" />
              </Link>
            <div className='space-y-px'>
            <Link href={"/main/profile"}>
            <Text className='flex !items-center gap-1 !text-black/80 !font-bold'>
              {maskPhoneNumber(user?.phoneNumber, 4)}<span><FaChevronRight/></span>
            </Text>
            </Link>
            <Text className='flex !items-center gap-1'>
              UID:{user?.phoneNumber.slice(0,5)} <span onClick={() => copyToClipboard(user?.phoneNumber)}><FaCopy/></span>
            </Text>
            </div>
            </div>
            <div className='flex justify-between items-center'>
            <Text className='!text-black text-[1rem]'>Account Balance: {formatCurrency(user?.assetBalance)}</Text>
            <Text className='!text-black/70 text-[1rem]'>Reset Times: {user?.totalResets}</Text>
            </div>
            

            </div>
          <div className='w-full'>
            <div className='flex justify-between items-center w-[90%] mx-auto'>
              <Link href={"customerService"}>
                <Image className='h-10 w-full'  height={100} width={100} src={"/img/depoen.png"} alt='deposit' />
              </Link>
              <Link href={"account/withdrawal"}>
                <Image className='h-10 w-full'  height={100} width={100} src={"/img/withen.png"} alt='withdrawal' />
              </Link>
            </div>
            </div>
            <div className='flex items-center justify-between'>
              {accountLinks.top.map(({img,link}) => (
                <Link key={link} href={link}>
                  <Image className='w-20' height={100} width={100} src={img} alt={link} />
                </Link>
              ))}
            </div>
          </div>
          <div className='w-[95%] mx-auto mb-4' >
            <div 
            className='grid grid-cols-2 grid-rows-subgrid  '>
              {accountLinks.bottom.map(({img,link,onClick, title}) =>(
              <Link className='border-t border-b border-main-gray py-2 even:border-l odd:pr-5 even:pl-5' key={link} href={link} onClick={() => onClick && onClick(router)} >
                <Image className='w-10' height={100} width={100} src={img} alt={link} />
                <div className='flex justify-between items-center mt-2 !'>
                 <Text className='text-center'>{title}</Text>
                 <span><FaChevronRight size={12} /></span>
                </div>
              </Link>
              ))}
            </div>
          </div>
        </div>
      </Layout>
      
    </main>
    <BottomTab />
    </>
  )
}

export default page