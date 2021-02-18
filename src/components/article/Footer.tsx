import { Box } from "grommet";
import { Facebook, Github, Linkedin, Mail, Twitter } from "grommet-icons";
import React, { FunctionComponent } from "react";
import { Anchor, Text } from "../grommet";
import useSiteMetadata from "../../hooks/useSiteMetadata";
import useEditUrl from "../../hooks/useEditUrl";
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";
import { Article } from "../../graphql/articles";

export interface FooterProps {
  article: Article;
  shareUrl?: string;
}

export const Footer: FunctionComponent<FooterProps> = ({
  article,
  shareUrl,
  ...rest
}) => {
  return (
    <Box
      direction="row-responsive"
      justify="between"
      gap="medium"
      align="center"
    >
      <Box direction="row" gap="small" align="center">
        <Text>Share on</Text>
        <EmailShareButton
          url={shareUrl!}
          subject={`Article ${article.frontmatter.title}`}
        >
          <Mail color="plain" />
        </EmailShareButton>
        <FacebookShareButton url={shareUrl!} title={article.frontmatter.title}>
          <Facebook color="plain" />
        </FacebookShareButton>
        <LinkedinShareButton
          url={shareUrl!}
          title={article.frontmatter.title}
          summary={article.frontmatter.summary}
        >
          <Linkedin color="plain" />
        </LinkedinShareButton>
        <TwitterShareButton url={shareUrl!} title={article.frontmatter.title}>
          <Twitter color="plain" />
        </TwitterShareButton>
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
