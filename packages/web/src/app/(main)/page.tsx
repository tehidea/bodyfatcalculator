import { CallToAction } from '@/components/CallToAction'
import { ConsentManagerLoader } from '@/components/ConsentManagerLoader'
import { Faqs } from '@/components/Faqs'
import { Hero } from '@/components/Hero'
import { PrimaryFeatures } from '@/components/PrimaryFeatures'
import { SecondaryFeatures } from '@/components/SecondaryFeatures'

export default function Home() {
  return (
    <>
      {/* Add the ConsentManager with your current policy version */}
      <ConsentManagerLoader policyVersion="1.0" />
      <Hero />
      <PrimaryFeatures />
      <SecondaryFeatures />
      <CallToAction />
      <Faqs />
    </>
  )
}
