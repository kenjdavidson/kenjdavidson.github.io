import { siteMetadata } from './src/gatsby/siteMetadata';

/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */
export default {
  siteMetadata: siteMetadata,
  plugins: [
    `gatsby-plugin-typescript`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-less`,
      options: {
        lessOptions: {
          javascriptEnabled: true,
          //strictImport: false
        },
      },
    },
    {
      // Described in gatsby-remark-mdx the plugin is required in both this and
      // the gatsbyRemarkPlugins
      resolve: `gatsby-remark-images`,
      options: {
        maxWidth: 1024,
        linkImagesToOriginal: false,
        backgroundColor: `none`,
        disableBgImageOnAlpha: true,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/assets/images`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'content',
        path: `${__dirname}/content`,
      },
    },
    {
      // https://www.gatsbyjs.org/packages/gatsby-transformer-remark
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: ['.mdx', '.md'],
        gatsbyRemarkPlugins: [
          'gatsby-remark-code-titles',
          'gatsby-remark-unwrap-images',
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1024,
              linkImagesToOriginal: false,
              backgroundColor: `none`,
              disableBgImageOnAlpha: true,
            },
          },
          {
            resolve: 'gatsby-remark-autolink-headers', // PrismJS must be after
            options: {
              className: `header-anchor`,
              isIconAfterHeader: true,
            },
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
                global: false,
              },
              escapeEntities: {},
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'Ken Davidson vs. The Web',
        short_name: 'K.J.D Online',
        start_url: '/',
        background_color: '#6b37bf',
        theme_color: '#6b37bf',
        // Enables "Add to Homescreen" prompt and disables browser UI (including back button)
        // see https://developers.google.com/web/fundamentals/web-app-manifest/#display
        display: 'standalone',
        icon: 'static/glorious.png', // This path is relative to the root of the site.
        // An optional attribute which provides support for CORS check.
        // If you do not provide a crossOrigin option, it will skip CORS for manifest.
        // Any invalid keyword or empty string defaults to `anonymous`
        //crossOrigin: `use-credentials`,
      },
    },
  ],
};
