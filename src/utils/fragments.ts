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
  category: string;
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
      category
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

export interface TimelineFragment {
  fileAbsolutePath: string;
  frontmatter: TimelineFrontmatter;
  fields: TimelineFields;
  body: string;
}

export interface TimelineFrontmatter {
  type: string;
  category: string;
  subcategory: string;
  company?: Institution;
  school?: Institution;
  role?: string;
  degree?: string;
  start: {
    month: string;
    year: number;
  };
  end?: {
    month: string;
    year: number;
  };
}

export interface TimelineFields {
  publishTime: Date;
}

export interface Institution {
  name: string;
  website: string;
  twitter: string;
}

export const experienceFragment = graphql`
  fragment experience on Mdx {
    fileAbsolutePath
    frontmatter {
      type
      category
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
      category
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
