import { Box } from "grommet";
import React, { FunctionComponent } from "react";
import { Article } from "../../hooks/useArticles";

export interface FooterProps {
  article: Article;
}

export const Footer: FunctionComponent<FooterProps> = ({
  article,
  ...rest
}) => {
  return <Box></Box>;
};
