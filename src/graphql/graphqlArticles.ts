import { graphql } from "gatsby";

export const fragment = graphql`
  fragment Article on Mdx {
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
    fileAbsolutePath
    wordCount {
      paragraphs
      sentences
      words
    }
    tableOfContents(maxDepth: 2)
  }
`;

export type Frontmatter = {
  category: string;
  subcategory: string;
  title: string;
  summary: string;
  tags?: string[];
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
};

export type ArticleQuery = {
  edges: {
    node: Article[];
  };
};
