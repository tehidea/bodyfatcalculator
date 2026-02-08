'use client'

import { motion } from 'framer-motion'
import DOMPurify from 'isomorphic-dompurify'
import { CirclesBackground } from '@/components/CirclesBackground'
import { Container } from '@/components/Container'
import { Layout } from '@/components/Layout'

function FaqText({ text }: { text: string }) {
  const sanitizedHtml = DOMPurify.sanitize(text, {
    ALLOWED_TAGS: ['a'],
    ALLOWED_ATTR: ['href', 'target', 'rel', 'class'],
  })

  return (
    // biome-ignore lint/security/noDangerouslySetInnerHtml: HTML is sanitized via DOMPurify with a strict allowlist (ALLOWED_TAGS: ['a'])
    <p className="mt-4 text-gray-300" dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />
  )
}

const faqs = [
  [
    {
      question: 'What is body fat percentage?',
      answer:
        'Body fat percentage is the total mass of fat divided by total body mass. It includes both essential fat (needed for basic bodily functions) and storage fat. This measurement is more meaningful than BMI for assessing body composition.',
    },
    {
      question: 'How accurate are the measurements?',
      answer:
        'Accuracy depends on the method and technique. Free methods typically fall around ±4-7%, while PRO skinfold methods are usually ±3-5% when performed correctly. Consistent technique and site location matter most.',
    },
    {
      question: 'What equipment do I need?',
      answer:
        "Circumference methods only need a soft tape measure. Skinfold methods require calipers. We recommend professional-grade calipers like Harpenden or Lange for best results, though any calipers (like <a href='https://www.amazon.co.uk/CALIPER-MEASURING-Skinfold-Caliper-Measure/dp/B07B9Y5J7N?crid=2IU4GPJB8C0U0&nsdOptOutParam=true&refinements=p_85%3A20930949031&rnid=20930948031&rps=1&sprefix=body+calipers%2Caps%2C70&sr=8-5&linkCode=ll1&tag=bodyfatcalculator-21&linkId=60fe659fe6cb7399b48d403e938d77a8&language=en_GB&ref_=as_li_ss_tl' target='_blank' rel='noopener' class='text-[#FF0000] hover:text-[#FF0000]/90'>BOZEERA</a> etc) will work.",
    },
    {
      question: 'Which measurement method should I choose?',
      answer:
        'Start with the method that matches your tools and comfort level. Tape-based methods are easiest. If you have calipers, the 3-site method is a good balance of accuracy and simplicity. More sites can improve accuracy with proper technique.',
    },
  ],
  [
    {
      question: 'What makes the PRO version special?',
      answer:
        'PRO unlocks additional measurement methods including Jackson & Pollock 3,4,7-site formulas and Durnin & Womersley method. Perfect for fitness enthusiasts who want access to all validated formulas.',
    },
    {
      question: 'How often should I measure?',
      answer:
        'Measurement frequency depends on your goals. Many people measure every few weeks to spot trends. Consistency matters most, so try to measure at the same time of day.',
    },
    {
      question: 'Why do different methods give different results?',
      answer:
        'Each method uses different measurements and equations optimized for specific populations. Variations can occur due to differences in body type, measurement technique, and the underlying assumptions of each method.',
    },
    {
      question: 'Can I use this professionally with clients?',
      answer:
        'Yes! The app is suitable for both personal and professional use. The multiple measurement methods and unit conversion features make it a practical tool for trainers working with clients.',
    },
  ],
  [
    {
      question: 'Is there a subscription fee?',
      answer:
        'No! The PRO version is a one-time purchase of £9.99 / $9.99 / €9.99. You get lifetime access to all premium measurement methods and future updates. No hidden fees or subscriptions.',
    },
    {
      question: 'What factors can affect measurement accuracy?',
      answer:
        'Several factors can impact accuracy: time of day, hydration status, recent exercise, measurement technique, and tool quality. Following our measurement guidelines helps minimize these variables.',
    },
    {
      question: 'How do I know if I&apos;m measuring correctly?',
      answer:
        'Look for consistent readings across repeated measurements and a stable technique at the same sites. If you&apos;re unsure, having a professional demonstrate the method can help.',
    },
    {
      question: 'Do you offer support?',
      answer:
        'Yes! We provide support for all users. If you have questions about measurements, formulas, or technical issues, contact us at <a href="mailto:support@bodyfatcalculator.pro" class="text-[#FF0000] hover:text-[#FF0000]/90">support@bodyfatcalculator.pro</a>.',
    },
  ],
  [
    {
      question: 'What are the advantages over bioelectrical impedance?',
      answer:
        'Skinfolds and bioelectrical impedance (BIA) can produce different estimates. BIA is sensitive to hydration and recent intake, while skinfolds can be more consistent when measured correctly.',
    },
    {
      question: 'How do results compare to DEXA scans?',
      answer:
        'DEXA is a reference method for body composition. Field methods provide practical, lower-cost estimates that can differ from DEXA, so focus on consistent technique and trends over time.',
    },
    {
      question: 'Can I track measurements over time?',
      answer:
        'The current app focuses on single-session calculations and does not include history or export yet.',
    },
    {
      question: 'Are the formulas scientifically validated?',
      answer:
        'Yes, the formulas are based on peer-reviewed research and standard field protocols. We provide references to the original sources, and accuracy ranges assume proper measurement technique.',
    },
  ],
  [
    {
      question: 'What should I do if measurements seem inconsistent?',
      answer:
        'First, verify your technique and measurement sites. Take multiple measurements at each site and ensure you&apos;re using the same locations each time. If problems persist, our support team can help troubleshoot.',
    },
    {
      question: 'How does body fat distribution affect results?',
      answer:
        'Fat distribution patterns vary by gender, age, and genetics. Our methods account for these differences by using multiple measurement sites and gender-specific equations. This helps ensure accurate results across different body types.',
    },
    {
      question: 'What&apos;s the difference between essential and storage fat?',
      answer:
        'Essential fat (2-5% for men, 10-13% for women) is necessary for basic bodily functions. Storage fat is additional fat tissue that serves as energy reserve. Both are included in body fat percentage measurements.',
    },
    {
      question: 'How accurate are the Navy and YMCA methods?',
      answer:
        'The Navy method typically achieves ±4-6% accuracy, while the YMCA method ranges from ±5-7%. While slightly less precise than skinfold methods, they provide reliable tracking when used consistently.',
    },
  ],
  [
    {
      question: 'Can I measure myself or do I need help?',
      answer:
        'While some measurements can be done solo, having assistance improves accuracy, especially for hard-to-reach sites like the subscapular. If measuring alone, start with methods that use easily accessible sites.',
    },
    {
      question: 'How do age and gender affect measurements?',
      answer:
        'Age and gender influence fat distribution and body composition. Our formulas account for these factors using age-adjusted equations and gender-specific calculation methods to maintain accuracy.',
    },
    {
      question: 'What&apos;s the best time to measure?',
      answer:
        'Morning measurements, before eating or drinking, are often the most consistent. Avoid measuring immediately after exercise, as this can affect readings.',
    },
    {
      question: 'How do I maintain my measurement tools?',
      answer:
        'Clean calipers with alcohol wipes after use and store in their protective case. Check calibration regularly (especially for professional models). For tape measures, ensure they remain flat and undamaged.',
    },
  ],
]

export default function FAQ() {
  return (
    <Layout>
      <Container className="relative isolate py-16 sm:py-24">
        <CirclesBackground className="absolute left-1/2 top-0 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 stroke-gray-300/30 [mask-image:linear-gradient(to_bottom,white_20%,transparent_75%)]" />

        <div className="mx-auto max-w-7xl">
          <motion.div
            className="mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-4xl font-semibold tracking-tight text-transparent sm:text-5xl">
              Frequently Asked Questions
            </h1>
            <p className="mt-4 text-base text-gray-400">
              Common questions and answers about body fat measurement methods, accuracy, and best
              practices.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <ul className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
              {faqs.map((column) => (
                <li key={column[0].question}>
                  <ul className="space-y-10">
                    {column.map((faq) => (
                      <li key={faq.question}>
                        <article className="relative rounded-2xl bg-white/[0.02] p-6 ring-1 ring-white/10 transition-colors duration-300 hover:bg-white/[0.04]">
                          <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-white/5 via-transparent to-transparent" />
                          <div className="relative">
                            <h3 className="text-lg font-semibold text-white">{faq.question}</h3>
                            <FaqText text={faq.answer} />
                          </div>
                        </article>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </Container>
    </Layout>
  )
}
