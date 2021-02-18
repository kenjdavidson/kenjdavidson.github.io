import { graphql } from "gatsby";

export const experience = graphql`
  fragment experience on Mdx {
    fileAbsolutePath
    frontmatter {
      type
      category
      title
      subtitle
      website
      twitter
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

export type Timeline = {
  fileAbsolutePath: string;
  frontmatter: {
    type: string;
    category: string;
    subcategory: string;
    title: string;
    subtitle?: string;
    start: {
      month: string;
      year: number;
    };
    end?: {
      month: string;
      year: number;
    };
  };
  fields: {
    publishTime: Date;
  };
  body: string;
};
