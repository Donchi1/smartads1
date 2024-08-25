"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import H2 from './H2';

const links = [
  { name: "home", url: "/", img1: "/img/bar.png", activeImg: "/img/bar-red.png" },
  { name: "reservation", url: "/main/reservation", img1: "/img/reserve.png", activeImg: "/img/reserve-red.png" },
  { name: "Profile", url: "/main/account", img1: "/img/profile.png", activeImg: "/img/profile-red.png" },
];

function BottomTab() {
  const pathname = usePathname();
  
  // Determine the active tab based on the pathname
  const getActiveTab = (url:string) => pathname === url;

  return (
    <section className="max-w-full flex justify-center rounded-t-xl items-center lg:max-w-lg mx-auto fixed bottom-0 right-0 left-0 min-h-[10vh] py-2 bg-white">
      <div className="flex w-[87%] mx-auto h-full justify-between items-center">
        {links.map(({ name, url, img1, activeImg }) => (
          <Link key={url} href={url} className='flex justify-center items-center flex-col gap-1'>
            <Image
              className='w-10'
              width={200}
              height={200}
              src={getActiveTab(url) ? activeImg: img1}
              alt={name}
            />
            <H2 className='!text-sm !font-normal !capitalize'>{name}</H2>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default BottomTab;