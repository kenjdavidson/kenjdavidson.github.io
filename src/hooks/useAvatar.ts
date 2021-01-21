import { graphql, useStaticQuery } from "gatsby";

export const useAvatar = () => {
  const { avatar } = useStaticQuery(graphql`
    query {
      avatar: file(relativePath: { regex: "/avatar.png/" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid_tracedSVG
          }
        }
      }
    }
  `);

  return avatar;
};
