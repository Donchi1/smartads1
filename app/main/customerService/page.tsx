"use client"
import useGetDocWithClause from '@/app/components/hooks/UseGetDocWithClause';
import Layout from '@/app/components/Layout'
import NavHeader from '@/app/components/NavHeader'
import Text from '@/app/components/Text';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { FaChevronRight } from 'react-icons/fa';

function Page() {
  const [adminUser] = useGetDocWithClause({ colls: `users`, q: { path: "isAdmin", condition: "==", value: true } })

  const customerServiceItems = [
    { label: "Whatsapp Customer", img: "/img/whatsapp-customer.png", link: `https://wa.me/+${adminUser[0]?.phoneNumber}` },
    { label: "Telegram Customer", img: "/img/telegram-customer.png", link: `https://t.me/${adminUser[0]?.telegramUsername}` }
  ];

  return (
    <main className='w-full h-screen'>
      <NavHeader  headerLeft={{ showHeaderLeft: true }} headerTitle={{ title: "Customer Service", showTitle: true }} />
      <Layout className='!pt-0' >
        <div className='mt-4 divide-y-[1px] *:py-4'>
          {customerServiceItems.map((item, index) => (
            <Link
             target='_blank'
              href={item.link}
              key={index}
              className={`flex justify-between cursor-pointer items-center ${index === customerServiceItems.length - 1 ? '!border-b' : ''}`}
            >
              <div className=' space-y-2'>
                <Image className='size-[3.5rem] rounded-full' width={200} height={200} src={item.img as string} alt="User" />
                <Text className='!text-[17px] !text-black/50'>{item.label}</Text>
              </div>
              <FaChevronRight size={12} />
            </Link>
          ))}
        </div>
      </Layout>
    </main>
  )
}

export default Page