import { graphql } from 'gatsby';
import { FixedObject, FluidObject } from 'gatsby-image';

export const fragment = graphql`
  fragment FeatureImageFile on File {
    absolutePath
    childImageSharp {
      id
      fluid(maxWidth: 800, quality: 100) {
        src
        srcSet
        base64
        tracedSVG
        sizes
      }
      fixed(quality: 100) {
        src
        srcSet
        base64
        tracedSVG
        aspectRatio
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
  fluid: FluidObject;
  fixed: FixedObject;
};
