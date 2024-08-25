"use client";

import Layout from '@/app/components/Layout';
import NavHeader from '@/app/components/NavHeader';
import Text from '@/app/components/Text';
import { agreement } from '@/utils/logTexts';
import React from 'react';


const Agreement: React.FC = () => {
  return (
    <>
      <NavHeader
        outerClassName="!bg-black !shadow-white/50 !shadow-sm"
        headerLeft={{
          showHeaderLeft: true,
          headerIcon: { showIcon: true, className: { textClass: "!text-white" } },
        }}
        headerTitle={{ title: 'Agreement', showTitle: true, className: "!text-white" }}
      />
      <main className="w-full h-screen">
        <Layout className="!pt-0 !bg-black">
          <div className="space-y-4 *:text-white *:text-[17px] mt-2">
            {agreement.map((rule, index) => (
              <Text key={index}> {rule}</Text>
            ))}
          </div>
        </Layout>
      </main>
    </>
  );
};

export default Agreement;