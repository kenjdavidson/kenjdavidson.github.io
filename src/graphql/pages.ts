import { graphql } from "gatsby";

export const fragment = graphql`
  fragment Page on Mdx {
    id
    frontmatter {
      title
      summary
    }
    timeToRead
    excerpt
    body
    fields {
      slug
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
  title: string;
  summary: string;
  featureImage: any; // Image Sharp
};

export type Fields = {
  slug: string;
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

export type Page = {
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

export const sectionFragment = graphql`
  fragment PageSection on Mdx {
    id
    frontmatter {
      title
      summary
      page
      order
    }
    body
  }
`;

export type SectionFrontmatter = {
  type: string;
  title: string;
  summary: string;
  page: string;
  order: number;
};

export type Section = {
  id: string;
  frontmatter: SectionFrontmatter;
  body: string;
  html: string;
};

export type PageQuery = {
  pagesMdx: {
    pages: Page[];
  };
  sectionsMdx: {
    sections: Section[];
  };
};
