import React, { FunctionComponent } from "react";
import { Box, BoxProps } from "grommet";
import { PageHeading } from "../SiteLayout";
import { Paragraph } from "../grommet/Paragraph";
import { Heading } from "../grommet/Heading";
import { Book, Clock } from "grommet-icons";
import { ArticleFragment } from "../../utils/fragments";
import { navigate } from "gatsby";
import { ArticleFields } from "./ArticleFields";

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
      <ArticleFields article={article} />
    </Box>
  );
};
