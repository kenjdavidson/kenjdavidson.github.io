import { graphql } from 'gatsby';
import React, { FunctionComponent } from 'react';
import { Section } from '../components/layout/container';
import { Seo } from '../components/seo';
import useSiteMetadata from '../hooks/useSiteMetadata';
import { Article } from '../gatsby/articlesGraphQL';
import styled from 'styled-components';
import { ArticleMeta } from '../components/article';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { TableOfContents } from '../components/article/toc';
import { Breadcrumb } from '../components/breadcrumb';

const ArticleWrapper = styled.main`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  grid-template-rows: auto auto 1fr auto;
  grid-template-areas:
    'header'
    'toc'
    'content'
    'meta';
  grid-gap: 0 3rem;
  gap: 2rem;

  @media screen and (min-width: ${({ theme }) =>
      `${theme.breakpoints.large}px`}) {
    grid-template-columns: minmax(0, 2fr) 1fr;
    grid-template-rows: minmax(0, auto) 1fr;
    grid-template-areas:
      'content toc'
      'content meta';
    grid-gap: 0 3rem;
    gap: 2rem;
  }
`;

const StickyAside = styled.aside<{ top?: number }>`
  @media screen and (min-width: ${({ theme }) =>
      `${theme.breakpoints.large}px`}) {
    position: -webkit-sticky; /* Safari */
    position: sticky;
    top: ${({ top }) => (top && `${top}px`) || 0};
  }
`;

export const ArticleTemplate: FunctionComponent<ArticleQueryProps> = ({
  data,
}) => {
  const { article } = data.articles.edges[0];

  return (
    <>
      <Seo
        title={article.frontmatter.title}
        description={article.frontmatter.summary}
        image={
          article.frontmatter.featureImage &&
          article.frontmatter.featureImage.childImageSharp.fixed.src
        }
      />
      <Section className="v-pad-medium">
        <Section>
          <Breadcrumb paths={['writing']} />
        </Section>
      </Section>
      <Section>
        <Section>
          <h1>{article.frontmatter.title}</h1>
        </Section>
      </Section>
      <Section>
        <Section>
          <ArticleWrapper>
            <StickyAside top={48}>
              <TableOfContents article={article}>
                <h5>Content</h5>
              </TableOfContents>
            </StickyAside>
            <article style={{ gridArea: 'content' }} id="introduction">
              <MDXRenderer>{article.body}</MDXRenderer>
            </article>
          </ArticleWrapper>
        </Section>
      </Section>
    </>
  );
};

export default ArticleTemplate;

interface ArticleQueryProps {
  data: {
    articles: {
      edges: {
        article: Article;
        next: Article;
        previous: Article;
      }[];
    };
  };
}

export const query = graphql`
  query PostQuery($id: String!) {
    articles: allMdx(filter: { id: { eq: $id } }) {
      edges {
        article: node {
          ...Article
        }
        next {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
        previous {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
    recent: allMdx(
      sort: { fields: fields___publishTime, order: DESC }
      limit: 3
      filter: {
        frontmatter: { type: { eq: "Post" }, draft: { ne: true } }
        id: { ne: $id }
      }
    ) {
      articles: nodes {
        ...Article
      }
    }
  }
`;
