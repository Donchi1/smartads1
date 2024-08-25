"use client"
import useLangLoader from '@/app/components/hooks/useLangLoader'
import Layout from '@/app/components/Layout'
import NavHeader from '@/app/components/NavHeader'
//import { countryInfo, getFromLocalStorage, setToLocalStorage } from '@/utils/helpers'
//import Image from 'next/image'

import React from 'react'

function Page() {
  // const [langCode, setLangCode] = useState(getFromLocalStorage("lang"))

  // const handleCountrySelect = (code: string) => {
  //   setLangCode(code)
  //   setToLocalStorage(code, "lang")
  // }
useLangLoader()

  return (
    <>
       
      <NavHeader headerLeft={{ showHeaderLeft: true }} headerTitle={{ title: 'Languages', showTitle: true }} />
      <main className="w-full h-screen " >
        <Layout className="!pt-0">
          <div id="ytWidget" className='[&_form]:!grid has-[.yt-wrapper]:!flex has-[.yt-wrapper]:!justify-between [&_form]:!static [&_form]:!border-none has-[yt-serviceLink]:!hidden  has-[yt-wrapper]:!w-full [&_form]:!grid-cols-3 [&_form]:!w-full [&_div]:!w-full' onClick={() => location.reload()}>
          {/* <form className="mt-4" >
          <ul className='space-y-2'>
              {countryInfo.map((each, idx) => (
                <li onClick={() => handleCountrySelect(each.code)} key={idx} className='flex cursor-pointer justify-between items-center'>
                  <div className='flex gap-2 items-center '>
                    <Image className='w-10 h-14 rounded-full ' width={400} height={600} src={each.extURL} alt="countryflag" />
                    {each.languageName}
                  </div>

                  <span>
                    <input checked={each.code === langCode} onChange={() => { }} type='checkbox' className='rounded-lg size-5 border-main-color' />
                  </span>
                </li>
              ))}
            </ul>
          </form> */}
          </div>
        </Layout>
      </main>
    </>
  )
}

export default Page