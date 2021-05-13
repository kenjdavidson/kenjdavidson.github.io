import { useStaticQuery, graphql } from "gatsby";
import { SiteMetadata } from "../graphql/siteMetadata";
import useSiteMetadata from "./useSiteMetadata";

const useEditUrl: (filepath: string) => string = filepath => {
  const { editUrl } = useSiteMetadata();
  const index = filepath.indexOf(`/content`);
  return `${editUrl}/${filepath.substring(index)}`;
};

export default useEditUrl;
