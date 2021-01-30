import React, { FunctionComponent } from "react";
import { Box, BoxProps } from "grommet";
import { Heading, Paragraph } from "../grommet";
import { navigate } from "gatsby";
import { Fields } from "./Fields";
import { Article } from "../../graphql/graphqlArticles";
import { Anchor } from "../grommet";
import styled from "styled-components";

const ArticleLink = styled(Anchor)`
  &:hover {
    text-decoration: none;
  }
`;

export interface CardProps {
  article: Article;
  cardProps?: BoxProps;
  fieldsProps?: BoxProps;
  tagsProps?: BoxProps;
}

export const Card: FunctionComponent<CardProps> = ({
  article,
  cardProps = {},
  fieldsProps = {},
  tagsProps = {}
}) => {
  return (
    <ArticleLink
      href={`/${article.fields.slug}`}
      color="inherit"
      weight="normal"
      margin={{ bottom: "large" }}
    >
      <Box {...cardProps}>
        <Heading level="2" responsive margin="none">
          {article.frontmatter.title}
        </Heading>
        <Paragraph fill margin={{ horizontal: "none", vertical: "small" }}>
          {article.frontmatter.summary}
        </Paragraph>
        <Fields article={article} {...fieldsProps} />
      </Box>
    </ArticleLink>
  );
};
