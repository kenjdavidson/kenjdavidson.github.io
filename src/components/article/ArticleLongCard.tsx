import React, { FunctionComponent } from "react";
import { Box, BoxProps } from "grommet";
import { PageHeading } from "../SiteLayout";
import { Paragraph } from "../grommet/Paragraph";
import { Heading } from "../grommet/Heading";
import { Book, Clock } from "grommet-icons";
import { ArticleFragment } from "../../utils/fragments";
import { navigate } from "gatsby";

export interface ArticleLongCardProps extends BoxProps {
  article: ArticleFragment;
}

export const ArticleLongCard: FunctionComponent<ArticleLongCardProps> = ({
  article,
  ...rest
}) => {
  return (
    <Box
      onClick={() => navigate(`/${article.fields.slug}`)}
      key={`article-${article.frontmatter.title}`}
      margin={{ bottom: "large" }}
    >
      <Heading level="2" size="medium" responsive margin="none">
        {article.frontmatter.title}
      </Heading>
      <Paragraph fill margin={{ horizontal: "none", vertical: "small" }}>
        {article.frontmatter.summary}
      </Paragraph>
      <Box direction="row" fill gap="medium" align="center">
        <Box direction="row" margin="none" align="center" gap="xsmall">
          <Book size="small" /> {article.fields.publishTime}
        </Box>
        <Box direction="row" margin="none" align="center" gap="xsmall">
          <Clock size="small" /> {article.timeToRead} min read
        </Box>
      </Box>
    </Box>
  );
};
