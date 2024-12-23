import { Container } from '@/components/Container'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Body Fat Calculation Formulas | Body Fat Calculator Pro',
  description:
    'Detailed mathematical formulas and equations used in body fat calculation, including YMCA, U.S. Navy, Jackson & Pollock, and other scientifically validated methods.',
  keywords:
    'body fat formulas, body fat equations, YMCA formula, US Navy formula, Jackson Pollock equations, skinfold calculations',
}

export default function Formulas() {
  return (
    <Container className="mt-16 sm:mt-32">
      <header className="max-w-3xl">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Body Fat Calculation Formulas
        </h1>
        <p className="mt-6 text-base text-gray-600">
          Comprehensive documentation of the mathematical formulas and equations
          used in our body fat calculations.
        </p>
      </header>

      <div className="mt-16 sm:mt-20">
        <div className="md:border-l md:border-gray-100 md:pl-6">
          <div className="space-y-16">
            {/* YMCA Formulas */}
            <section>
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                YMCA Method Formulas
              </h2>
              <div className="mt-8 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    For Men
                  </h3>
                  <div className="mt-4 rounded-lg bg-gray-50 p-6">
                    <p className="font-mono text-sm text-gray-800">
                      Body Fat % = ((4.15 × Waist) - (0.082 × Weight) - 98.42) /
                      Weight × 100
                    </p>
                    <p className="mt-4 text-sm text-gray-600">
                      Where:
                      <br />
                      Waist = waist circumference in inches
                      <br />
                      Weight = body weight in pounds
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    For Women
                  </h3>
                  <div className="mt-4 rounded-lg bg-gray-50 p-6">
                    <p className="font-mono text-sm text-gray-800">
                      Body Fat % = ((4.15 × Waist) - (0.082 × Weight) - 76.76) /
                      Weight × 100
                    </p>
                    <p className="mt-4 text-sm text-gray-600">
                      Where:
                      <br />
                      Waist = waist circumference in inches
                      <br />
                      Weight = body weight in pounds
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* U.S. Navy Method */}
            <section>
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                U.S. Navy Method
              </h2>
              <div className="mt-8 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    For Men
                  </h3>
                  <div className="mt-4 rounded-lg bg-gray-50 p-6">
                    <p className="font-mono text-sm text-gray-800">
                      Body Fat % = 86.010 × log₁₀(Waist - Neck) - 70.041 ×
                      log₁₀(Height) + 36.76
                    </p>
                    <p className="mt-4 text-sm text-gray-600">
                      Where:
                      <br />
                      Waist, Neck, Height = measurements in inches
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    For Women
                  </h3>
                  <div className="mt-4 rounded-lg bg-gray-50 p-6">
                    <p className="font-mono text-sm text-gray-800">
                      Body Fat % = 163.205 × log₁₀(Waist + Hip - Neck) - 97.684
                      × log₁₀(Height) - 78.387
                    </p>
                    <p className="mt-4 text-sm text-gray-600">
                      Where:
                      <br />
                      Waist, Hip, Neck, Height = measurements in inches
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Jackson & Pollock Methods */}
            <section>
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                Jackson & Pollock Methods
              </h2>
              <div className="mt-8 space-y-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    3-Site Formula (Men)
                  </h3>
                  <div className="mt-4 rounded-lg bg-gray-50 p-6">
                    <p className="font-mono text-sm text-gray-800">
                      Density = 1.10938 - (0.0008267 × X) + (0.0000016 × X²) -
                      (0.0002574 × Age)
                    </p>
                    <p className="mt-4 text-sm text-gray-600">
                      Where:
                      <br />
                      X = Sum of chest, abdomen, and thigh skinfolds (mm)
                      <br />
                      Age = age in years
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    3-Site Formula (Women)
                  </h3>
                  <div className="mt-4 rounded-lg bg-gray-50 p-6">
                    <p className="font-mono text-sm text-gray-800">
                      Density = 1.0994921 - (0.0009929 × X) + (0.0000023 × X²) -
                      (0.0001392 × Age)
                    </p>
                    <p className="mt-4 text-sm text-gray-600">
                      Where:
                      <br />
                      X = Sum of tricep, suprailiac, and thigh skinfolds (mm)
                      <br />
                      Age = age in years
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    7-Site Formula
                  </h3>
                  <div className="mt-4 rounded-lg bg-gray-50 p-6">
                    <p className="font-mono text-sm text-gray-800">
                      Density = 1.112 - (0.00043499 × X) + (0.00000055 × X²) -
                      (0.00028826 × Age)
                    </p>
                    <p className="mt-4 text-sm text-gray-600">
                      Where:
                      <br />X = Sum of chest, midaxillary, triceps, subscapular,
                      abdomen, suprailiac, and thigh skinfolds (mm)
                      <br />
                      Age = age in years
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Siri's Equation */}
            <section>
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                Siri's Equation
              </h2>
              <div className="mt-8">
                <p className="text-gray-600">
                  Used to convert body density to body fat percentage in all
                  skinfold methods:
                </p>
                <div className="mt-4 rounded-lg bg-gray-50 p-6">
                  <p className="font-mono text-sm text-gray-800">
                    Body Fat % = (495 / Body Density) - 450
                  </p>
                </div>
              </div>
            </section>

            {/* Unit Conversions */}
            <section>
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                Unit Conversions
              </h2>
              <div className="mt-8 space-y-6">
                <div className="grid gap-8 sm:grid-cols-2">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Weight
                    </h3>
                    <div className="mt-4 rounded-lg bg-gray-50 p-6">
                      <p className="font-mono text-sm text-gray-800">
                        1 kg = 2.20462 lbs
                      </p>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Length
                    </h3>
                    <div className="mt-4 rounded-lg bg-gray-50 p-6">
                      <p className="font-mono text-sm text-gray-800">
                        1 cm = 0.393701 inches
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </Container>
  )
}
