import { Box } from "grommet";
import { Facebook, Github, Linkedin, Mail } from "grommet-icons";
import React, { FunctionComponent } from "react";
import { Article } from "../../hooks/useArticles";
import { Anchor, Text } from "../Grommet";
import useSiteMetadata from "../../hooks/useSiteMetadata";
import useEditUrl from "../../hooks/useEditUrl";
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton
} from "react-share";

export interface FooterProps {
  article: Article;
}

export const Footer: FunctionComponent<FooterProps> = ({
  article,
  ...rest
}) => {
  const meta = useSiteMetadata();

  return (
    <Box
      direction="row-responsive"
      justify="between"
      gap="medium"
      align="center"
    >
      <Box direction="row" gap="small" align="center">
        <Text>Share on</Text>
        <EmailShareButton subject={`Article ${article.frontmatter.title}`}>
          <Mail color="plain" />
        </EmailShareButton>
        <FacebookShareButton>
          <Facebook color="plain" />
        </FacebookShareButton>
        <LinkedinShareButton>
          <Linkedin color="plain" />
        </LinkedinShareButton>
      </Box>
      <Box direction="row">
        <Text>Edit on</Text>
        <Text>
          <Anchor
            href={useEditUrl(article.fileAbsolutePath)}
            icon={<Github />}
          ></Anchor>
        </Text>
      </Box>
    </Box>
  );
};
