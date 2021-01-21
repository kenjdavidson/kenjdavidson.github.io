import { Box } from "grommet";
import { Github } from "grommet-icons";
import React, { FunctionComponent } from "react";
import { Article } from "../../hooks/useArticles";
import { Anchor, Text } from "../Grommet";
import useSiteMetadata from "../../hooks/useSiteMetadata";
import useEditUrl from "../../hooks/useEditUrl";

export interface FooterProps {
  article: Article;
}

export const Footer: FunctionComponent<FooterProps> = ({
  article,
  ...rest
}) => {
  const meta = useSiteMetadata();

  return (
    <Box direction="row-responsive" justify="between" gap="medium">
      <Text>Share and Edit on github</Text>
      <Text>
        <Anchor
          href={useEditUrl(article.fileAbsolutePath)}
          icon={<Github />}
          label="Edit on Github"
        ></Anchor>
      </Text>
    </Box>
  );
};
