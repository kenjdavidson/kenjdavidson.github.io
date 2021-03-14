import { siteMetadata } from './src/gatsby/siteMetadata';

export default {
  siteMetadata: siteMetadata,
  plugins: [
    `gatsby-plugin-typescript`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-transformer-yaml`,
    {
      // As described in `gatsby-remark-mdx` the `gatsby-remark-images` plugin is required
      // in both the parent and as an internal plugin to `gatsby-plugin-mdx`
      resolve: `gatsby-remark-images`,
      options: {
        maxWidth: 1024,
        linkImagesToOriginal: false,
        backgroundColor: `none`,
        disableBgImageOnAlpha: true,
      },
    },
    {
      // Loads all the `/content` and let the remaining plugins sort it out
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'content',
        path: `${__dirname}/content`,
      },
    },
    {
      // Transform all `md` and `mdx` files within the `/content` folder.  `Mdx` is used
      // for both articles and timeline entries, to allow for feature images, content
      // and JSX
      // https://www.gatsbyjs.org/packages/gatsby-transformer-remark
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: ['.mdx', '.md'],
        gatsbyRemarkPlugins: [
          'gatsby-remark-code-titles',
          'gatsby-remark-unwrap-images',
          {
            // Required here as per the documentation
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1024,
              linkImagesToOriginal: false,
              backgroundColor: `none`,
              disableBgImageOnAlpha: true,
            },
          },
          {
            // This needs to be replaced with `https://prince.dev/prism-react-renderer` to take
            // advantage of better customization
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
