import React, { FunctionComponent } from "react";
import { Box, BoxProps } from "grommet";
import { Paragraph } from "../Grommet/Paragraph";
import { Heading } from "../Grommet/Heading";
import { navigate } from "gatsby";
import { Fields } from "./Fields";
import { Article } from "../../graphql/graphqlArticles";

export interface ArticleLongCardProps extends BoxProps {
  article: Article;
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
      <Heading level="2" responsive margin="none">
        {article.frontmatter.title}
      </Heading>
      <Paragraph fill margin={{ horizontal: "none", vertical: "small" }}>
        {article.frontmatter.summary}
      </Paragraph>
      <Fields article={article} />
    </Box>
  );
};
