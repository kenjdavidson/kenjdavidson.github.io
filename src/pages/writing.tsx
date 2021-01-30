import React, { FunctionComponent } from "react";
import { graphql, navigate } from "gatsby";
import useSiteMetadata from "../hooks/useSiteMetadata";
import { Box, Heading, Text } from "grommet";
import { Book, Clock } from "grommet-icons";
import { Section, PageHeading } from "../components/page";
import { Paragraph } from "../components/grommet";
import { List as ArticleList } from "../components/Article/List";
import useArticles from "../hooks/useArticles";
import { Article } from "../graphql/graphqlArticles";
import { Seo } from "../components/Seo";

export const WritingPage: FunctionComponent<WritingPageProps> = ({ data }) => {
  const articlesByYear: Record<string, Article[]> = {};

  data.all.articles.forEach(article => {
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
      <Box pad="large">
        <PageHeading>Writing</PageHeading>
        <Paragraph>
          <strong>I'm neither published nor awarded</strong> but I am
          opinionated and spend a bunch of time playing around with new
          languages and frameworks - it's possible something I write might help
          someone skip the suffering that I've run into. There's always a chance
          a post on my personal husbanding or fathering methods may appear!
        </Paragraph>
        <Paragraph>Enjoy...</Paragraph>
        {archives.map(year => (
          <Section heading={year} headingSize="large" key={`articles-${year}`}>
            <ArticleList articles={articlesByYear[year]} />
          </Section>
        ))}
      </Box>
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
