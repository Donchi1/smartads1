import BottomTab from '@/app/components/BottomTab'
import Layout from '@/app/components/Layout'
import Slider from '@/app/components/Slider'
import React from 'react'


const sliderImgs = [
  "/img/discover1.png",
  "/img/discover2.png",
  "/img/discover3.png"
]

function page() {
  return (
    <>
    <main className="w-full h-screen">
      <Layout className="!pt-0">
        <div className='mb-[12vh]'>
          <Slider images={sliderImgs} />
    </div>
      <BottomTab />
    </Layout>
    </main>
    </>
  )
}

export default page