/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */
module.exports = {
  siteMetadata: {
    siteUrl: 'https://www.kenjdavidson.com',
    title: 'Ken Davidson',
    summary:
      'Husbanding, fathering, golfing and developing my way to retirement!',
    description:
      "Whether you're checking out my posts, following up on an application, or found me through a random Google - I'm glad to have you!",
    image: 'https://avatars1.githubusercontent.com/u/6210735?s=460&v=4',
    twitterUsername: 'kenjdavidson',
    author: {
      name: 'Ken Davidson',
      avatar: 'https://avatars1.githubusercontent.com/u/6210735?s=460&v=4',
      summary:
        'Husbanding, fathering, golfing and developing my way to retirement!'
    },
    social: [
      {
        name: 'github',
        account: 'kenjdavidson',
        href: 'https://www.github.com/kenjdavidson',
        icon: ['fab', 'github']
      },
      {
        name: 'linkedin',
        account: 'kenjdavidson',
        href: 'https://www.linkedin.com/in/kenjdavidson',
        icon: ['fab', 'linkedin']
      },
      {
        name: 'instagram',
        account: 'kenjdavidson',
        href: 'https://www.instagram.com/kenjdavidson',
        icon: ['fab', 'instagram']
      },
      {
        name: 'stackoverflow',
        account: 'kenjdavidson',
        href: 'https://stackoverflow.com/users/4196620/kendavidson',
        icon: ['fab', 'stack-overflow']
      },
      {
        name: 'twitter',
        account: 'kenjdavidson',
        href: 'https://www.twitter.com/kenjdavidson',
        icon: ['fab', 'twitter']
      },
      {
        name: 'email',
        account: 'ken.j.davidson',
        href: 'mailto:ken.j.davidson@live.ca',
        icon: ['fas', 'envelope']
      }
    ],
    manifest: {
      name: 'Ken J Davidson',
      shortName: 'kend',
      startUrl: '/',
      backgroundColor: '#000',
      themeColo: '#000',
      display: 'standalone',
      icon: 'src/static/web/icon.png'
    }
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-styled-components`,
    `gatsby-transformer-sharp`,
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: `${__dirname}/src/pages`
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'posts',
        path: `${__dirname}/src/posts`
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'timeline',
        path: `${__dirname}/src/timeline`
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/assets/images`
      }
    },
    {
      // https://www.gatsbyjs.org/packages/gatsby-plugin-typography/
      // https://kyleamathews.github.io/typography.js/
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/utils/typography'
      }
    },
    {
      // https://www.gatsbyjs.org/packages/gatsby-transformer-remark/?=
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: ['.mdx','.md'],
        gatsbyRemarkPlugins: [
          'gatsby-remark-code-titles',
          {
            resolve: `gatsby-remark-images`,
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 720
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
            resolve: 'gatsby-remark-prismjs',
            options: {
              classPrefix: 'language-',
              inlineCodeMarker: '^', // inline language
              aliases: {}, // sh: bash
              showLineNumbers: false, // ```javascript{numberLines: true}
              noInlineHighlight: false, // Inline styles
              languageExtensions: [],
              prompt: {
                user: 'root',
                host: 'localhost',
                global: false
              },
              escapeEntities: {}
            }
          }          
        ]
      }
    },
    'gatsby-transform-mdx-posts'
  ]
};
