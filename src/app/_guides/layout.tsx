import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Body Fat Measurement Guides | Body Fat Calculator Pro',
  description:
    'Step-by-step guides for accurate body fat measurements using various methods including skinfold calipers, tape measures, and circumference measurements.',
  keywords:
    'body fat measurement guide, skinfold measurement, caliper technique, circumference measurements, body fat testing guide',
}

export default function GuidesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
