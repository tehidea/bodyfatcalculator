/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.bodyfatcalculator.pro',
  generateRobotsTxt: true,
  exclude: ['/guides', '/guides/*', '/formulas', '/formulas/*'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/guides', '/guides/*', '/formulas', '/formulas/*'],
      },
    ],
  },
  changefreq: 'weekly',
  priority: 0.7,
  generateIndexSitemap: false,
}
