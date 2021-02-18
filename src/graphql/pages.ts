import { graphql } from "gatsby";
import { FeatureImageFile } from "./imageSharp";

export const fragment = graphql`
  fragment MdxPage on Mdx {
    id
    frontmatter {
      type
      title
      summary
      featureImage {
        ...FeatureImageFile
      }
      slug
    }
    timeToRead
    excerpt
    body
    fields {
      slug
    }
    fileAbsolutePath
    sections {
      id
      frontmatter {
        title
        summary
        order
      }
      body
    }
  }
`;

export type Page = {
  id: string;
  fields: {
    slug: string;
  };
  fileAbsolutePath: string;
  frontmatter: {
    type: string;
    title: string;
    summary: string;
    featureImage?: FeatureImageFile;
    slug?: string;
  };
  excerpt: string;
  body: string;
  html: string;
  sections: Section[];
};

export type Section = {
  id: string;
  frontmatter: {
    type: string;
    title: string;
    summary: string;
    order: number;
  };
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
