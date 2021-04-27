import React, { FunctionComponent, HtmlHTMLAttributes } from 'react';
import { Article, ArticleSummary } from '../../gatsby/articlesGraphQL';
import styled from 'styled-components';
import Image from 'gatsby-image';
import { Link } from '../link';
import { Heading } from '../heading';

const StyledCard = styled.article`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  position: relative;
  background-color: ${({ theme }) => theme.primary.background};
  border: 1px solid ${({ theme }) => theme.inverse.grey1};
  border-radius: 0.25rem;
  padding: 0.5em 1em;
  min-height: 300px;

  &:hover {
    box-shadow: 1px 1px 2px ${({ theme }) => theme.primary.accent1},
      -1px -1px 2px ${({ theme }) => theme.primary.accent2};
    transform: scale(1.05);
  }
`;

const Summary = styled.summary`
  flex: 1;
`;

const ReadMore = styled.p`
  text-align: right;
  font-weight: 600;
`;

export const Card: FunctionComponent<
  { article: ArticleSummary } & HtmlHTMLAttributes<HTMLDivElement>
> = ({ article, ...rest }) => {
  return (
    <StyledLink to={article.fields.slug} decoration="none">
      <StyledCard {...rest}>
        {article.frontmatter.featureImage && (
          <Image
            fluid={article.frontmatter.featureImage.childImageSharp.fluid}
            alt={
              article.frontmatter.featureImageAlt || article.frontmatter.title
            }
          />
        )}
        <Heading level={5} weight={600} my="small">
          {article.frontmatter.title}
        </Heading>
        {article.frontmatter.subtitle && (
          <Heading level={6} color="grey3">
            article.frontmatter.subtitle
          </Heading>
        )}
        <Summary>{article.frontmatter.summary}</Summary>
        <ReadMore>
          <span>Read Me</span>
        </ReadMore>
      </StyledCard>
    </StyledLink>
  );
};
