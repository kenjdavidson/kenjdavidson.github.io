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
        href
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

export interface ArticleFrontmatter {
  title: string;
  summary: string;
  categories: string[];
  subcategory: string;
  tags: string[];
}

export interface ArticleWordCount {
  words: number;
  sentences: number;
  paragraphs: number;
}

export interface ArticleHeading {
  value: string[];
}

export interface ArticleFragment {
  id: String;
  frontmatter: ArticleFrontmatter;
  timeToRead: string;
  excerpt: string;
  body: string;
  fields: any;
  wordCount: ArticleWordCount;
  headings: ArticleHeading;
}

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
