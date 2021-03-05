import React, { FunctionComponent, HtmlHTMLAttributes } from 'react';
import { Article } from '../../gatsby/articlesGraphQL';
import styled from 'styled-components';
import Image from 'gatsby-image';
import { Link } from '../link';

const Card = styled.article``;

const StyledLink = styled(Link)`
  &:hover h5 {
    color: ${({ theme }) => theme.primary.accent1};
    text-shadow: 1px 1px 0px ${({ theme }) => theme.primary.accent2};
  }
`;

export const ArticleCard: FunctionComponent<
  { article: Article } & HtmlHTMLAttributes<HTMLDivElement>
> = ({ article, ...rest }) => {
  return (
    <StyledLink to={article.fields.slug} decorated="none">
      <Card {...rest}>
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
      </Card>
    </StyledLink>
  );
};
