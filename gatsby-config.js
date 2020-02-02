/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  siteMetadata: {
    title: "Ken J Davidson",
    siteUrl: "https://www.kenjdavidson.com",
    description: "Husbanding, fathering, golfing and developing my way to retirement!",
    links: [{
      title: "Blog",
      href: "/blog"
    }],
    social: [{
      name: "github",
      account: "kenjdavidson",
      profile: "https://www.github.com/kenjdavidson",
      icon: "fab github"
    }]
  },
  plugins: [
    {
      // https://www.gatsbyjs.org/packages/gatsby-source-filesystem/
      // Read from any number of source folders into JSON nodes
      resolve: "gatsby-source-filesystem",  
      options: {
        name: "pages",
        path: `${__dirname}/src/pages`,
      },
    },
    {
      // ttps://www.gatsbyjs.org/packages/gatsby-source-filesystem/
      // Read from any number of source folders into JSON nodes
      resolve: "gatsby-source-filesystem",  
      options: {
        name: "posts",
        path: `${__dirname}/src/posts`,
      },
    },
     // https://www.gatsbyjs.org/packages/gatsby-plugin-react-helmet/
     // https://github.com/nfl/react-helmet
    "gatsby-plugin-react-helmet",      
    {
      // https://www.gatsbyjs.org/packages/gatsby-plugin-typography/
      // https://kyleamathews.github.io/typography.js/
      resolve: "gatsby-plugin-typography",  
      options: {
        pathToConfigModule: "src/utils/typography",
      },
    },
    {
      // https://www.gatsbyjs.org/packages/gatsby-transformer-remark/?=
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          {
            resolve: "gatsby-remark-prismjs",
            options: {
              classPrefix: "language-",
              inlineCodeMarker: "^",  // inline language
              aliases: {},  // sh: bash
              showLineNumbers: false, // ```javascript{numberLines: true}
              noInlineHighlight: false, // Inline styles
              languageExtensions: [],
              prompt: {
                user: "root",
                host: "localhost",
                global: false,
              },
              escapeEntities: {},
            }
          }
        ],
      }
    },    
    // https://www.gatsbyjs.org/packages/gatsby-plugin-sass/?=
    "gatsby-plugin-sass",
    "gatsby-plugin-styled-components",
  ],
}
