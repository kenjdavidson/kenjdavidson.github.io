const { createFilePath } = require("gatsby-source-filesystem");
const { Github } = require("grommet-icons");

/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */
module.exports = {
  siteMetadata: {
    siteUrl: "https://www.kenjdavidson.com",
    title: "Ken Davidson",
    summary:
      "Husbanding, fathering, golfing and developing my way to retirement!",
    description:
      "Whether you're checking out my posts, following up on an application, or found me through a random Google - I'm glad to have you!",
    image: "https://avatars1.githubusercontent.com/u/6210735?s=460&v=4",
    twitterUsername: "kenjdavidson",
    author: {
      name: "Ken Davidson",
      avatar: "https://avatars1.githubusercontent.com/u/6210735?s=460&v=4",
      summary:
        "Husbanding, fathering, golfing and developing my way to retirement!"
    },
    menu: [
      {
        title: "About",
        href: "/"
      },
      // {
      //   title: "About Me",
      //   href: "/about"
      // },
      {
        title: "Resume",
        href: "/resume"
      },
      {
        title: "Writing",
        href: "/writing"
      },
      {
        title: "Golfing",
        href: "/golfing"
      },
    ],
    social: [
      {
        name: "github",
        display: "Github",
        account: "kenjdavidson",
        href: "https://www.github.com/kenjdavidson",
        icon: Github
      },
      {
        name: "linkedin",
        display: "LinkedIn",
        account: "kenjdavidson",
        href: "https://www.linkedin.com/in/kenjdavidson"
      },
      {
        name: "instagram",
        display: "Instagram",
        account: "kenjdavidson",
        href: "https://www.instagram.com/kenjdavidson"
      },
      {
        name: "stackoverflow",
        display: "Stack Overflow",
        account: "kenjdavidson",
        href: "https://stackoverflow.com/users/4196620/kendavidson"
      },
      {
        name: "twitter",
        display: "Twitter",
        account: "kenjdavidson",
        href: "https://www.twitter.com/kenjdavidson"
      },
      {
        name: "email",
        display: "Email",
        account: "ken.j.davidson@live.ca",
        href: "mailto:ken.j.davidson@live.ca"
      }
    ],
    manifest: {
      name: "Ken J Davidson",
      shortName: "kend",
      startUrl: "/",
      backgroundColor: "#000",
      themeColo: "#000",
      display: "standalone",
      icon: "src/static/web/icon.png"
    }
  },
  plugins: [
    `gatsby-plugin-typescript`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-styled-components`,
    `gatsby-transformer-sharp`,
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: `${__dirname}/src/pages`
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: `${__dirname}/src/assets/images`
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "posts",
        path: `${__dirname}/content/posts`
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "timeline",
        path: `${__dirname}/content/timeline`
      }
    },
    {
      // https://www.gatsbyjs.org/packages/gatsby-transformer-remark
      resolve: "gatsby-plugin-mdx",
      options: {
        extensions: [".mdx", ".md"],
        gatsbyRemarkPlugins: [
          "gatsby-remark-code-titles",
          "gatsby-remark-unwrap-images",
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1024,
              linkImagesToOriginal: false,
              backgroundColor: `none`,
              disableBgImageOnAlpha: true,
              showCaptions: true
            }
          },
          {
            resolve: `gatsby-remark-autolink-headers`, // PrismJS must be after
            options: {
              className: `header-anchor`,
              isIconAfterHeader: true
            }
          },
          {
            resolve: "gatsby-remark-prismjs",
            options: {
              classPrefix: "language-",
              inlineCodeMarker: "^",    // inline language
              aliases: {},              // sh: bash
              showLineNumbers: false,   // ```javascript{numberLines: true}
              noInlineHighlight: false, // Inline styles
              languageExtensions: [],
              prompt: {
                user: "root",
                host: "localhost",
                global: false
              },
              escapeEntities: {}
            }
          }
        ],
      }
    }
  ]
};
