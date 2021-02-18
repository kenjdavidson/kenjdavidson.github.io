import { graphql } from "gatsby";

export const fragment = graphql`
  fragment FeatureImageFile on File {
    absolutePath
    childImageSharp {
      id
      fluid {
        src
        srcSet
        tracedSVG
        base64
        srcSetWebp
        srcWebp
        sizes
      }
      fixed {
        base64
        tracedSVG
        aspectRatio
        srcWebp
        srcSetWebp
        originalName
      }
    }
    relativePath
    size
    prettySize
    name
    ext
  }
`;

export type FeatureImageFile = {
  absolutePath: string;
  relativePath: string;
  name: string;
  ext: string;
  childImageSharp: ImageSharp;
};

export type ImageSharp = {
  fluid: ImageSharpData;
  fixed: ImageSharpData;
};

export type ImageSharpData = {
  src: string;
  srcSet: string;
  srcWebp: string;
  srcSetWebp: string;
  sizes: string;
  tracedSvg: string;
  base64: string;
};
