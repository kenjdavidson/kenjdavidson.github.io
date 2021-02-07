import { graphql } from "gatsby";

export type Timeline = {
  fileAbsolutePath: string;
  frontmatter: Frontmatter;
  fields: Fields;
  body: string;
};

export type Frontmatter = {
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
};

export interface Fields {
  publishTime: Date;
}

export interface Institution {
  name: string;
  website: string;
  twitter: string;
}

export const experience = graphql`
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

export const education = graphql`
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
