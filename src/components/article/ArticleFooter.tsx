import { Box } from "grommet";
import React, { FunctionComponent } from "react";
import { ArticleFragment } from "../../utils/fragments";

export interface ArticleFooterProps {
  article: ArticleFragment;
}

export const ArticleFooter: FunctionComponent<ArticleFooterProps> = ({
  article,
  ...rest
}) => {
  return <Box></Box>;
};
