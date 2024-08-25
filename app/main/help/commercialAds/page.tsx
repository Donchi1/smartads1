"use client";

import Layout from '@/app/components/Layout';
import NavHeader from '@/app/components/NavHeader';
import Text from '@/app/components/Text';
import React from 'react';

const commercialAdsInfo = [
  `Commercial Ads Orders are profit-oriented ads primarily focused on hotel ads communication activities through booking sites. These orders help merchants gain brand support and attract more customers.`,
  `Commercial Ads Orders offer members a chance to earn up to 9x commissions. Vendors and merchants design these orders to allow members and agents to earn higher commissions, with each round providing 0-3 orders.`,
  `Accounts can receive 0-3 golden egg rewards per day, including cash and commission multiplier rewards.`,
  `Note: When you receive a Commercial Ads Order, you must complete it for the "Processing" amount to be reflected in your account assets. The amount displayed in your account assets indicates the required deposit amount.`,
];

const CommercialAds: React.FC = () => {

  return (
    <>
      <NavHeader
        outerClassName="!bg-black !shadow-white/50 !shadow-sm"
        headerLeft={{ showHeaderLeft: true, headerIcon: { showIcon: true, className: { textClass: "!text-white" } } }}
        headerTitle={{ title: 'Commercial Ads Orders', showTitle: true, className: "!text-white" }}
      />
      <main className="w-full h-screen">
        <Layout className="!pt-0 !bg-black">
          <div className='space-y-4 mt-2'>
            {commercialAdsInfo.map((text, index) => (
              <Text key={index} className='!text-white !text-[17px]'>{text}</Text>
            ))}
          </div>
        </Layout>
      </main>
    </>
  );
}

export default CommercialAds;