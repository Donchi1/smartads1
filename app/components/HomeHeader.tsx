import Image from 'next/image'
import React from 'react'
import H2 from './H2'
import Link from 'next/link'

function HomeHeader() {
  return (
    <section className='h-[12vh]'>

    <header className=" sticky top-0 h-[12vh] z-10 bg-white shadow-[-1px_4px_3.5px_-5px_rgba(0,0,0,0.41)] max-w-full lg:max-w-lg mx-auto">
    <nav className="flex w-[96%] mx-auto h-full justify-between items-center">
      <div className="flex gap-2 items-center">
        <Image className="w-[35px]" width={200} height={300} src={"/img/logo.png"} alt="logo" />
        <H2 className="!font-mono !font-normal !text-[20px]">Hotel</H2>
      </div>
      <div className="flex items-center gap-2">
        <Link href={"/main/dailytask"}>
        <Image className="w-[35px]" width={200} height={300} src={"/img/calender.png"} alt="logo" />
        </Link>
        <Link href={"/main/account"}>
        <Image className="w-[35px]" width={200} height={300} src={"/img/user.png"} alt="logo" />
        </Link>

      </div>
    </nav>
  </header>
    </section>
  )
}

export default HomeHeader