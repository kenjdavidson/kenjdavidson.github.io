import { graphql } from 'gatsby';
import {
  fragment as FeatureSharpFragment,
  FeatureImageFile,
} from './imageSharp';

export const fragment = graphql`
  fragment Article on Mdx {
    id
    frontmatter {
      category
      tags
      title
      summary
      featureImage {
        ...FeatureImageFile
      }
    }
    timeToRead
    excerpt
    body
    fields {
      slug
      publishTime: publishTime(formatString: "MMM DD, YYYY")
      publishYear: publishTime(formatString: "YYYY")
    }
    fileAbsolutePath
    wordCount {
      paragraphs
      sentences
      words
    }
    tableOfContents(maxDepth: 2)
    headings {
      value
      depth
    }
  }
  fragment ArticleSummary on Mdx {
    id
    frontmatter {
      category
      tags
      title
      summary
      featureImage {
        ...FeatureImageFile
      }
    }
    timeToRead
    excerpt
    fields {
      slug
      publishTime: publishTime(formatString: "MMM DD, YYYY")
      publishYear: publishTime(formatString: "YYYY")
    }
    fileAbsolutePath
    wordCount {
      paragraphs
      sentences
      words
    }
  }
`;

export type Frontmatter = {
  category: string;
  subcategory: string;
  title: string;
  subtitle?: string;
  summary: string;
  tags?: string[];
  featureImage: FeatureImageFile;
};

export type Fields = {
  slug: string;
  publishTime: Date;
  publishYear: number;
  seriesId?: string;
};

export type WordCount = {
  paragraphs: number;
  sentences: number;
  words: number;
};

export type ContentItem = {
  title: string;
  url: string;
};

export type Article = {
  id: string;
  fields: Fields;
  fileAbsolutePath: string;
  frontmatter: Frontmatter;
  timeToRead: number;
  excerpt: string;
  body: string;
  html: string;
  wordCount: WordCount;
  tableOfContents: {
    items: ContentItem[];
  };
  headings: Heading[];
};

export type Heading = {
  value: string;
  depth: number;
};

export type ArticleQuery = {
  allMdx: {
    articles: Article[];
  };
};
