import { Box } from "grommet";
import { Book, Clock } from "grommet-icons";
import React, { FunctionComponent } from "react";
import { Article } from "../../hooks/useArticles";

export interface FieldsProp {
  article: Article;
}

export const Fields: FunctionComponent<FieldsProp> = ({ article, ...rest }) => {
  return (
    <Box direction="row" fill gap="medium" align="center">
      <Box direction="row" margin="none" align="center" gap="xsmall">
        <Book size="small" /> {article.fields.publishTime}
      </Box>
      <Box direction="row" margin="none" align="center" gap="xsmall">
        <Clock size="small" /> {article.timeToRead} min read
      </Box>
    </Box>
  );
};
