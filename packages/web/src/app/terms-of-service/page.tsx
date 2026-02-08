'use client'

import { motion } from 'framer-motion'
import { CirclesBackground } from '@/components/CirclesBackground'
import { Container } from '@/components/Container'
import { Layout } from '@/components/Layout'

export default function TermsOfService() {
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
              Terms of Service
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
                  <h2 className="text-2xl font-semibold text-white">{section.title}</h2>
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
    title: '1. Agreement to Terms',
    content: (
      <p className="mt-4">
        By accessing and using the Body Fat Calculator application (&quot;App&quot;), you agree to
        be bound by these Terms of Service (&quot;Terms&quot;). If you disagree with any part of
        these terms, you may not access or use our App.
      </p>
    ),
  },
  {
    title: '2. About Us',
    content: (
      <>
        <p className="mt-4">
          The App is operated by Tehidea Ltd (&quot;Company,&quot; &quot;we,&quot; or
          &quot;us&quot;), registered in England and Wales:
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
  {
    title: '3. The Service',
    content: (
      <p className="mt-4">
        The App provides body fat calculation services. While we strive to provide accurate
        calculations, the results should be considered estimates and not medical advice.
      </p>
    ),
  },
  {
    title: '4. User Responsibilities',
    content: (
      <>
        <p className="mt-4">You agree to:</p>
        <ul className="mt-4 list-inside list-disc space-y-2 marker:text-[#FF0000]">
          <li>Provide accurate information when using the App</li>
          <li>Use the App for personal, non-commercial purposes only</li>
          <li>Not attempt to circumvent, disable, or interfere with security features</li>
          <li>Not distribute, copy, or modify any part of the App</li>
        </ul>
      </>
    ),
  },
  {
    title: '5. Medical Disclaimer',
    content: (
      <p className="mt-4">
        The App is not a substitute for professional medical advice, diagnosis, or treatment. Always
        seek professional medical advice before making decisions about your health.
      </p>
    ),
  },
  {
    title: '6. Intellectual Property',
    content: (
      <p className="mt-4">
        The App and its original content, features, and functionality are owned by Tehidea Ltd and
        are protected by international copyright, trademark, and other intellectual property laws.
      </p>
    ),
  },
  {
    title: '7. User Data',
    content: (
      <p className="mt-4">
        Your use of the App and any data you provide is subject to our Privacy Policy, which is
        incorporated into these Terms.
      </p>
    ),
  },
  {
    title: '8. Disclaimer of Warranties',
    content: (
      <p className="mt-4">
        The App is provided &quot;as is&quot; and &quot;as available&quot; without any warranties of
        any kind, either express or implied.
      </p>
    ),
  },
  {
    title: '9. Limitation of Liability',
    content: (
      <p className="mt-4">
        To the maximum extent permitted by law, Tehidea Ltd shall not be liable for any indirect,
        incidental, special, consequential, or punitive damages resulting from your use of the App.
      </p>
    ),
  },
  {
    title: '10. Changes to Terms',
    content: (
      <p className="mt-4">
        We reserve the right to modify these Terms at any time. We will notify users of any changes
        by updating the &quot;Last updated&quot; date.
      </p>
    ),
  },
  {
    title: '11. Termination',
    content: (
      <p className="mt-4">
        We may terminate or suspend your access to the App immediately, without prior notice, for
        any breach of these Terms.
      </p>
    ),
  },
  {
    title: '12. Governing Law',
    content: (
      <p className="mt-4">
        These Terms shall be governed by and construed in accordance with the laws of England and
        Wales. Any disputes shall be subject to the exclusive jurisdiction of the courts of England
        and Wales.
      </p>
    ),
  },
  {
    title: '13. Contact Information',
    content: (
      <>
        <p className="mt-4">For any questions about these Terms, please contact us at:</p>
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
