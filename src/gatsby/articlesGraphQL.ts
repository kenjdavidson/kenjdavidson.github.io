import { graphql } from 'gatsby';
import {
  fragment as FeatureSharpFragment,
  FeatureImageFile,
} from '../graphql/imageSharp';

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

export interface Frontmatter {
  category: string;
  subcategory: string;
  title: string;
  subtitle?: string;
  summary: string;
  tags?: string[];
  featureImage?: FeatureImageFile;
  featureImageAlt?: string;
}

export interface Fields {
  slug: string;
  publishTime: Date;
  publishYear: number;
  seriesId?: string;
}

export interface WordCount {
  paragraphs: number;
  sentences: number;
  words: number;
}

export interface ContentItem {
  title: string;
  url: string;
}

export interface ArticleSummary {
  id: string;
  fields: Fields;
  frontmatter: Frontmatter;
}

export interface Article extends ArticleSummary {
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
}

export interface Heading {
  value: string;
  depth: number;
}

export interface ArticleQuery {
  allMdx: {
    articles: Article[];
  };
}
