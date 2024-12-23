import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Body Fat Research & Scientific Validation | Body Fat Calculator Pro',
  description:
    'Comprehensive analysis of scientific research, validation studies, and academic references supporting body fat measurement methods. Includes clinical trials, field studies, and peer-reviewed research.',
  keywords:
    'body fat research, scientific validation, measurement studies, clinical trials, hydrostatic weighing, DEXA comparison, Jackson & Pollock, Durnin & Womersley, U.S. Navy method, skinfold measurements, body composition research',
}

export default function ResearchLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
