import { Github } from "grommet-icons";

/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */
export default {
  siteMetadata: {
    siteUrl: "https://www.kenjdavidson.com",
    title: "Welcome to Ken Davidson's online playground!",
    description:
      "Whether you're checking out my posts, following up on an application, or found me through a random Google - I'm glad to have you!",
    image: "https://avatars1.githubusercontent.com/u/6210735?s=460&v=4",
    twitterUsername: "kenjdavidson",
    author: {
      name: "Ken Davidson",
      avatar: "https://avatars1.githubusercontent.com/u/6210735?s=460&v=4",
      description:
        "Husbanding, fathering, golfing and developing my way to retirement!"
    },
    editUrl:
      "https://github.com/kenjdavidson/kenjdavidson.github.io/edit/gatsby",
    menu: [
      {
        icon: "Home",
        title: "Home",
        href: "/",
        alt: "The online home of Ken Davidson"
      },
      // {
      //   title: "About Me",
      //   href: "/about"
      // },
      {
        icon: "Code",
        title: "Experience",
        href: "/resume",
        alt: "I've done things.  Lots of things.  Check them out."
      },
      {
        icon: "Article",
        title: "Articles",
        href: "/writing",
        alt: "I don't write often, but when I do (no one notices)"
      },
      {
        title: "Golf",
        href: "/golfing",
        alt: "Golf is my fir... third love!"
      }
    ],
    social: [
      {
        name: "github",
        display: "Github",
        account: "kenjdavidson",
        href: "https://www.github.com/kenjdavidson",
        icon: "Github"
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
        account: "@kenjdavidson",
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
        account: "@kenjdavidson",
        href: "https://www.twitter.com/kenjdavidson"
      },
      {
        name: "email",
        display: "Email",
        account: "ken.j.davidson@live.ca",
        href: "ken.j.davidson@live.ca"
      }
    ],
    manifest: {
      name: "Ken J Davidson",
      shortName: "kend",
      startUrl: "/",
      backgroundColor: "#000",
      themeColo: "#000",
      display: "standalone",
      icon: "static/playstore.svg"
    }
  },
  plugins: [
    `gatsby-plugin-typescript`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      // Described in gatsby-remark-mdx the plugin is required in both this and
      // the gatsbyRemarkPlugins
      resolve: `gatsby-remark-images`,
      options: {
        maxWidth: 1024,
        linkImagesToOriginal: false,
        backgroundColor: `none`,
        disableBgImageOnAlpha: true
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
        name: "content",
        path: `${__dirname}/content`
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
              disableBgImageOnAlpha: true
            }
          },
          {
            resolve: "gatsby-remark-autolink-headers", // PrismJS must be after
            options: {
              className: `header-anchor`,
              isIconAfterHeader: true
            }
          },
          {
            resolve: "gatsby-remark-prismjs",
            options: {
              classPrefix: "language-",
              inlineCodeMarker: "^", // inline language
              aliases: {}, // sh: bash
              showLineNumbers: false, // ```javascript{numberLines: true}
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
        ]
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "Ken J Davidson",
        short_name: "KjdOnline",
        start_url: "/",
        background_color: "#6b37bf",
        theme_color: "#6b37bf",
        // Enables "Add to Homescreen" prompt and disables browser UI (including back button)
        // see https://developers.google.com/web/fundamentals/web-app-manifest/#display
        display: "standalone",
        icon: "static/glorious.png" // This path is relative to the root of the site.
        // An optional attribute which provides support for CORS check.
        // If you do not provide a crossOrigin option, it will skip CORS for manifest.
        // Any invalid keyword or empty string defaults to `anonymous`
        //crossOrigin: `use-credentials`,
      }
    }
  ]
};
