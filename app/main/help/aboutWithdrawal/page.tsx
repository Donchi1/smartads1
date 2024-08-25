"use client";

import Layout from '@/app/components/Layout';
import NavHeader from '@/app/components/NavHeader';
import Text from '@/app/components/Text';
import React from 'react';

const rules = [
  "Before submitting a withdrawal, ensure your withdrawal method is bound to the platform. To withdraw, click the 'Withdraw' button, enter the desired amount, and input your withdrawal password. The processing time depends on your bank. Please note that withdrawals are processed between 10:30 and 22:30, and the number of withdrawals allowed will vary based on your rank."
];

const AboutWithdrawal: React.FC = () => {
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
              <Text key={index}>{rule}</Text>
            ))}
          </div>
        </Layout>
      </main>
    </>
  );
};

export default AboutWithdrawal;