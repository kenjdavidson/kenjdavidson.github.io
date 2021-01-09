import React, { FunctionComponent } from "react";
import { useStaticQuery, graphql } from "gatsby";
import { BoxProps, Box } from "grommet";
import { ArticleLongCard } from "./ArticleLongCard";
import { ArticleFragment } from "../../utils/fragments";

export interface RecentArticlesProps extends BoxProps {
  articles?: number;
  grid?: boolean;
}

export const RecentArticles: FunctionComponent<RecentArticlesProps> = ({
  articles: articlesProp = 6,
  grid: gridProp = false,
  ...rest
}) => {
  const data = useStaticQuery(
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
  const articles: any[] = data.allMdx.edges;
  return (
    <Box>
      {articles.map((article, index) =>
        index < articlesProp ? (
          <ArticleLongCard article={article.node} />
        ) : (
          undefined
        )
      )}
    </Box>
  );
};
