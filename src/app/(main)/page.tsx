import dynamic from 'next/dynamic'

import { CallToAction } from '@/components/CallToAction'
import { Faqs } from '@/components/Faqs'
import { Hero } from '@/components/Hero'
import { PrimaryFeatures } from '@/components/PrimaryFeatures'
import { SecondaryFeatures } from '@/components/SecondaryFeatures'

// Import the ConsentManager component dynamically to avoid SSR issues
const ConsentManager = dynamic(
  () => import('@/components/ConsentManager').then((mod) => mod.ConsentManager),
  { ssr: false },
)

export default function Home() {
  return (
    <>
      {/* Add the ConsentManager with your current policy version */}
      <ConsentManager policyVersion="1.0" />
      <Hero />
      <PrimaryFeatures />
      <SecondaryFeatures />
      <CallToAction />
      <Faqs />
    </>
  )
}
