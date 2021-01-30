import React, { FunctionComponent, useEffect, useState } from "react";
import { useStaticQuery, graphql } from "gatsby";
import { BoxProps, Box } from "grommet";
import { Card } from "./Card";
import { Article } from "../../hooks/useArticles";

export interface ListProps {
  articles: Article[];
  containerProps?: BoxProps;
  articleProps?: BoxProps;
}

export const List: FunctionComponent<ListProps> = ({
  articles,
  containerProps = {},
  articleProps = {}
}) => {
  return (
    <Box {...containerProps}>
      {articles.map(article => (
        <Card
          key={`article-${article.id}`}
          article={article}
          {...articleProps}
        />
      ))}
    </Box>
  );
};
