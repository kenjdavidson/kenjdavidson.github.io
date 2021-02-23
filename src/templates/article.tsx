import { Breadcrumb, Layout, Typography } from 'antd';
import BreadcrumbItem from 'antd/lib/breadcrumb/BreadcrumbItem';
import BreadcrumbSeparator from 'antd/lib/breadcrumb/BreadcrumbSeparator';
import { Content } from 'antd/lib/layout/layout';
import { graphql } from 'gatsby';
import React, { FunctionComponent } from 'react';
import { Header } from '../components/header/header';
import { Link } from '../components/link';
import { Section, SectionTitle } from '../components/section/section';
import { Seo } from '../components/seo';
import useSiteMetadata from '../hooks/useSiteMetadata';
import { Article } from '../graphql/articles';
import styled from 'styled-components';
import { ArticleMeta } from '../components/article';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { TableOfContents } from '../components/article/toc';

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

  @media (min-width: 768px) {
    grid-template-columns: minmax(0, 2fr) 1fr;
    grid-template-rows: minmax(0, auto) 1fr;
    grid-template-areas:
      'content toc'
      'content meta';
    grid-gap: 0 3rem;
    gap: 2rem;
  }
`;

export const ArticleTemplate: FunctionComponent<ArticleQueryProps> = ({
  data,
}) => {
  const meta = useSiteMetadata();
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
      <Layout>
        <Header />
        <Content>
          <Section verticalPad="md">
            <Breadcrumb>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <Link href="/writing">Writing</Link>
              </BreadcrumbItem>
            </Breadcrumb>
            <Typography.Title style={{ gridArea: 'header' }}>
              {article.frontmatter.title}
            </Typography.Title>
          </Section>
          <Section>
            <ArticleWrapper>
              <TableOfContents article={article} style={{ gridArea: 'toc' }}>
                <SectionTitle spacing="none">Content</SectionTitle>
              </TableOfContents>
              <aside style={{ gridArea: 'meta' }}>
                <ArticleMeta article={article} />
              </aside>
              <article style={{ gridArea: 'content' }} id="introduction">
                <MDXRenderer>{article.body}</MDXRenderer>
              </article>
            </ArticleWrapper>
          </Section>
        </Content>
      </Layout>
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
