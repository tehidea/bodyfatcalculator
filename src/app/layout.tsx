import { Montserrat } from 'next/font/google'
import clsx from 'clsx'
import Script from 'next/script'
import { GoogleTagManager } from '@next/third-parties/google'
import { CSPostHogProvider } from './providers'
import UmamiProvider from 'next-umami'

import '@/styles/tailwind.css'
import '@/styles/globals.css'
import 'katex/dist/katex.min.css'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700'],
  variable: '--font-montserrat',
  display: 'swap',
  preload: true,
})

export const metadata = {
  title: 'Body Fat Calculator (PRO)',
  description:
    'Professional-grade body fat measurement app with multiple scientifically validated methods.',
  metadataBase: new URL('https://bodyfatcalculator.pro'),
  openGraph: {
    title: 'Body Fat Calculator (PRO)',
    description:
      'Professional-grade body fat measurement app with multiple scientifically validated methods.',
    url: 'https://bodyfatcalculator.pro',
    siteName: 'Body Fat Calculator (PRO)',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'Body Fat Calculator (PRO) - Professional Body Fat Measurement Tool',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Body Fat Calculator (PRO)',
    description:
      'Professional-grade body fat measurement app with multiple scientifically validated methods.',
    images: ['/og.png'],
    creator: '@bodyfatcalcpro',
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.png', sizes: '32x32', type: 'image/png' },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={clsx(
        'bg-[#333333] text-white antialiased',
        montserrat.className,
      )}
    >
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2117029955778880"
          crossOrigin="anonymous"
        />
        <Script id="klaro-config" strategy="beforeInteractive">
          {`
            window.klaroConfig = {
              version: 1,
              elementID: 'klaro',
              styling: {
                theme: ['dark', 'bottom', 'wide'],
                vars: {
                  '--font-family': 'var(--font-montserrat)',
                  '--border-radius': '0.5rem',
                  '--border-width': '2px',
                  '--button-border-radius': '0.5rem',
                  '--button-gap': '0.5rem',
                  '--button-padding': '0.75rem 1rem',
                  '--dark1': '#333333',
                  '--dark2': '#333333',
                  '--dark3': '#333333',
                  '--white1': '#FFFFFF',
                  '--white2': '#FFFFFF',
                  '--white3': '#FFFFFF',
                  /* Decline button - grey */
                  '--red1': '#9CA3AF',
                  '--red2': '#9CA3AF',
                  '--red3': '#9CA3AF',
                  /* Accept selected - red outline */
                  '--yellow1': '#EF4444',
                  '--yellow2': '#EF4444',
                  '--yellow3': '#EF4444',
                  /* Accept all - red filled */
                  '--green1': '#EF4444',
                  '--green2': '#EF4444',
                  '--green3': '#DC2626',
                  /* Additional green variables to ensure complete coverage */
                  '--green4': '#EF4444',
                  '--green5': '#DC2626',
                  '--success': '#EF4444',
                  '--success-bg': '#EF4444',
                  /* Gray variables */
                  '--gray0': '#333333',
                  '--gray1': '#333333',
                  '--gray2': '#333333',
                  '--gray3': '#333333',
                  '--gray4': '#333333',
                  '--gray5': '#333333',
                },
              },
              noAutoLoad: false,
              htmlTexts: true,
              embedded: false,
              groupByPurpose: true,
              storageMethod: 'cookie',
              cookieName: 'klaro',
              cookieExpiresAfterDays: 365,
              default: true,
              mustConsent: false,
              acceptAll: true,
              hideDeclineAll: true,
              hideLearnMore: false,
              translations: {
                en: {
                  privacyPolicyUrl: '/privacy-policy',
                  consentModal: {
                    title: 'Cookie Settings',
                    description: 'We use cookies for advertising purposes and cross-platform analytics. You can choose to accept or decline these cookies at any time. Our analytics tools (Umami and PostHog) are privacy-focused and do not set cookies or track personal data.',
                  },
                  purposes: {
                    advertising: 'Advertising',
                    analytics: 'Analytics',
                  },
                  ok: "Accept Selected",
                  acceptAll: "Accept All",
                  decline: "Decline",
                  close: "Close",
                  service: {
                    purpose: 'Purpose',
                    purposes: 'Purposes',
                    required: {
                      title: 'Required',
                      description: 'These services are required for the basic functionality of the website.',
                    },
                  },
                },
              },
              services: [
                {
                  name: 'google-adsense',
                  title: 'Google AdSense',
                  purposes: ['advertising'],
                  cookies: [
                    /^__gads/,
                    /^__gpi/,
                    /^_gcl_au/
                  ],
                  required: false,
                  default: true,
                  onInit: \`
                    window.dataLayer = window.dataLayer || [];
                    window.gtag = function(){dataLayer.push(arguments)};
                    gtag('consent', 'default', {
                      'ad_storage': 'denied',
                      'ad_user_data': 'denied',
                      'ad_personalization': 'denied'
                    });
                  \`,
                  onAccept: \`
                    gtag('consent', 'update', {
                      'ad_storage': 'granted',
                      'ad_user_data': 'granted',
                      'ad_personalization': 'granted'
                    });
                    // Reload ads after consent is granted
                    (adsbygoogle = window.adsbygoogle || []).requestNonPersonalizedAds = 0;
                    (adsbygoogle = window.adsbygoogle || []).pauseAdRequests = 0;
                  \`,
                  onDecline: \`
                    gtag('consent', 'update', {
                      'ad_storage': 'denied',
                      'ad_user_data': 'denied',
                      'ad_personalization': 'denied'
                    });
                    // Request non-personalized ads
                    (adsbygoogle = window.adsbygoogle || []).requestNonPersonalizedAds = 1;
                    (adsbygoogle = window.adsbygoogle || []).pauseAdRequests = 0;
                  \`,
                },
                {
                  name: 'google-tag-manager',
                  title: 'Google Tag Manager',
                  purposes: ['analytics', 'advertising'],
                  cookies: [
                    /^_ga/,
                    /^_gid/,
                    /^_gat/,
                    /^_gcl_/,
                    /^_gac_/,
                    /^_gtm/
                  ],
                  required: false,
                  default: true,
                  onInit: \`
                    // GTM consent will be handled by the GTM component itself
                    // This ensures proper initialization with consent framework
                  \`,
                  onAccept: \`
                    // Update consent for GTM
                    if (window.gtag) {
                      gtag('consent', 'update', {
                        'analytics_storage': 'granted',
                        'ad_storage': 'granted',
                        'ad_user_data': 'granted',
                        'ad_personalization': 'granted'
                      });
                    }
                  \`,
                  onDecline: \`
                    // Deny consent for GTM
                    if (window.gtag) {
                      gtag('consent', 'update', {
                        'analytics_storage': 'denied',
                        'ad_storage': 'denied',
                        'ad_user_data': 'denied',
                        'ad_personalization': 'denied'
                      });
                    }
                  \`,
                }
              ],
            };
          `}
        </Script>
        <Script
          src="https://cdn.kiprotect.com/klaro/v0.7/klaro.js"
          strategy="afterInteractive"
          data-config="klaroConfig"
        />

        {/* Google AdSense */}
        <Script id="adsense-consent" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('consent', 'default', {
              'ad_storage': 'denied',
              'ad_user_data': 'denied',
              'ad_personalization': 'denied'
            });
          `}
        </Script>

        {/* Umami Analytics */}
        <UmamiProvider
          websiteId="08d37384-c0c6-4d05-9ed7-aac2e0fcbba7"
          src="https://umami.tehidea.cloud/hello.js"
        />

        <style>
          {`
            /* Modal container */
            .klaro .cookie-modal .cm-modal {
              margin: 0 1rem !important;
              max-width: calc(100% - 2rem) !important;
              border-radius: 1rem !important;
            }

            @media (min-width: 640px) {
              .klaro .cookie-modal .cm-modal {
                max-width: 42rem !important;
                margin: 2rem auto !important;
                border-radius: 1rem !important;
              }
            }

            /* Responsive padding */
            .klaro .cookie-modal .cm-header,
            .klaro .cookie-modal .cm-body,
            .klaro .cookie-modal .cm-footer {
              padding: 01.5rem !important;
            }

            @media (min-width: 640px) {
              .klaro .cookie-modal .cm-header,
              .klaro .cookie-modal .cm-body,
              .klaro .cookie-modal .cm-footer {
                padding: 1.5rem 2rem !important;
              }
            }

            @media (min-width: 1024px) {
              .klaro .cookie-modal .cm-header,
              .klaro .cookie-modal .cm-body,
              .klaro .cookie-modal .cm-footer {
                padding: 2rem 3rem !important;
              }
            }

            .klaro .cookie-modal .cm-header h1 {
              font-size: 1.25rem !important;
              line-height: 1.75rem !important;
              font-weight: 600 !important;
              margin-bottom: 1rem !important;
            }

            .klaro .cookie-modal .cm-list-label .slider {
              background-color: #505050 !important;
              box-shadow: none !important;
            }

            .klaro .cookie-modal .cm-caret a {
              font-size: 0.75rem !important;
            }

            .klaro .cookie-modal a {
              color: #9CA3AF !important;
            }

            .klaro .cookie-modal .cm-list-description {
              padding-top: 0 !important;
            }

            /* Button container */
            .klaro .cookie-modal .cm-footer-buttons {
              display: flex !important;
              flex-wrap: wrap !important;
              gap: 0.75rem !important;
              justify-content: flex-end !important;
            }

            /* Override Klaro button styles */
            .klaro .cookie-modal .cm-btn {
              font-weight: 500 !important;
              transition: all 200ms ease-in-out !important;
              background: transparent !important;
              border-width: 1px !important;
              border-style: solid !important;
              padding: 0.5rem 1rem !important;
              border-radius: 0.5rem !important;
              font-size: 0.875rem !important;
              line-height: 1.5rem !important;
            }

            @media (min-width: 640px) {
              .klaro .cookie-modal .cm-btn {
                padding: 0.625rem 1.25rem !important;
              }
            }

            /* Decline button - grey */
            .klaro .cookie-modal .cm-btn-danger {
              color: #9CA3AF !important;
              border-color: #9CA3AF !important;
            }
            .klaro .cookie-modal .cm-btn-danger:hover {
              background: rgba(156, 163, 175, 0.1) !important;
            }

            /* Accept selected - red outline */
            .klaro .cookie-modal .cm-btn-info {
              color: #EF4444 !important;
              border-color: #EF4444 !important;
            }
            .klaro .cookie-modal .cm-btn-info:hover {
              background: rgba(239, 68, 68, 0.1) !important;
            }

            /* Accept all - red filled */
            .klaro .cookie-modal .cm-btn-accept-all {
              color: #FFFFFF !important;
              border-color: #EF4444 !important;
              background: #EF4444 !important;
            }
            .klaro .cookie-modal .cm-btn-accept-all:hover {
              border-color: #DC2626 !important;
              background: #DC2626 !important;
            }

            /* Hide powered by */
            .klaro .cookie-modal .cm-powered-by {
              display: none !important;
            }

            /* Cookie Notice Styles (Bottom Banner) */
            .klaro .cookie-notice {
              background: #333333 !important;
              border-radius: 0.5rem !important;
              border: 1px solid rgba(255, 255, 255, 0.1) !important;
              box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06) !important;
              width: calc(100% - 2rem) !important;
              max-width: 42rem !important;
              margin: 1rem auto !important;
              left: 0 !important;
              right: 0 !important;
              bottom: 0 !important;
              padding: 1rem !important;
            }

            /* Cookie notice content */
            .klaro .cookie-notice .cn-body {
              padding: 0 !important;
            }

            .klaro .cookie-notice .cn-body p {
              margin-bottom: 0.75rem !important;
              font-size: 0.875rem !important;
              line-height: 1.5 !important;
            }

            @media (max-width: 640px) {
              .klaro .cookie-notice {
                width: calc(100% - 1rem) !important;
                margin: 0.5rem auto !important;
                padding: 0.75rem !important;
              }
              
              .klaro .cookie-notice .cn-body p {
                font-size: 0.8125rem !important;
                margin-bottom: 0.5rem !important;
              }
            }

            /* Cookie Notice Buttons */
            .klaro .cookie-notice .cn-body .cn-ok {
              display: flex !important;
              flex-wrap: wrap !important;
              gap: 0.75rem !important;
              margin-top: 1rem !important;
              align-items: center !important;
            }

            @media (max-width: 640px) {
              .klaro .cookie-notice .cn-body .cn-ok {
                flex-direction: column !important;
                align-items: stretch !important;
                gap: 0.5rem !important;
              }
              
              .klaro .cookie-notice .cn-body .cn-ok .cm-link {
                margin-right: 0 !important;
                margin-bottom: 0.5rem !important;
                text-align: center !important;
              }
              
              .klaro .cookie-notice .cn-body .cn-ok .cm-btn {
                width: 100% !important;
                padding: 0.75rem 1rem !important;
              }
            }

            /* Learn More Link */
            .klaro .cookie-notice .cn-body .cn-ok .cm-link {
              color: #9CA3AF !important;
              text-decoration: none !important;
              font-size: 0.875rem !important;
              line-height: 1.5rem !important;
              font-weight: 500 !important;
              margin-right: auto !important;
            }

            /* Button Styles for Notice */
            .klaro .cookie-notice .cn-body .cn-ok .cm-btn {
              font-weight: 500 !important;
              transition: all 200ms ease-in-out !important;
              border-width: 1px !important;
              border-style: solid !important;
              padding: 0.5rem 1rem !important;
              border-radius: 0.5rem !important;
              font-size: 0.875rem !important;
              line-height: 1.5rem !important;
            }

            /* Success Button (Accept Selected) - should be red */
            .klaro .cookie-notice .cn-body .cn-ok .cm-btn-success {
              color: #FFFFFF !important;
              border-color: #EF4444 !important;
              background: #EF4444 !important;
            }
            .klaro .cookie-notice .cn-body .cn-ok .cm-btn-success:hover {
              border-color: #DC2626 !important;
              background: #DC2626 !important;
            }
          `}
        </style>

        {/* Preconnect to required origins */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://pagead2.googlesyndication.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://cdn.kiprotect.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://www.googletagmanager.com"
          crossOrigin="anonymous"
        />

        {/* DNS prefetch for performance */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />
        <link rel="dns-prefetch" href="https://cdn.kiprotect.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      </head>
      <CSPostHogProvider>
        <body>
          {/* Google Tag Manager */}
          {process.env.NEXT_PUBLIC_GTM_ID && (
            <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID} />
          )}
          {children}
          <Script id="klaro-init" strategy="afterInteractive">
            {`
              // Add a utility function to the window object to manage Klaro consent
              window.manageConsent = {
                // Show the consent modal programmatically
                showModal: function() {
                  if (window.klaro) {
                    window.klaro.show(window.klaroConfig);
                  }
                },
                // Reset consent (useful when privacy policy changes)
                resetConsent: function() {
                  if (window.klaro) {
                    // Delete the klaro cookie
                    document.cookie = 'klaro=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
                    // Show the modal again
                    window.klaro.show(window.klaroConfig);
                  }
                },
                // Check if consent has been given
                hasConsent: function(service) {
                  if (window.klaro?.getManager?.()) {
                    return window.klaro.getManager().getConsent(service);
                  }
                  return null;
                }
              };
              
              window.addEventListener('load', () => {
                if (window.klaro) {
                  // Only show the consent modal if consent hasn't been given yet
                  const consentCookie = document.cookie.split('; ').find(row => row.startsWith('klaro='));
                  if (!consentCookie) {
                    window.klaro.show(window.klaroConfig);
                  }
                }
              });
            `}
          </Script>
        </body>
      </CSPostHogProvider>
    </html>
  )
}
