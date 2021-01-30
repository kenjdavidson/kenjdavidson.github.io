import { Box, BoxProps, TextProps } from "grommet";
import { Book, Clock, IconProps } from "grommet-icons";
import React, { FunctionComponent } from "react";
import { Text } from "../grommet";

export interface FieldsProps {
  article: Article;
  containerProps?: BoxProps;
  iconProps?: IconProps;
  tagProps?: TextProps;
}

export const Fields: FunctionComponent<FieldsProps> = ({
  article,
  containerProps = {},
  iconProps = {},
  tagProps = {}
}) => {
  return (
    <Box direction="row" fill gap="medium" align="center" {...containerProps}>
      <Box direction="row" margin="none" align="center" gap="xsmall">
        <Book size="small" {...iconProps} />{" "}
        <Text {...tagProps}>{article.fields.publishTime}</Text>
      </Box>
      <Box direction="row" margin="none" align="center" gap="xsmall">
        <Clock size="small" {...iconProps} />{" "}
        <Text {...tagProps}>{article.timeToRead} min read</Text>
      </Box>
    </Box>
  );
};
