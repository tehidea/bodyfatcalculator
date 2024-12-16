'use client'

import { Container } from '@/components/Container'
import { Layout } from '@/components/Layout'
import { CirclesBackground } from '@/components/CirclesBackground'
import { motion } from 'framer-motion'

export default function PrivacyPolicy() {
  return (
    <Layout>
      <Container className="relative isolate py-16 sm:py-24">
        <CirclesBackground className="absolute left-1/2 top-0 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 stroke-gray-300/30 [mask-image:linear-gradient(to_bottom,white_20%,transparent_75%)]" />

        <div className="mx-auto max-w-3xl">
          <motion.div
            className="mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-4xl font-semibold tracking-tight text-transparent sm:text-5xl">
              Privacy Policy
            </h1>
            <p className="mt-4 text-base text-gray-400">
              Last updated: {new Date().toLocaleDateString('en-GB')}
            </p>
          </motion.div>

          <div className="space-y-12 text-gray-300">
            {sections.map((section, index) => (
              <motion.section
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative rounded-2xl bg-white/[0.02] p-6 ring-1 ring-white/10 transition-colors duration-300 hover:bg-white/[0.04]"
              >
                <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-white/5 via-transparent to-transparent" />
                <div className="relative">
                  <h2 className="text-2xl font-semibold text-white">
                    {section.title}
                  </h2>
                  {section.content}
                </div>
              </motion.section>
            ))}
          </div>
        </div>
      </Container>
    </Layout>
  )
}

const sections = [
  {
    title: 'Introduction',
    content: (
      <p className="mt-4">
        Tehidea Ltd (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;),
        operating as Body Fat Calculator, is committed to protecting your
        privacy. This Privacy Policy explains how we collect, use, disclose, and
        safeguard your information when you use our mobile application and
        related services.
      </p>
    ),
  },
  {
    title: 'Information We Collect',
    content: (
      <div className="mt-6 space-y-6">
        <div>
          <h3 className="text-lg font-medium text-white">
            Information You Provide
          </h3>
          <ul className="mt-4 list-inside list-disc space-y-2 marker:text-[#FF0000]">
            <li>Body measurements and physical characteristics</li>
            <li>Gender and age information</li>
            <li>User preferences and settings</li>
            <li>Any feedback or correspondence you send us</li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-medium text-white">
            Automatically Collected Information
          </h3>
          <ul className="mt-4 list-inside list-disc space-y-2 marker:text-[#FF0000]">
            <li>Device information (model, operating system)</li>
            <li>App usage statistics</li>
            <li>Error logs and performance data</li>
            <li>IP address and basic analytics</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    title: 'How We Use Your Information',
    content: (
      <>
        <p className="mt-4">We use the collected information to:</p>
        <ul className="mt-4 list-inside list-disc space-y-2 marker:text-[#FF0000]">
          <li>Calculate and track your body fat percentage</li>
          <li>Improve and optimize our app&apos;s performance</li>
          <li>Provide technical support</li>
          <li>Send important updates about the app</li>
          <li>Analyze usage patterns to enhance user experience</li>
        </ul>
      </>
    ),
  },
  {
    title: 'Data Storage and Security',
    content: (
      <p className="mt-4">
        Your data is stored securely on our servers located in the European
        Economic Area (EEA). We implement appropriate technical and
        organizational measures to protect your personal information.
      </p>
    ),
  },
  {
    title: 'Data Sharing and Disclosure',
    content: (
      <>
        <p className="mt-4">
          We do not sell your personal data. We may share your information with:
        </p>
        <ul className="mt-4 list-inside list-disc space-y-2 marker:text-[#FF0000]">
          <li>Service providers who assist in our operations</li>
          <li>Law enforcement when required by law</li>
          <li>Third parties with your explicit consent</li>
        </ul>
      </>
    ),
  },
  {
    title: 'Your Rights',
    content: (
      <>
        <p className="mt-4">
          Under GDPR and UK data protection law, you have the right to:
        </p>
        <ul className="mt-4 list-inside list-disc space-y-2 marker:text-[#FF0000]">
          <li>Access your personal data</li>
          <li>Correct inaccurate data</li>
          <li>Request deletion of your data</li>
          <li>Object to processing of your data</li>
          <li>Data portability</li>
          <li>Withdraw consent</li>
        </ul>
      </>
    ),
  },
  {
    title: 'Children&apos;s Privacy',
    content: (
      <p className="mt-4">
        Our service is not intended for users under 16 years of age. We do not
        knowingly collect data from children under 16.
      </p>
    ),
  },
  {
    title: 'Changes to This Policy',
    content: (
      <p className="mt-4">
        We may update this Privacy Policy periodically. We will notify you of
        any changes by posting the new Privacy Policy on this page and updating
        the &quot;Last updated&quot; date.
      </p>
    ),
  },
  {
    title: 'Contact Us',
    content: (
      <>
        <p className="mt-4">
          If you have questions about this Privacy Policy, please contact us at:
        </p>
        <div className="mt-4 rounded-lg bg-black/20 p-6 ring-1 ring-white/10">
          <p className="space-y-1">
            <span className="block">Tehidea Ltd</span>
            <span className="block">86-90 Paul Street</span>
            <span className="block">London EC2A 4NE</span>
            <span className="block">United Kingdom</span>
          </p>
          <p className="mt-4 space-y-1 border-t border-white/10 pt-4">
            <span className="block">Company Registration No: 05902165</span>
            <span className="block">VAT Registration No: GB893214121</span>
          </p>
        </div>
      </>
    ),
  },
]
