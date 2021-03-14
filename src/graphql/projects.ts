import { graphql } from "gatsby";
import { FeatureImageFile } from "./imageSharp";

export const fragment = graphql`
  fragment Project on Mdx {
    id
    frontmatter {
      title
      summary
      featureImage {
        ...FeatureImageFile
      }
    }
    excerpt
    body
    fileAbsolutePath
  }
`;

export type Project = {
  id: string;
  frontmatter: {
    title: string;
    summary: string;
    featureImage: FeatureImageFile;
  };
  excerpt: string;
  body: string;
  fileAbsolutePath: string;
};
