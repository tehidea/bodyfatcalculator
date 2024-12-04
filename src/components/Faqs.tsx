import { Container } from '@/components/Container'

const faqs = [
  [
    {
      question: 'How accurate are the measurements?',
      answer:
        'Our app offers multiple methods with varying accuracy levels. Premium caliper methods (Jackson & Pollock) achieve ±1-2% accuracy when done correctly, while the US Navy method offers ±3-4% accuracy using just a tape measure. All our methods are scientifically validated and calibrated against gold-standard techniques.',
    },
    {
      question: 'What equipment do I need?',
      answer:
        'It depends on your chosen method. For basic measurements (US Navy), you only need a tape measure. For premium caliper methods, we recommend professional-grade calipers like Harpenden or Lange. Our app includes detailed guides for both types of measurements.',
    },
    {
      question: 'Which measurement method should I choose?',
      answer:
        'For beginners or quick checks, start with the US Navy method - it only requires a tape measure. For professional accuracy, use the Jackson & Pollock 7-site method with calipers. The app will guide you through the best method based on your equipment and experience level.',
    },
  ],
  [
    {
      question: 'What makes the PRO version special?',
      answer:
        'PRO unlocks 6 premium measurement methods (including J&P 3,4,7-site), unlimited measurement storage, detailed analytics, progress tracking, professional PDF reports, and data export. Perfect for trainers and serious fitness enthusiasts.',
    },
    {
      question: 'How often should I measure?',
      answer:
        'We recommend measuring every 2-4 weeks. This interval allows enough time to see meaningful changes while maintaining consistent progress tracking. Always measure at the same time of day (preferably morning) for best results.',
    },
    {
      question: 'Can I use this professionally with clients?',
      answer:
        'Absolutely! The PRO version is designed for professional use with features like client management, white-label PDF reports, and data export. Many trainers and nutritionists trust our app for their client assessments.',
    },
  ],
  [
    {
      question: 'Is there a subscription fee?',
      answer:
        'No! The PRO version is a one-time purchase of £10. You get lifetime access to all premium features and future updates. No hidden fees or subscriptions.',
    },
    {
      question: 'Why are some measurements gender-specific?',
      answer:
        'Body fat distribution varies significantly between males and females. Gender-specific measurements (like hip circumference for women) help account for these natural differences, improving the accuracy of your results.',
    },
    {
      question: 'Do you offer professional support?',
      answer:
        'Yes! We provide dedicated support for fitness professionals, including training materials, measurement guides, and technical assistance. Contact us at support@bodyfatcalculator.pro for professional inquiries.',
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
                    <p className="mt-4 text-sm text-gray-600">{faq.answer}</p>
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
