require('dotenv').config({
  path: `.env`,
})

module.exports = {
  flags: {
    DEV_SSR: process.env.GATSBY_ENABLE_DEV_SSR === 'true',
  },
  siteMetadata: {
    title: 'Lorem ipsum',
    description: 'Lorem ipsum',
    siteUrl: `https://www.loremipsum.com/`,
  },
  plugins: [
    'gatsby-plugin-image',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    'gatsby-transformer-json',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/src/constants`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Xbox Social Intake Form`,
        short_name: `Xbox`,
        start_url: `/`,
        background_color: `#f7f0eb`,
        theme_color: `#a2466c`,
        display: `standalone`,
        icon: `${__dirname}/src/images/icons/favicon.svg`, // Add this line to specify the path to your favicon
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-transition-link',
    'gatsby-plugin-postcss',
    `gatsby-plugin-styled-components`,
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /images/,
        },
      },
    },
    {
      resolve: `gatsby-plugin-s3`,
      options: {
        bucketName: process.env.AWS_TARGET_BUCKET_NAME || 'qa-1',
        acl: null,
        generateRedirectObjectsForPermanentRedirects: true,
      },
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [
          process.env.GATSBY_GOOGLE_ANALYTICS_TAG || 'G-QYPBFM7TYN', // Google Analytics / GA tag for prod
          process.env.GATSBY_GOOGLE_ADS_TAG || 'AW-11079894524', // Google Ads
          process.env.GATSBY_GOOGLE_DV360_TAG || 'DC-12877763', // Google DV360
        ],
        pluginConfig: {
          // Puts tracking script in the head instead of the body
          head: true,
          // Setting this parameter is also optional
          exclude: ['/preview/**'],
          // Defaults to https://www.googletagmanager.com
          // Delays processing pageview events on route update (in milliseconds)
          delayOnRouteUpdate: 1000,
        },
      },
    },
    {
      resolve: `gatsby-plugin-facebook-pixel`,
      options: {
        pixelId: process.env.GATSBY_FACEBOOK_PIXEL || '3468708050011410',
      },
    },
  ],
  jsxRuntime: 'automatic',
}
