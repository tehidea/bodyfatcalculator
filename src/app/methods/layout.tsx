import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Body Fat Measurement Methods | Body Fat Calculator Pro',
  description:
    'Comprehensive guide to body fat measurement methods including YMCA, U.S. Navy, Jackson & Pollock, and more. Learn about accuracy, techniques, and scientific validation.',
  keywords:
    'body fat measurement, YMCA method, US Navy method, Jackson Pollock, skinfold measurements, body fat calculation, body composition testing',
}

export default function MethodsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
