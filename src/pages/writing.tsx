import React, { FunctionComponent } from 'react';
import { graphql } from 'gatsby';
import { Article } from '../gatsby/articlesGraphQL';
import { Seo } from '../components/seo';
import { Hero, Section } from '../components/layout/container';
import slugify from 'slugify';
import { Heading } from '../components/heading';
import styled, { ThemeProvider } from 'styled-components';
import { invertTheme } from '../styles/themes';
import { ArticleCard } from '../components/article/articleCard';
import { Grid } from '../components/grid';

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

  return (
    <>
      <Seo
        title="Ken J Davidson Writing - It doesn't happen much"
        description="Not the most well written, nor the best content - but I've helped a few people and that's what is important."
      />
      <Hero>
        <h1>Sometimes I do the Writing</h1>
        <p style={{ fontSize: '1.5rem' }}>
          I'm neither <strong>published</strong> nor <strong>awarded</strong>{' '}
          but I am opinionated and spend a bunch of time playing around with new
          languages and frameworks.
        </p>
      </Hero>
      <ThemeProvider theme={invertTheme}>
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
