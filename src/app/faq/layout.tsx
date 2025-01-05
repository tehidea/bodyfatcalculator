import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Frequently Asked Questions | Body Fat Calculator (PRO)',
  description:
    'Common questions and answers about body fat measurement methods, accuracy, techniques, and best practices.',
  keywords:
    'body fat FAQ, measurement questions, body fat accuracy, measurement techniques, body fat calculation help',
}

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return children
}
