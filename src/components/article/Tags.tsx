import { Box, BoxProps } from "grommet";
import { Tag as TagIcon } from "grommet-icons";
import React, { FunctionComponent } from "react";
import { Article } from "../../hooks/useArticles";
import { Text } from "../Grommet";

export interface TagsProp {
  tags: [string];
  containerProps?: BoxProps;
}

export const Tags: FunctionComponent<TagsProp> = ({ tags, containerProps }) => {
  return (
    <Box direction="row" fill gap="medium" align="center" {...containerProps}>
      {tags.map(tag => (
        <Box direction="row" margin="none" align="center" gap="xsmall">
          <TagIcon size="small" /> <Tag key={`tag-${tag}`} tag={tag}></Tag>
        </Box>
      ))}
    </Box>
  );
};

export interface TagProps {
  tag: string;
}

export const Tag: FunctionComponent<TagProps> = ({ tag, ...rest }) => {
  return <Text {...rest}>{tag}</Text>;
};
