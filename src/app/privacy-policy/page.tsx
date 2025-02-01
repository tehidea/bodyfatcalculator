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
        <div>
          <h3 className="text-lg font-medium text-white">
            Analytics and Advertising
          </h3>
          <p className="mt-4">
            We use several third-party services to analyze usage and serve
            advertisements:
          </p>
          <ul className="mt-4 list-inside list-disc space-y-2 marker:text-[#FF0000]">
            <li>
              Plausible Analytics - Privacy-focused analytics service that
              collects anonymous usage data
            </li>
            <li>
              PostHog Analytics - Product analytics platform that helps us
              understand user behavior
            </li>
            <li>
              Google AdSense - Advertising service that may use cookies and web
              beacons
            </li>
          </ul>
          <p className="mt-4">
            These services may place cookies or use similar tracking
            technologies on your device. You can manage your preferences for
            these services through our Privacy Settings.
          </p>
        </div>
      </div>
    ),
  },
  {
    title: 'Cookies and Tracking Technologies',
    content: (
      <div className="mt-4 space-y-4">
        <p>
          We and our third-party partners use cookies and similar tracking
          technologies to analyze trends, administer the website, track
          users&apos; movements around the site, and gather demographic
          information about our user base as a whole.
        </p>
        <div>
          <h3 className="text-lg font-medium text-white">Google AdSense</h3>
          <p className="mt-2">
            We use Google AdSense to display advertisements. Google may use
            cookies, web beacons, and other storage technologies to collect or
            receive information from our website and elsewhere on the internet.
            This information may be used to provide measurement services and
            target advertisements.
          </p>
          <p className="mt-2">
            Google&apos;s use of advertising cookies enables it and its partners
            to serve ads based on your visit to our site and/or other sites on
            the Internet. You can opt out of personalized advertising by
            visiting{' '}
            <a
              href="https://www.google.com/settings/ads"
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-500 hover:text-red-400"
            >
              Google&apos;s Ads Settings
            </a>
            .
          </p>
          <p className="mt-2">
            For more information about how Google uses information from sites or
            apps that use their services, visit{' '}
            <a
              href="https://policies.google.com/technologies/partner-sites"
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-500 hover:text-red-400"
            >
              How Google uses information from sites or apps that use our
              services
            </a>
            .
          </p>
        </div>
        <div>
          <h3 className="text-lg font-medium text-white">Privacy Sandbox</h3>
          <p className="mt-2">
            Google&apos;s advertising services are experimenting with new
            privacy-preserving technologies via the Privacy Sandbox initiative
            on Chrome and Android. Users with Privacy Sandbox settings enabled
            may see relevant ads based on Topics or Protected Audience data
            stored on their device. Ad performance may be measured using
            Attribution Reporting data stored locally.
          </p>
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
          <li>Deliver relevant advertisements</li>
          <li>Measure the effectiveness of our marketing efforts</li>
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
    title: "Children's Privacy",
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
