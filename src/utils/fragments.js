import { graphql } from 'gatsby';

/**
 * Standard/common siteMetadata query fragment.
 */
export const siteMetadata = graphql`
  fragment siteMetadata on Site {
    siteMetadata {
      siteUrl
      title
      author {
        name
        avatar
        summary
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
export const article = graphql`
  fragment article on MarkdownRemark {
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
    fields {
      slug
      birthTime(formatString: "MMM DD, YYYY")
      modifiedTime(formatString: "MMM DD, YYYY")
      publishTime: publishTime(formatString: "MMM DD, YYYY")
      publishYear: publishTime(formatString: "YYYY")
    }
    html
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
