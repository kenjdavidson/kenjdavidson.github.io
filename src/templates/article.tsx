import { graphql } from 'gatsby';
import React, { FunctionComponent } from 'react';
import { Section, Hero } from '../components/layout/container';
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

const GridLayout = styled.main`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  grid-template-rows: auto auto 1fr auto auto;
  grid-template-areas:
    'toc'
    'content'
    'metaLeft'
    'metaRight';
  grid-gap: 0 3rem;
  gap: 2rem;

  @media screen and (min-width: ${({ theme }) =>
      `${theme.breakpoints.large}px`}) {
    grid-template-columns: minmax(0, 2fr) 1fr;
    grid-template-rows: minmax(0, auto) 1fr auto;
    grid-template-areas:
      'content toc'
      'metaLeft metaRight';
    grid-gap: 0 3rem;
    gap: 2rem;
  }
`;
GridLayout.displayName = 'ArticleGridLayout';

const StickyToc = styled(TableOfContents)<{ top?: string }>`
  grid-area: toc;

  position: -webkit-sticky; /* Safari */
  position: sticky;
  top: ${({ top }) => top || '0px'};

  @media screen and (min-width: ${({ theme }) =>
      `${theme.breakpoints.large}px`}) {
    position: -webkit-sticky; /* Safari */
    position: sticky;
    top: ${({ top }) => top || '0px'};
  }
`;
StickyToc.displayName = 'StickyTableOfContents';

const ArticleContent = styled.section`
  grid-area: content;
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
      <Breadcrumb paths={['writing']} />
      <Hero size="medium">
        <PageHeading margin="small" data-title={article.frontmatter.title}>
          {article.frontmatter.title}
        </PageHeading>
        {article.frontmatter.tags && <Tags tags={article.frontmatter.tags} />}
        <ArticleFields article={article} />
      </Hero>
      <ThemeProvider theme={invertTheme}>
        <Section size="large">
          <GridLayout>
            <div className="stickyWrapper">
              <StickyToc top="1rem" article={article}>
                <Heading level={5} margin="small">
                  Content
                </Heading>
              </StickyToc>
              <div style={{ height: '100% ' }} />
            </div>
            <ArticleContent id="introduction">
              <MDXRenderer>{article.body}</MDXRenderer>
            </ArticleContent>
            <ShareContent>
              <TitleDivider title="Share Me" />
              <p>{articleMeta.shareOn} </p>
              <ShareLinks
                title={article.frontmatter.title}
                href={location.href}
              />
            </ShareContent>
            <EditContent>
              <TitleDivider title="Edit Me" />
              <p>
                {articleMeta.editOn}{' '}
                <Link to={useEditUrl(article.fileAbsolutePath)}>Github</Link>
              </p>
            </EditContent>
          </GridLayout>
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
