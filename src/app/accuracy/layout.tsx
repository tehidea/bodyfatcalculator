import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Body Fat Measurement Accuracy | Body Fat Calculator Pro',
  description:
    'Learn about the accuracy and validation of different body fat measurement methods, from basic circumference measurements to advanced skinfold techniques.',
  keywords:
    'body fat accuracy, measurement precision, skinfold accuracy, body fat testing validation, measurement error ranges',
}

export default function AccuracyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
