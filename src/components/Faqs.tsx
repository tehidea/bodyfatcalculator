import { Container } from '@/components/Container'
import DOMPurify from 'isomorphic-dompurify'

function FaqText({ text }: { text: string }) {
  const sanitizedHtml = DOMPurify.sanitize(text, {
    ALLOWED_TAGS: ['a'],
    ALLOWED_ATTR: ['href', 'target', 'rel', 'class'],
  })

  return (
    <p
      className="mt-4 text-sm text-gray-600"
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
    />
  )
}

const faqs = [
  [
    {
      question: 'How accurate are the measurements?',
      answer:
        'When measurements are done right, you can expect accuracy of ±3-4%. The key is consistent technique and site location. For best results, take measurements in the morning before eating or drinking.',
    },
    {
      question: 'What equipment do I need?',
      answer:
        "You'll need a body fat caliper (also known as skinfold calipers). We recommend using professional-grade calipers like Harpenden or Lange for best results, though any calipers (like <a href='https://www.amazon.co.uk/CALIPER-MEASURING-Skinfold-Caliper-Measure/dp/B07B9Y5J7N?crid=2IU4GPJB8C0U0&nsdOptOutParam=true&refinements=p_85%3A20930949031&rnid=20930948031&rps=1&sprefix=body+calipers%2Caps%2C70&sr=8-5&linkCode=ll1&tag=bodyfatcalculator-21&linkId=60fe659fe6cb7399b48d403e938d77a8&language=en_GB&ref_=as_li_ss_tl' target='_blank' rel='noopener' class='text-[#FF0000] hover:text-[#FF0000]/90'>BOZEERA</a> etc) will work.",
    },
    {
      question: 'Which measurement method should I choose?',
      answer:
        'For most people, we recommend starting with the Jackson & Pollock 3-site method. It provides a good balance of accuracy and simplicity. As you get more comfortable with measurements, you can try the 7-site method for potentially better accuracy.',
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
        'We recommend measuring every 2-4 weeks. This interval allows enough time to see meaningful changes while maintaining consistent progress tracking. Always measure at the same time of day (preferably morning) for best results.',
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
        'No! The PRO version is a one-time purchase of £10. You get lifetime access to all premium measurement methods and future updates. No hidden fees or subscriptions.',
    },
    {
      question: 'Why are some measurements gender-specific?',
      answer:
        'Body fat distribution varies significantly between males and females. Gender-specific formulas help account for these natural differences, improving the accuracy of your results.',
    },
    {
      question: 'Do you offer support?',
      answer:
        'Yes! We provide support for all users. If you have questions about measurements, formulas, or technical issues, contact us at support@bodyfatcalculator.pro.',
    },
  ],
]

export function Faqs() {
  return (
    <section
      id="faqs"
      aria-labelledby="faqs-title"
      className="bg-gray-50 py-20 sm:py-32"
    >
      <Container>
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2
            id="faqs-title"
            className="text-3xl font-semibold tracking-tight text-gray-900"
          >
            Frequently asked questions
          </h2>
          <p className="mt-2 text-lg text-gray-700">
            Have more questions?{' '}
            <a
              href="mailto:support@bodyfatcalculator.pro"
              className="text-[#FF0000] hover:text-[#FF0000]/90"
            >
              Contact our support team
            </a>
            .
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:max-w-none lg:grid-cols-3"
        >
          {faqs.map((column, columnIndex) => (
            <li key={columnIndex}>
              <ul role="list" className="space-y-10">
                {column.map((faq, faqIndex) => (
                  <li key={faqIndex}>
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
