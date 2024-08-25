"use client";

import Layout from '@/app/components/Layout';
import NavHeader from '@/app/components/NavHeader';
import Text from '@/app/components/Text';
import React from 'react';

const rules = [
  "Please access the relevant page and click 'Search'. Wait for the system to match the orders for you, then you can complete it. You can complete your orders and make withdrawals within 30 minutes.",
  "All advertisement orders are automatically matched by the system and cannot be altered, canceled, controlled, or skipped.",
  "Each account may receive between 0-3 commercial orders per round, with a commission multiplier of 9. A maximum of 3 commercial orders can be received in a single round.",
  "An account can receive 0-3 golden egg rewards per round. These rewards include both cash and commission multiplier rewards, with a maximum of 3 per round.",
  "For each advertisement order from different merchants, if there is no deposit within 15 minutes, you must contact customer service for confirmation from the merchant regarding the deposit account.",
  "The platform operates daily from 10:30 am to 10:30 pm, and members can submit advertisement orders during these hours.",
  "If your account is fraudulently accessed by others, contact customer service immediately. The platform will also pursue legal action.",
  "The minimum deposit amount is 50€, and the maximum is 99,999€.",
  "Upon receiving a commercial advertisement order, contact customer service to verify the deposit status, then click submit on the order page to complete the transaction.",
  "For withdrawal amounts exceeding 30,000€, you must notify Customer Service. Failure to do so will result in a 50% fee and security deposit being charged."
];

const RandR: React.FC = () => {
  return (
    <>
      <NavHeader
        outerClassName="!bg-black !shadow-white/50 !shadow-sm"
        headerLeft={{
          showHeaderLeft: true,
          headerIcon: { showIcon: true, className: { textClass: "!text-white" } },
        }}
        headerTitle={{ title: 'R&R', showTitle: true, className: "!text-white" }}
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

export default RandR;