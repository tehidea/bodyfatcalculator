/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.bodyfatcalculator.pro',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
  changefreq: 'weekly',
  priority: 0.7,
  generateIndexSitemap: false,
}
