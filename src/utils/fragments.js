import { graphql } from 'gatsby';

/**
 * Standard/common siteMetadata query fragment.
 */
export const siteMetadataFragment = graphql`
  fragment siteMetadata on Site {
    siteMetadata {
      siteUrl
      title
      summary
      description
      image
      twitterUsername
      author {
        name
        avatar
        summary
      }
      menu {
        links {
          url
          title
        }
        title
      }
      social {
        account
        href
        icon
        name
      }
    }
  }
`;

/**
 * Standard/common article query fragment.
 */
export const articleFragment = graphql`
  fragment article on Mdx {
    id
    frontmatter {
      categories
      subcategory
      tags
      title
      subtitle
      summary
    }
    timeToRead
    excerpt
    body
    fields {
      slug
      publishTime: publishTime(formatString: "MMM DD, YYYY")
      publishYear: publishTime(formatString: "YYYY")
    }
    timeToRead
    wordCount {
      paragraphs
      sentences
      words
    }
    headings {
      value
    }
  }
`;

export const timelineFragment = graphql`
  fragment timeline on Mdx {
    fileAbsolutePath
    frontmatter {
      categories
      subcategory
      subtitle
      summary
      tags
      title
      type
      start {
        month
        year
      }
      end {
        month
        year
      }
    }
    fields {
      publishTime
    }
    body
  }
`;
