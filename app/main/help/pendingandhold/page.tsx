"use client";

import Layout from '@/app/components/Layout';
import NavHeader from '@/app/components/NavHeader';
import Text from '@/app/components/Text';
import React from 'react';

const rules = [
  "When a 'Commercial Ads Order' is assigned to you by the system, any search orders will be temporarily paused. Once you complete the commercial ads order, the pause will be lifted.",
  "Important:",
  "If you fail to complete a commercial ads order within 72 hours without notifying customer service or requesting an extension, your account will be temporarily suspended. To lift the suspension, you will need to contact customer service.",
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
        headerTitle={{ title: 'Pending And Hold', showTitle: true, className: "!text-white" }}
      />
      <main className="w-full h-screen">
        <Layout className="!pt-0 !bg-black">
          <div className="space-y-4 *:text-white *:text-[17px] mt-2">
            {rules.map((rule, index) => (
              <Text key={index}>{rule}</Text>
            ))}
          </div>
        </Layout>
      </main>
    </>
  );
};

export default AboutDeposit;





