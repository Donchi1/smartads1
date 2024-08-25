"use client";

import Layout from '@/app/components/Layout';
import NavHeader from '@/app/components/NavHeader';
import Text from '@/app/components/Text';
import React from 'react';

const rules = [
  "To make a deposit, go to the 'Personal' page and click 'Deposit'. Choose your dedicated customer service representative to assist with the deposit. Follow the instructions provided for the deposit account and ensure you upload a screenshot of the successful transfer. If you encounter any issues during the deposit process, reach out to the on-duty online customer service for assistance. Given the high volume of messages, please double-check the platform's deposit account before proceeding. Note that the deposit account is updated daily. For any concerns, contact the platform's online customer service."
];

const AboutDeposit: React.FC = () => {
  return (
    <>
      <NavHeader
        outerClassName="!bg-black !shadow-white/50 !shadow-sm"
        headerLeft={{
          showHeaderLeft: true,
          headerIcon: { showIcon: true, className: { textClass: "!text-white" } },
        }}
        headerTitle={{ title: 'About Deposit', showTitle: true, className: "!text-white" }}
      />
      <main className="w-full h-screen">
        <Layout className="!pt-0 !bg-black">
          <div className="space-y-4 *:text-white *:text-[17px] mt-2">
            {rules.map((rule, index) => (
              <Text key={index}>{index + 1}. {rule}</Text>
            ))}
          </div>
        </Layout>
      </main>
    </>
  );
};

export default AboutDeposit;