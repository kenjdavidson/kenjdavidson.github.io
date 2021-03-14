import { graphql } from 'gatsby';
import React, { FunctionComponent } from 'react';
import { Section } from '../components/layout/section';
import { Hero } from '../components/layout/hero';
import { Seo } from '../components/seo';
import { Article, Fields } from '../gatsby/articlesGraphQL';
import styled, { ThemeProvider } from 'styled-components';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { TableOfContents } from '../components/article/toc';
import { Breadcrumb } from '../components/breadcrumb';
import { Heading, PageHeading } from '../components/heading';
import { invertTheme } from '../styles/themes';
import { MDXProvider } from '@mdx-js/react';
import { Fields as ArticleFields, Tags } from '../components/article/meta';
import { ShareLinks } from '../components/shareLinks';
import useEditUrl from '../hooks/useEditUrl';
import { Link } from '../components/link';
import useSiteMetadata from '../hooks/useSiteMetadata';
import { Divider, TitleDivider } from '../components/divider';

const ArticleSection = styled(Section)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.medium}px) {
    flex-direction: row-reverse;
    align-items: flex-start;
  }
`;

const StickyToc = styled.aside<{ top?: string }>`
  margin: 0 0 4em 0;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.medium}px) {
    flex: 1 0 20%;
    margin: 0 0 0 2em;

    position: -webkit-sticky; /* Safari */
    position: sticky;
    top: ${({ top }) => top || '0px'};
  }
`;
StickyToc.displayName = 'StickyTableOfContents';

const ArticleContent = styled.article`
  @media screen and (min-width: ${({ theme }) => theme.breakpoints.medium}px) {
    flex: 0 1 75%;
    max-width: 75%;
  }
`;
ArticleContent.displayName = 'ArticleContent';

const ShareContent = styled.aside`
  grid-area: metaLeft;
`;
ShareContent.displayName = 'ShareContent';

const EditContent = styled.aside`
  grid-area: metaRight;
`;
EditContent.displayName = 'EditContent';

export const ArticleTemplate: FunctionComponent<ArticleTemplateProps> = ({
  location,
  data,
}) => {
  const { articleMeta } = useSiteMetadata();
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
      <Breadcrumb
        crumbs={[
          {
            title: 'Writing',
            href: '/writing',
          },
        ]}
      />
      <Hero size="medium">
        <PageHeading my="small" data-title={article.frontmatter.title}>
          {article.frontmatter.title}
        </PageHeading>
        {article.frontmatter.tags && <Tags tags={article.frontmatter.tags} />}
        <ArticleFields article={article} />
      </Hero>
      <ThemeProvider theme={invertTheme}>
        <ArticleSection size="large">
          <StickyToc top="1rem">
            <TableOfContents article={article}>
              <Heading level={5} my="small">
                Content
              </Heading>
            </TableOfContents>
          </StickyToc>
          <ArticleContent id="introduction">
            <MDXRenderer>{article.body}</MDXRenderer>
          </ArticleContent>
        </ArticleSection>
        <Section size="large">
          <ShareContent>
            <TitleDivider title="Share Me" />
            <p>{articleMeta.shareOn} </p>
            <ShareLinks
              title={article.frontmatter.title}
              href={location.href}
            />
          </ShareContent>
        </Section>
        <Section size="large">
          <EditContent>
            <TitleDivider title="Edit Me" />
            <p>
              {articleMeta.editOn}{' '}
              <Link to={useEditUrl(article.fileAbsolutePath)}>Github</Link>
            </p>
          </EditContent>
        </Section>
      </ThemeProvider>
    </>
  );
};

export default ArticleTemplate;

interface ArticleTemplateProps {
  location: Location;
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
