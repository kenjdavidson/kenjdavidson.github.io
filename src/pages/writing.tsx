import React, { FunctionComponent } from 'react';
import { graphql } from 'gatsby';
import { Article } from '../graphql/articles';
import { Seo } from '../components/seo';
import { Section, SectionTitle } from '../components/section/section';
import { ArticleListItem } from '../components/article/articleListItem';
import slugify from 'slugify';

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
      <Section className="inverse hero hero medium">
        <h1>Sometimes I do the Writing</h1>
        <p style={{ fontSize: '1.5rem' }}>
          I'm neither <strong>published</strong> nor <strong>awarded</strong>{' '}
          but I am opinionated and spend a bunch of time playing around with new
          languages and frameworks.
        </p>
      </Section>
      {archives.map((year) => (
        <Section key={`articles-${year}`}>
          <SectionTitle spacing="md">{`${year} (${articlesByYear[year].length} Articles)`}</SectionTitle>
          <ul>
            {articlesByYear[year].map((article) => (
              <ArticleListItem
                key={`article-${slugify(article.frontmatter.title)}`}
                article={article}
              />
            ))}
          </ul>
        </Section>
      ))}
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
