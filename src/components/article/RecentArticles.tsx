import React, { FunctionComponent } from "react";
import { useStaticQuery } from "gatsby";
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
  const articles = useStaticQuery``;
  return <Box></Box>;
};
