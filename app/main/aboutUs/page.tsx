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
    { href: 'aboutUs/agreement', title: 'Agreement' },
    { href: 'aboutUs/privacy-policy', title: 'Privacy Policy' }
  ];

  return (
    <>
      <NavHeader headerLeft={{ showHeaderLeft: true }} headerTitle={{ title: 'About Us', showTitle: true }} />
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