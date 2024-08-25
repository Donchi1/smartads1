import React from 'react'
import Layout from './components/Layout'
import Image from 'next/image'
import NavHeader from './components/NavHeader'

function Page() {
  return (
    <main className='w-full h-screen'>
        <NavHeader headerLeft={{headerIcon:{showIcon: true}, headerLeftTitle:{showTitle: true, title:"Back"}}} />
     <Layout className='!bg-main-gray'>
        <div className='flex justify-center items-center h-[80vh]'>
            <Image className='w-full ' width={100} height={100} src="/img/not-found.jpeg" alt='Not found'/>
        </div>
     </Layout>
    </main>
  )
}

export default Page