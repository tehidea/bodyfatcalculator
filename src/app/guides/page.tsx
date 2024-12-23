import { Container } from '@/components/Container'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Body Fat Measurement Guides | Body Fat Calculator Pro',
  description:
    'Step-by-step guides for accurate body fat measurements using various methods including skinfold calipers, tape measures, and circumference measurements.',
  keywords:
    'body fat measurement guide, skinfold measurement, caliper technique, circumference measurements, body fat testing guide',
}

export default function Guides() {
  return (
    <Container className="mt-16 sm:mt-32">
      <header className="max-w-3xl">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Measurement Guides
        </h1>
        <p className="mt-6 text-base text-gray-600">
          Comprehensive guides for accurate body fat measurements using various
          methods and tools.
        </p>
      </header>

      <div className="mt-16 sm:mt-20">
        <div className="md:border-l md:border-gray-100 md:pl-6">
          <div className="space-y-16">
            {/* General Guidelines */}
            <section>
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                General Guidelines
              </h2>
              <div className="mt-8 space-y-6">
                <p className="text-gray-600">
                  Follow these general guidelines for all measurement methods:
                </p>
                <ul className="list-disc pl-6 text-gray-600">
                  <li>Measure in the morning before eating or drinking</li>
                  <li>Wait at least 4 hours after exercise</li>
                  <li>Use the same measurement tools consistently</li>
                  <li>Take measurements on the right side of the body</li>
                  <li>
                    Take each measurement 2-3 times and average the results
                  </li>
                  <li>Record measurements immediately</li>
                </ul>
              </div>
            </section>

            {/* Skinfold Measurements */}
            <section>
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                Skinfold Measurements
              </h2>
              <div className="mt-8 space-y-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Caliper Technique
                  </h3>
                  <ul className="mt-4 list-decimal pl-6 text-gray-600">
                    <li>
                      Grasp the skin and fat firmly between thumb and forefinger
                    </li>
                    <li>Pull the fold away from the underlying muscle</li>
                    <li>
                      Place caliper jaws perpendicular to the fold,
                      approximately 1 cm below your fingers
                    </li>
                    <li>Release caliper pressure and read within 2 seconds</li>
                    <li>Take 2-3 measurements at each site</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Measurement Sites
                  </h3>
                  <div className="mt-6 grid gap-8 sm:grid-cols-2">
                    <div>
                      <h4 className="font-medium text-gray-900">
                        Upper Body Sites
                      </h4>
                      <ul className="mt-4 list-disc pl-6 text-gray-600">
                        <li>
                          Triceps: Vertical fold on back of upper arm, halfway
                          between shoulder and elbow
                        </li>
                        <li>
                          Biceps: Vertical fold on front of upper arm, at peak
                          of biceps
                        </li>
                        <li>
                          Subscapular: Diagonal fold just below shoulder blade
                        </li>
                        <li>
                          Chest: Diagonal fold halfway between nipple and armpit
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">
                        Lower Body Sites
                      </h4>
                      <ul className="mt-4 list-disc pl-6 text-gray-600">
                        <li>Suprailiac: Diagonal fold just above hip bone</li>
                        <li>Abdominal: Vertical fold 2cm to right of navel</li>
                        <li>
                          Thigh: Vertical fold on front of thigh, halfway
                          between hip and knee
                        </li>
                        <li>
                          Calf: Vertical fold on inside of calf at maximum
                          circumference
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Circumference Measurements */}
            <section>
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                Circumference Measurements
              </h2>
              <div className="mt-8 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Tape Measure Technique
                  </h3>
                  <ul className="mt-4 list-decimal pl-6 text-gray-600">
                    <li>Keep the tape measure level around the body</li>
                    <li>
                      Apply consistent tension (snug but not compressing the
                      skin)
                    </li>
                    <li>Take measurements at the end of a normal exhale</li>
                    <li>Read the tape measure at eye level</li>
                    <li>Avoid clothing when possible</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Measurement Locations
                  </h3>
                  <ul className="mt-4 list-disc pl-6 text-gray-600">
                    <li>
                      Neck: Around the neck at the larynx (Adam's apple),
                      keeping the tape level
                    </li>
                    <li>
                      Waist: At the narrowest point, typically just above the
                      belly button
                    </li>
                    <li>Hip: At the widest point around the buttocks</li>
                    <li>
                      Chest: At nipple level for men, at the fullest part for
                      women
                    </li>
                    <li>
                      Arms: At the midpoint between shoulder and elbow, relaxed
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Common Mistakes */}
            <section>
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                Common Mistakes to Avoid
              </h2>
              <div className="mt-8">
                <ul className="list-disc pl-6 text-gray-600">
                  <li>Pulling the tape measure or caliper too tight</li>
                  <li>Taking measurements immediately after exercise</li>
                  <li>Measuring through thick or loose clothing</li>
                  <li>Inconsistent measurement locations between sessions</li>
                  <li>Not maintaining a neutral posture during measurements</li>
                  <li>Taking only single measurements instead of averages</li>
                  <li>Using different measurement tools between sessions</li>
                </ul>
              </div>
            </section>

            {/* Tips for Accuracy */}
            <section>
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                Tips for Maximum Accuracy
              </h2>
              <div className="mt-8">
                <ul className="list-disc pl-6 text-gray-600">
                  <li>
                    Practice the measurement techniques before recording results
                  </li>
                  <li>
                    Use anatomical landmarks to ensure consistent measurement
                    locations
                  </li>
                  <li>
                    Document the exact measurement locations for future
                    reference
                  </li>
                  <li>
                    Consider having measurements taken by a trained professional
                    initially
                  </li>
                  <li>Keep a log of measurements with dates and conditions</li>
                  <li>
                    Use high-quality measurement tools and maintain them
                    properly
                  </li>
                </ul>
              </div>
            </section>
          </div>
        </div>
      </div>
    </Container>
  )
}
