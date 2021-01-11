import { useStaticQuery, graphql } from "gatsby";
import { SiteMetadata } from "../graphql/graphqlSiteMetadata";

const useSiteMetadata: () => SiteMetadata = () => {
  const { site } = useStaticQuery(
    graphql`
      query SiteMetaData {
        site {
          ...siteMetadata
        }
      }
    `
  );
  return site.siteMetadata;
};

export default useSiteMetadata;
