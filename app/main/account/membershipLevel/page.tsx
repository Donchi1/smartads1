"use client"
import H2 from '@/app/components/H2'
import useGetDocument from '@/app/components/hooks/UseDocument'
import Layout from '@/app/components/Layout'
import Loading from '@/app/components/Loading'
import NavHeader from '@/app/components/NavHeader'
import Text from '@/app/components/Text'
import { useAuthStore } from '@/app/store/authStore'
import { auth } from '@/db/firebaseConfig'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

function page() {
  const [currentUser,isLoading] = useGetDocument("users", auth.currentUser?.uid || "uyth")
  const [tab, setTab] = useState(false)

  const tabs = [
    { name: "Gold", level: "gold", description: ["300EUR of trial bonus will be deducted after completing your trial flow."] },
    { name: "Platinum", level: "platinum", description: ["Unlimited withdrawal of any amount.", "Daily sign in and 5 x 2 rounds double Ads rewards daily", "More than 5 times daily account reset. And many more."] },
  ];

  useEffect(() => {
    if (currentUser?.viplevel === "platinum") {
      setTab(true);
    } else {
      setTab(false);
    }
  }, [currentUser]);

  if(isLoading) return <Loading />

  return (
    <section className='w-full h-screen'>
   <Layout innerClassName='!w-full' className='!p-0 !bg-transparent'>

    <div className='bg-center bg-no-repeat bg-cover' style={{backgroundImage: "url(/img/vip-bg.png)"}}>
      <NavHeader outerClassName='!bg-transparent' headerLeft={{ showHeaderLeft: true,headerIcon:{className: {textClass: "!text-white"}, showIcon: true}}} headerTitle={{ title: "LEVEL", showTitle: true, className: "!text-white"}} />
     
        <Layout className="!pt-4 !px-0 !bg-transparent">
          <div className=" rounded-t-xl rounded-b-none pb-4">
            <fieldset className="space-y-1">
              <div className="flex items-center justify-evenly gap-6 p-4 rounded-xl bg-[#2b3676]/60">
                <div className="flex flex-col gap-2 items-center">
                  <p onClick={() => setTab(!tab)} className="cursor-pointer text-white">
                    Gold
                  </p>

                  <span className={`inline-block w-14 h-1 ${!tab && "bg-main-color"}`}></span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <p onClick={() => setTab(!tab)} className="cursor-pointer text-white">
                   Platinum
                  </p>

                  <span className={`inline-block w-14 h-1 ${tab && "bg-main-color"}`}></span>
                </div>

              </div>
              <div className='flex flex-col justify-center items-center h-[60vh]' >
                <div  className={`max-w-full w-full space-y-6  ${!tab ? "block" : "hidden"}`} >
                  <div className='space-y-4 border rounded-xl p-4 border-gray-400'>
                  <H2 className='!text-center text-white'>VIP Level description</H2>
                  {tabs[0].description.map((each, idx) => (

                  <Text className='!text-white !text-[17px]' key={idx}>{each}</Text>
                  ))}
                  </div>
                {currentUser?.viplevel === "gold" && <div className='flex gap-2 bg-[#2b3676]/60 rounded-xl items-center justify-center'>
                    <Text className='text-white text-[17px]'>Current</Text>
                    <span className='bg-white size-10 rounded-full'>

                    <Image className='size-full' width={100} height={100} src={"/img/task-complete.png"} alt='current' />
                    </span>
                  </div>}
                </div>
                <div  className={`w-full max-w-full space-y-6 object-cover ${tab ? "block" : "hidden"}`}  >
                <div className=' border rounded-xl p-4 border-gray-400'>
                  <H2 className='!text-center text-white !mb-4'>VIP Level description</H2>
                  {tabs[1].description.map((each, idx) => (
                  <Text className='!text-white !text-[17px]' key={idx}>{each}</Text>
                  ))}             
                  </div>
                 {currentUser?.viplevel === "platinum" && <div className='flex gap-2 bg-[#2b3676]/60 rounded-xl items-center justify-center'>
                    <Text className='text-white text-[17px]'>Current</Text>
                    <span className='bg-white size-10 rounded-full'>

                    <Image className='size-full' width={100} height={100} src={"/img/task-complete.png"} alt='current' />
                    </span>
                  </div>}
                </div>

              </div>



            </fieldset>

          </div>
        </Layout>
  
    </div>
   </Layout>
    </section>
  )
}

export default page