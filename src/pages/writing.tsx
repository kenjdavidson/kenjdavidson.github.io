import React, { FunctionComponent } from 'react';
import { graphql } from 'gatsby';
import { Box } from 'grommet';
import { Article } from '../graphql/articles';
import { Seo } from '../components/seo';
import { Section, SectionTitle } from '../components/section/section';
import { List, Typography } from 'antd';
import { ArticleListItem } from '../components/article/articleListItem';

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
        <Typography.Title>Sometimes I do the Writing</Typography.Title>
        <Typography.Paragraph style={{ fontSize: '1.5rem' }}>
          I'm neither <strong>published</strong> nor <strong>awarded</strong>{' '}
          but I am opinionated and spend a bunch of time playing around with new
          languages and frameworks.
        </Typography.Paragraph>
      </Section>
      {archives.map((year) => (
        <Section key={`articles-${year}`}>
          <SectionTitle spacing="md">{`${year} (${articlesByYear[year].length} Articles)`}</SectionTitle>
          <List
            dataSource={articlesByYear[year]}
            renderItem={(item) => <ArticleListItem article={item} />}
          />
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
