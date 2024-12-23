import { Container } from '@/components/Container'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Frequently Asked Questions | Body Fat Calculator Pro',
  description:
    'Common questions and answers about body fat measurement methods, accuracy, techniques, and best practices.',
  keywords:
    'body fat FAQ, measurement questions, body fat accuracy, measurement techniques, body fat calculation help',
}

export default function FAQ() {
  return (
    <Container className="mt-16 sm:mt-32">
      <header className="max-w-3xl">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Frequently Asked Questions
        </h1>
        <p className="mt-6 text-base text-gray-600">
          Common questions and answers about body fat measurement methods,
          accuracy, and best practices.
        </p>
      </header>

      <div className="mt-16 sm:mt-20">
        <div className="md:border-l md:border-gray-100 md:pl-6">
          <div className="space-y-16">
            {/* General Questions */}
            <section>
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                General Questions
              </h2>
              <div className="mt-8 space-y-8">
                <article>
                  <h3 className="text-lg font-semibold text-gray-900">
                    What is body fat percentage?
                  </h3>
                  <p className="mt-4 text-gray-600">
                    Body fat percentage is the total mass of fat divided by
                    total body mass. It includes both essential fat (needed for
                    basic bodily functions) and storage fat. This measurement is
                    more meaningful than BMI for assessing body composition.
                  </p>
                </article>

                <article>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Which measurement method should I use?
                  </h3>
                  <p className="mt-4 text-gray-600">
                    The best method depends on your needs:
                  </p>
                  <ul className="mt-4 list-disc pl-6 text-gray-600">
                    <li>
                      YMCA Method: Quick and easy, good for regular tracking
                    </li>
                    <li>
                      Navy Method: Good balance of accuracy and simplicity
                    </li>
                    <li>
                      Skinfold Methods: Most accurate but require proper
                      technique
                    </li>
                  </ul>
                </article>

                <article>
                  <h3 className="text-lg font-semibold text-gray-900">
                    How often should I measure?
                  </h3>
                  <p className="mt-4 text-gray-600">
                    For most people, measuring every 2-4 weeks is sufficient.
                    Body fat changes slowly, and more frequent measurements may
                    not show meaningful changes. Consistency in timing and
                    conditions is more important than frequency.
                  </p>
                </article>
              </div>
            </section>

            {/* Accuracy Questions */}
            <section>
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                Accuracy & Reliability
              </h2>
              <div className="mt-8 space-y-8">
                <article>
                  <h3 className="text-lg font-semibold text-gray-900">
                    How accurate are these methods?
                  </h3>
                  <p className="mt-4 text-gray-600">
                    Accuracy varies by method:
                  </p>
                  <ul className="mt-4 list-disc pl-6 text-gray-600">
                    <li>YMCA Method: ±5-7% accuracy</li>
                    <li>Navy Method: ±4-6% accuracy</li>
                    <li>
                      Jackson & Pollock (7-site): ±3-4% accuracy when done
                      correctly
                    </li>
                  </ul>
                </article>

                <article>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Why do different methods give different results?
                  </h3>
                  <p className="mt-4 text-gray-600">
                    Each method uses different measurements and equations
                    optimized for specific populations. Variations can occur due
                    to differences in body type, measurement technique, and the
                    underlying assumptions of each method.
                  </p>
                </article>

                <article>
                  <h3 className="text-lg font-semibold text-gray-900">
                    How can I ensure accurate measurements?
                  </h3>
                  <ul className="mt-4 list-disc pl-6 text-gray-600">
                    <li>Measure at the same time of day</li>
                    <li>Use consistent measurement locations</li>
                    <li>Take multiple measurements and average them</li>
                    <li>Follow proper measurement techniques</li>
                    <li>Use quality measurement tools</li>
                  </ul>
                </article>
              </div>
            </section>

            {/* Technical Questions */}
            <section>
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                Technical Questions
              </h2>
              <div className="mt-8 space-y-8">
                <article>
                  <h3 className="text-lg font-semibold text-gray-900">
                    What equipment do I need?
                  </h3>
                  <div className="mt-4 space-y-4">
                    <p className="text-gray-600">
                      Required equipment depends on the method:
                    </p>
                    <ul className="list-disc pl-6 text-gray-600">
                      <li>Basic methods: Tape measure and scale</li>
                      <li>
                        Skinfold methods: Quality caliper (Harpenden, Lange, or
                        similar)
                      </li>
                      <li>All methods: Our app for calculations</li>
                    </ul>
                  </div>
                </article>

                <article>
                  <h3 className="text-lg font-semibold text-gray-900">
                    How do I take skinfold measurements?
                  </h3>
                  <p className="mt-4 text-gray-600">
                    Proper technique is crucial:
                  </p>
                  <ul className="mt-4 list-disc pl-6 text-gray-600">
                    <li>Grasp skin and fat between thumb and forefinger</li>
                    <li>Pull away from muscle</li>
                    <li>Place caliper 1cm below fingers</li>
                    <li>Read measurement within 2 seconds</li>
                    <li>Take 2-3 measurements at each site</li>
                  </ul>
                </article>
              </div>
            </section>

            {/* Interpretation Questions */}
            <section>
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                Interpreting Results
              </h2>
              <div className="mt-8 space-y-8">
                <article>
                  <h3 className="text-lg font-semibold text-gray-900">
                    What is a healthy body fat percentage?
                  </h3>
                  <div className="mt-4 space-y-4">
                    <p className="text-gray-600">
                      Healthy ranges vary by gender and age:
                    </p>
                    <div className="grid gap-8 sm:grid-cols-2">
                      <div>
                        <h4 className="font-medium text-gray-900">Men</h4>
                        <ul className="mt-2 list-disc pl-6 text-gray-600">
                          <li>Essential fat: 2-5%</li>
                          <li>Athletes: 6-13%</li>
                          <li>Fitness: 14-17%</li>
                          <li>Acceptable: 18-24%</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Women</h4>
                        <ul className="mt-2 list-disc pl-6 text-gray-600">
                          <li>Essential fat: 10-13%</li>
                          <li>Athletes: 14-20%</li>
                          <li>Fitness: 21-24%</li>
                          <li>Acceptable: 25-31%</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </article>

                <article>
                  <h3 className="text-lg font-semibold text-gray-900">
                    How quickly can body fat percentage change?
                  </h3>
                  <p className="mt-4 text-gray-600">
                    Healthy fat loss typically occurs at 0.5-1% per week with
                    proper diet and exercise. Faster changes may indicate water
                    weight fluctuations rather than true fat loss. Focus on
                    long-term trends rather than daily or weekly changes.
                  </p>
                </article>
              </div>
            </section>
          </div>
        </div>
      </div>
    </Container>
  )
}
