import React, { FunctionComponent, useEffect, useState } from "react";
import { useStaticQuery, graphql } from "gatsby";
import { BoxProps, Box } from "grommet";
import { ArticleLongCard } from "./FullCard";
import useArticles, { Article } from "../../hooks/useArticles";

export interface RecentArticlesProps extends BoxProps {
  skipArticleId?: string;
  showArticles?: number;
  asGrid?: boolean;
}

export const RecentArticles: FunctionComponent<RecentArticlesProps> = ({
  skipArticleId,
  showArticles: articlesProp = 6,
  asGrid: gridProp = false,
  ...rest
}) => {
  const articles = useArticles(articlesProp + 1);
  const filtered = articles
    .filter(article => article.id !== skipArticleId)
    .filter((a, index) => index < articlesProp);

  return (
    <Box>
      {filtered.map((article, index) =>
        index < articlesProp ? (
          <ArticleLongCard key={article.id} article={article} />
        ) : (
          undefined
        )
      )}
    </Box>
  );
};
