import React, { FunctionComponent } from 'react';
import { graphql } from 'gatsby';
import { Article } from '../gatsby/articlesGraphQL';
import { Seo } from '../components/seo';
import { Section } from '../components/layout/section';
import { Hero } from '../components/layout/hero';
import slugify from 'slugify';
import { Heading, PageHeading } from '../components/heading';
import styled, { ThemeProvider } from 'styled-components';
import { invertTheme } from '../styles/themes';
import { Card as ArticleCard } from '../components/article/card';
import { Grid } from '../components/layout/grid';
import { Breadcrumb } from '../components/breadcrumb';

const SectionTitle = styled(Heading)`
  margin-bottom: 2rem;
`;

export const WritingPage: FunctionComponent<WritingPageProps> = ({ data }) => {
  const articlesByYear: Record<string, Article[]> = {};

  data.all.articles.forEach((article) => {
    if (!articlesByYear[article.fields.publishYear]) {
      articlesByYear[article.fields.publishYear] = [];
    }
    articlesByYear[article.fields.publishYear].push(article);
  });

  let archives = Object.keys(articlesByYear).reverse();

  const headingText = `My Writing...`;

  return (
    <>
      <Seo
        title="Ken J Davidson Writing - It doesn't happen much"
        description="Everyone once in a while I get something posted.  Hopefully it's original and hopefully it helps someone out!"
      />
      <Breadcrumb />
      <Hero>
        <PageHeading my="small" data-title={headingText}>
          {headingText}
        </PageHeading>
      </Hero>
      <ThemeProvider theme={invertTheme}>
        <Section size="large" style={{ textAlign: 'center' }} squished>
          <Heading level={5} weight={300}>
            ...it doesn't happen very often - but when it does, I hope that it
            provides something useful. Recently I've received a couple messages
            regarding two of my posts - like dangling a carrot - so I'll
            continue (when time permits).
          </Heading>
        </Section>
        {archives.map((year) => (
          <Section key={`articles-${year}`} size="large">
            <SectionTitle level={2}>{`${year}`}</SectionTitle>
            <Grid columns={3}>
              {articlesByYear[year].map((article) => (
                <ArticleCard
                  key={`article-${slugify(article.frontmatter.title)}`}
                  article={article}
                />
              ))}
              {articlesByYear[year].length < 3 && <div />}
              {articlesByYear[year].length < 2 && <div />}
            </Grid>
          </Section>
        ))}
      </ThemeProvider>
    </>
  );
};

export default WritingPage;

interface WritingPageProps {
  data: {
    all: {
      articles: Article[];
    };
  };
}

export const query = graphql`
  query WritingPageQuery {
    all: allMdx(
      sort: { fields: fields___publishTime, order: DESC }
      filter: { frontmatter: { type: { eq: "Post" }, draft: { ne: true } } }
    ) {
      articles: nodes {
        ...Article
      }
    }
  }
`;
