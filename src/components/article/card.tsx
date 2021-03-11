import React, { FunctionComponent, HtmlHTMLAttributes } from 'react';
import { Article, ArticleSummary } from '../../gatsby/articlesGraphQL';
import styled from 'styled-components';
import Image from 'gatsby-image';
import { Link } from '../link';

const StyledCard = styled.article``;

const StyledLink = styled(Link)`
  text-decoration: none;
  position: relative;
  background-color: ${({ theme }) => theme.primary.background};

  h5 {
    font-weight: 600;
  }

  &:hover h5 {
    text-shadow: 1px 1px 0px ${({ theme }) => theme.primary.accent2};
    z-index: 100;
  }

  p:last-child {
  }
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
        <h5>{article.frontmatter.title}</h5>
        {article.frontmatter.subtitle && <h6>article.frontmatter.subtitle</h6>}
        <p>{article.frontmatter.summary}</p>
      </StyledCard>
    </StyledLink>
  );
};
