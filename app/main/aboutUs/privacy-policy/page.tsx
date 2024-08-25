"use client";
import Layout from '@/app/components/Layout';
import NavHeader from '@/app/components/NavHeader';
import Text from '@/app/components/Text';
import React from 'react';

function PrivacyPolicy() {
  return (
    <>
      <NavHeader
        outerClassName='!bg-black !shadow-white/50 !shadow-sm'
        headerLeft={{
          showHeaderLeft: true,
          headerIcon: {
            showIcon: true,
            className: { textClass: "!text-white" }
          }
        }}
        headerTitle={{
          title: 'Privacy Policy',
          showTitle: true,
          className: "!text-white"
        }}
      />
      <main className="w-full h-screen">
        <Layout className="!pt-0 !bg-black">
          <div className='space-y-4 *:!text-white *:!text-[17px] mt-2'>
            <Text>
              <strong>Introduction</strong><br />
              Welcome to our platform. We value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your data when you use our platform and services, in compliance with applicable laws and Google Ads policies.
            </Text>
            <Text>
              <strong>Information We Collect</strong><br />
              We collect various types of information to provide and improve our services, including:
              <ul>
                <li><strong>Personal Information</strong>: This may include your name, email address, phone number, and payment information. We collect this data when you register on our platform, bind your withdrawal method, or make deposits and withdrawals.</li>
                <li><strong>Transaction Data</strong>: Details of deposits, withdrawals, and transactions you perform on our platform.</li>
                <li><strong>Log Data</strong>: Information automatically collected when you access our platform, such as your IP address, browser type, and usage details.</li>
                <li><strong>Cookies and Tracking Technologies</strong>: We use cookies and similar technologies to enhance your experience, track your activity on our platform, and serve personalized ads.</li>
              </ul>
            </Text>
            <Text>
              <strong>How We Use Your Information</strong><br />
              We use your information for various purposes, including but not limited to:
              <ul>
                <li><strong>Providing Services</strong>: To facilitate transactions, process orders, and manage your account.</li>
                <li><strong>Improving Platform Functionality</strong>: To analyze user behavior, improve user experience, and optimize our services.</li>
                <li><strong>Marketing and Advertising</strong>: To serve personalized ads, promotions, and marketing communications, including the use of Google Ads and other third-party services.</li>
                <li><strong>Compliance and Security</strong>: To comply with legal obligations, prevent fraud, and protect the integrity of our platform.</li>
              </ul>
            </Text>
            <Text>
              <strong>Commercial Ads Orders</strong><br />
              Commercial Ads Orders are profit-oriented ads primarily focused on hotel ads communication activities. These orders help merchants gain brand support and attract more customers. By participating in Commercial Ads Orders, members can earn up to 9x commissions, with each round providing 0-3 orders. Note that when you receive a Commercial Ads Order, you must complete it for the &quot;Processing&quot; amount to be reflected in your account assets.
            </Text>
            <Text>
              <strong>Data Sharing and Disclosure</strong><br />
              We do not sell your personal information. We may share your data with:
              <ul>
                <li><strong>Service Providers</strong>: Third-party companies that assist us in providing services, including payment processors, customer service, and marketing partners.</li>
                <li><strong>Compliance with Laws</strong>: We may disclose your information if required by law, legal processes, or government requests.</li>
                <li><strong>Business Transfers</strong>: In the event of a merger, acquisition, or sale of assets, your information may be transferred to the new owners.</li>
              </ul>
            </Text>
            <Text>
              <strong>Your Rights</strong><br />
              You have the following rights concerning your personal information:
              <ul>
                <li><strong>Access</strong>: You can request access to the personal information we hold about you.</li>
                <li><strong>Correction</strong>: You can request corrections to your personal information if it is inaccurate or incomplete.</li>
                <li><strong>Deletion</strong>: You can request the deletion of your personal information under certain conditions.</li>
                <li><strong>Opt-Out</strong>: You can opt-out of marketing communications and personalized ads.</li>
              </ul>
            </Text>
            <Text>
              <strong>Security</strong><br />
              We take reasonable measures to protect your personal information from unauthorized access, use, or disclosure. However, no internet-based platform can be 100% secure, and we cannot guarantee absolute security.
            </Text>
            <Text>
              <strong>Third-Party Links</strong><br />
              Our platform may contain links to third-party websites. We are not responsible for the privacy practices of these websites. We encourage you to review their privacy policies.
            </Text>
            <Text>
              <strong>Google Ads Compliance</strong><br />
              We comply with Google Ads policies, including restrictions on collecting sensitive information, ensuring transparency in our ads, and adhering to best practices for data usage and privacy.
            </Text>
            <Text>
              <strong>Changes to This Privacy Policy</strong><br />
              We may update this Privacy Policy from time to time. We will notify you of any significant changes by posting the new policy on our platform and updating the effective date.
            </Text>
            <Text>
              <strong>Contact Us</strong><br />
              If you have any questions or concerns about this Privacy Policy or our data practices, please contact our customer service.
            </Text>
            <Text>
              <strong>Effective Date</strong>: {new Date().toLocaleDateString()}
            </Text>
          </div>
        </Layout>
      </main>
    </>
  );
}

export default PrivacyPolicy;