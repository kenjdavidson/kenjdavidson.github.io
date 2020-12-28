import { graphql } from "gatsby";

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
        display
        href
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

export const experienceFragment = graphql`
  fragment experience on Mdx {
    fileAbsolutePath
    frontmatter {
      type
      categories
      subcategory
      company {
        name
        website
        twitter
      }
      role
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

export const educationFragment = graphql`
  fragment education on Mdx {
    fileAbsolutePath
    frontmatter {
      type
      categories
      subcategory
      school {
        name
        website
        twitter
      }
      degree
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