"use client"

import React from 'react'
import { FaChevronRight } from 'react-icons/fa'
import H2 from '@/app/components/H2'
import Layout from '@/app/components/Layout'
import NavHeader from '@/app/components/NavHeader'
import Link from 'next/link'
import LinkInfoDisplay from '@/app/components/LinkInfoDisplay'

// A reusable component to render each settings option


function Page() {
  // Define the settings options in an array for easier management
  const settingsOptions = [
    { href: 'help/r&r', title: 'R&R' },
    { href: 'help/aboutDeposit', title: 'About Deposit' },
    { href: 'help/aboutWithdrawal', title: 'About Withdrawal' },
    { href: 'help/commercialAds', title: 'Commercial Ads' },
    { href: 'help/pendingandhold', title: 'Pending And Hold' },
  ];

  return (
    <>
      <NavHeader headerLeft={{ showHeaderLeft: true }} headerTitle={{ title: 'Help', showTitle: true }} />
      <main className="w-full h-screen">
        <Layout className="!pt-0">
          <div className="mt-4">
            {settingsOptions.map(({ href, title }) => (
              <LinkInfoDisplay key={href} href={href} title={title} />
            ))}
          </div>
        </Layout>
      </main>
    </>
  );
}

export default Page;