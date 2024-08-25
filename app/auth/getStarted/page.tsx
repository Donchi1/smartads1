import Layout from '@/app/components/Layout'
import Text from '@/app/components/Text'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function page() {
  return (
    <section className='w-full h-screen'>
      <Layout>
        <header className='mb-8 flex justify-center items-center'>
          <Image className='w-[12rem]' width={500} height={500} src={"/img/ads-logo.png"} alt="logo" />
        </header>
        <div className='space-y-7 flex w-full items-center flex-col'>
          <Image className='max-w-[98%] w-full' width={500} height={500} src={"/img/hotel-location.png"} alt='Location' />
          <div className='space-y-4'>
            <div className='space-y-2'>
              <Text >
              &quot;Google usually delivers search results as fast as possible
              </Text>
              <Text>It can deliver millions in about 0.18seconds&quot;</Text>
            </div>

            <Image className='w-[350px]' width={500} height={500} src={"/img/get-started.png"} alt='getstarted' />
          </div>
          <div className='flex justify-center gap-10 items-center'>
            <Link href={"login"}>
              <Image className='w-[100px]' width={500} height={500} src={"/img/user-logo.png"} alt="user-logo" />
            </Link>
            <Link href={"register"}>
              <Image className="w-[100px]" width={500} height={500} src={"/img/user-reg-logo.png"} alt="user-logo" />
            </Link>
          </div>
        </div>
      </Layout>
    </section>
  )
}


export default page