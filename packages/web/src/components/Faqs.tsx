import DOMPurify from 'isomorphic-dompurify'
import Link from 'next/link'
import { Container } from '@/components/Container'

function FaqText({ text }: { text: string }) {
  const sanitizedHtml = DOMPurify.sanitize(text, {
    ALLOWED_TAGS: ['a'],
    ALLOWED_ATTR: ['href', 'target', 'rel', 'class'],
  })

  return (
    // biome-ignore lint/security/noDangerouslySetInnerHtml: HTML is sanitized via DOMPurify with a strict allowlist (ALLOWED_TAGS: ['a'])
    <p className="mt-4 text-sm text-gray-600" dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />
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
  ],
  [
    {
      question: 'What makes the PRO version special?',
      answer:
        'PRO unlocks professional skinfold methods, higher accuracy with 2 decimal place precision, and can be shared with up to 5 family members.',
    },
    {
      question: 'Is there a subscription fee?',
      answer:
        'No! The PRO version is a one-time purchase of £9.99 / $9.99 / €9.99. You get lifetime access to all premium measurement methods and future updates. No hidden fees or subscriptions.',
    },
    {
      question: 'What equipment do I need?',
      answer: `Circumference methods only need a soft tape measure. Skinfold methods require calipers. We recommend professional-grade calipers like <a href='https://www.amazon.co.uk/Harpenden-Skinfold-Caliper-Calibration-Dowel/dp/B00289EHA0?crid=179GKCY0GZSID&nsdOptOutParam=true&sprefix=harpenden+calipers%2Caps%2C75&sr=8-5&linkCode=ll1&tag=bodyfatcalculator-21&linkId=2943e66b7223012cef58d3c029243c7c&language=en_GB&ref_=as_li_ss_tl' target='_blank' rel='noopener' class='text-[#FF0000] hover:text-[#FF0000]/90'>Harpenden</a> or <a href='https://www.amazon.co.uk/Lange-Calibration-Instruction-Percentage-Professional/dp/B00DD631G8?crid=179GKCY0GZSID&nsdOptOutParam=true&sprefix=harpenden+calipers%2Caps%2C75&sr=8-8&linkCode=ll1&tag=bodyfatcalculator-21&linkId=f30e96b3850d39000e3d1c53c74f8235&language=en_GB&ref_=as_li_ss_tl' target='_blank' rel='noopener' class='text-[#FF0000] hover:text-[#FF0000]/90'>Lange</a> for best results, though any calipers (like <a href='https://www.amazon.co.uk/CALIPER-MEASURING-Skinfold-Caliper-Measure/dp/B07B9Y5J7N?crid=2IU4GPJB8C0U0&nsdOptOutParam=true&refinements=p_85%3A20930949031&rnid=20930948031&rps=1&sprefix=body+calipers%2Caps%2C70&sr=8-5&linkCode=ll1&tag=bodyfatcalculator-21&linkId=60fe659fe6cb7399b48d403e938d77a8&language=en_GB&ref_=as_li_ss_tl' target='_blank' rel='noopener' class='text-[#FF0000] hover:text-[#FF0000]/90'>BOZEERA</a>) will work for getting started.`,
    },
  ],
  [
    {
      question: 'Can I use this professionally with clients?',
      answer:
        'Yes! The app is suitable for both personal and professional use. The multiple measurement methods and unit conversion features make it a practical tool for trainers working with clients.',
    },
    {
      question: 'Do you offer support?',
      answer: `Yes! We provide support for all users. If you have questions about measurements, formulas, or technical issues, contact us at <a href="mailto:support@bodyfatcalculator.pro" class="text-[#FF0000] hover:text-[#FF0000]/90">support@bodyfatcalculator.pro</a>.`,
    },
  ],
]

export function Faqs() {
  return (
    <section id="faqs" aria-labelledby="faqs-title" className="bg-gray-50 py-20 sm:py-32">
      <Container>
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 id="faqs-title" className="text-3xl font-semibold tracking-tight text-gray-900">
            Frequently asked questions
          </h2>
          <p className="mt-2 text-lg text-gray-700">
            Have more questions?{' '}
            <Link href="/faq" className="text-[#FF0000] hover:text-[#FF0000]/90">
              View all FAQs
            </Link>{' '}
            or{' '}
            <a
              href="mailto:support@bodyfatcalculator.pro"
              className="text-[#FF0000] hover:text-[#FF0000]/90"
            >
              contact our support team
            </a>
            .
          </p>
        </div>
        <ul className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:max-w-none lg:grid-cols-3">
          {faqs.map((column) => (
            <li key={column[0].question}>
              <ul className="space-y-10">
                {column.map((faq) => (
                  <li key={faq.question}>
                    <h3 className="text-lg font-semibold leading-6 text-gray-900">
                      {faq.question}
                    </h3>
                    <FaqText text={faq.answer} />
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
