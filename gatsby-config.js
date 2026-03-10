require(`dotenv`).config()

const shouldAnalyseBundle = process.env.ANALYSE_BUNDLE
const googleAnalyticsTrackingId = process.env.GOOGLE_ANALYTICS_ID

module.exports = {
  siteMetadata: {
    // You can overwrite values here that are used for the SEO component
    // You can also add new values here to query them like usual
    // See all options: https://github.com/LekoArts/gatsby-themes/blob/master/themes/gatsby-theme-minimal-blog/gatsby-config.js
    siteTitle: `Ken Davidson`,
    siteTitleAlt: `Ken Davidson - Husbanding, Fathering, Golfing and Developing`,
    siteHeadline: `Ken Davidson - Husbanding, Fathering, Golfing and Developing`,
    siteUrl: `https://kenjdavidson.com`,
    siteDescription: `I'm a husband and father who spends his free time golfing (as much as possible) and attempting to learn/play with a number of new technologies.  When something works out well (or terribly wrong) I do my best to document it.`,
    siteLanguage: `en`,
    siteImage: `/glorious.png`,
    author: `@kenjdavidson`,
  },
  plugins: [
    {
      resolve: `@lekoarts/gatsby-theme-minimal-blog`,
      // See the theme's README for all available options
      options: {
        navigation: [
          {
            title: `Writing`,
            slug: `/writing`,
          },
          {
            title: `About`,
            slug: `/about`,
          },
          {
            title: `Contact`,
            slug: `/contact`,
          },
        ],
        externalLinks: [
          // {
          //   name: `Twitter`,
          //   url: `https://twitter.com/lekoarts_de`,
          // },
        ],
        blogPath: '/writing',
        tagsPath: '/writing/tags',
        postsPrefix: '/writing',
        postsPath: `content/writing`,
        pagesPath: `content/pages`,
        formatString: `MMM DD, yyyy`
      },
    },
    googleAnalyticsTrackingId && {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.GOOGLE_ANALYTICS_ID,
      },
    },
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Ken Davidson - Husbanding, Fathering, Golfing and Developing...`,
        short_name: `Ken Davidson`,
        description: `Husbanding, Fathering, Golfing and Developing my way to retirement!!  Sometimes I document the successes and failres, but often times not.`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#17bb90`,
        display: `standalone`,
        icon: `static/glorious.png`,
        icons: [
          {
            src: `/static/Assets.xcassets/AppIcon.appiconset/196.png`,
            sizes: `192x192`,
            type: `image/png`,
          },
          {
            src: `/static/Assets.xcassets/AppIcon.appiconset/512.png`,
            sizes: `512x512`,
            type: `image/png`,
          },
        ],
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-gatsby-cloud`,
    `gatsby-plugin-netlify`,
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title: siteTitle
                description: siteDescription
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allPost } }) =>
              allPost.nodes.map((post) => {
                const url = site.siteMetadata.siteUrl + post.slug
                const content = `<p>${post.excerpt}</p><div style="margin-top: 50px; font-style: italic;"><strong><a href="${url}">Keep reading</a>.</strong></div><br /> <br />`

                return {
                  title: post.title,
                  date: post.date,
                  excerpt: post.excerpt,
                  url,
                  guid: url,
                  custom_elements: [{ "content:encoded": content }],
                }
              }),
            query: `
              {
                allPost(sort: { date: DESC }) {
                  nodes {
                    title
                    date(formatString: "MMMM D, YYYY")
                    excerpt
                    slug
                  }
                }
              }
            `,
            output: `rss.xml`,
            title: `Minimal Blog - @lekoarts/gatsby-theme-minimal-blog`,
          },
        ],
      },
    },
    shouldAnalyseBundle && {
      resolve: `gatsby-plugin-webpack-bundle-analyser-v2`,
      options: {
        analyzerMode: `static`,
        reportFilename: `_bundle.html`,
        openAnalyzer: false,
      },
    },
  ].filter(Boolean),
}
