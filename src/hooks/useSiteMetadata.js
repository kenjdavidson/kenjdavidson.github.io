import { useStaticQuery, graphql } from "gatsby";

export default () => {
  const { site } = useStaticQuery(
    graphql`
      query SiteMetaData {
        site {
          ...siteMetadata
        }
      }
    `
  )
  return site.siteMetadata
};