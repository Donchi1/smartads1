"use client"
import useLangLoader from '@/app/components/hooks/useLangLoader'
import Layout from '@/app/components/Layout'
import NavHeader from '@/app/components/NavHeader'
import React from 'react'

function Page() {

  useLangLoader()



  return (
    <>
       
      <NavHeader headerLeft={{ showHeaderLeft: true }} headerTitle={{ title: 'Languages', showTitle: true }} />
      <main className="w-full h-screen " >
        <Layout className="!pt-0">
            <div id="ytWidget" className='[&_form]:!grid has-[.yt-wrapper]:!flex has-[.yt-wrapper]:!justify-between [&_form]:!static [&_form]:!border-none has-[yt-serviceLink]:!hidden  has-[yt-wrapper]:!w-full [&_form]:!grid-cols-3 [&_form]:!w-full [&_div]:!w-full'  onClick={() => location.reload()}>
            </div>
        </Layout>
      </main>
    </>
  )
}

export default Page