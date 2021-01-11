import { graphql } from "gatsby";

export const fragment = graphql`
  fragment articles on Mdx {
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
  frontmatter: Frontmatter;
  timeToRead: number;
  excerpt: string;
  body: string;
  html: string;
  fields: Fields;
  wordCount: WordCount;
  tableOfContents: {
    items: ContentItem[];
  };
};
