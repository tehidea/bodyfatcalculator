'use client'

import dynamic from 'next/dynamic'

const ConsentManager = dynamic(
  () => import('@/components/ConsentManager').then((mod) => mod.ConsentManager),
  { ssr: false },
)

export function ConsentManagerLoader({ policyVersion }: { policyVersion: string }) {
  return <ConsentManager policyVersion={policyVersion} />
}
