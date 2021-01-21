import { Box } from "grommet";
import { Tag as TagIcon } from "grommet-icons";
import React, { FunctionComponent } from "react";
import { Article } from "../../hooks/useArticles";
import { Text } from "../Grommet";

export interface TagsProp {
  tags: [string];
}

export const Tags: FunctionComponent<TagsProp> = ({ tags, ...rest }) => {
  return (
    <Box direction="row" fill gap="medium" align="center" {...rest}>
      <Box direction="row" margin="none" align="center" gap="xsmall">
        <TagIcon size="small" />{" "}
        {tags.map(tag => (
          <Tag key={`tag-${tag}`} tag={tag}></Tag>
        ))}
      </Box>
    </Box>
  );
};

export interface TagProps {
  tag: string;
}

export const Tag: FunctionComponent<TagProps> = ({ tag, ...rest }) => {
  return <Text {...rest}>{tag}</Text>;
};
