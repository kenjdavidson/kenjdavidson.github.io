import React, { FunctionComponent } from "react";
import { useStaticQuery, graphql } from "gatsby";
import { BoxProps, Box } from "grommet";

export interface RecentArticlesProps extends BoxProps {
  articles?: number;
  grid?: boolean;
}

export const RecentArticles: FunctionComponent<RecentArticlesProps> = ({
  articles: articlesProp = 6,
  grid: gridProp = false,
  ...rest
}) => {
  const articles = useStaticQuery(
    graphql`
      query {
        allMdx(
          filter: { fileAbsolutePath: { regex: "/content/posts/" } }
          sort: { fields: fields___publishTime, order: DESC }
          limit: 6
        ) {
          edges {
            node {
              ...article
            }
          }
        }
      }
    `
  );
  return <Box></Box>;
};
