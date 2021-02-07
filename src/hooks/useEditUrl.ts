import { useStaticQuery, graphql } from "gatsby";
import { SiteMetadata } from "../graphql/siteMetadata";
import useSiteMetadata from "./useSiteMetadata";

const project = "kenjdavidson.gatsby.io";
const useEditUrl: (filepath: string) => string = filepath => {
  const { editUrl } = useSiteMetadata();
  const index = filepath.indexOf(project);
  return `${editUrl}/${filepath.substring(index + project.length + 1)}`;
};

export default useEditUrl;
