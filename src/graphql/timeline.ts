import { graphql } from 'gatsby';

export const timeline = graphql`
  fragment timeline on Mdx {
    fileAbsolutePath
    frontmatter {
      type
      category
      title
      subtitle
      website
      twitter
      date
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
    title: string;
    subtitle?: string;
    date: Date;
  };
  fields: {
    publishTime: Date;
  };
  body: string;
};
