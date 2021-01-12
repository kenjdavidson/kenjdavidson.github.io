import React, { FunctionComponent } from "react";
import { graphql, navigate } from "gatsby";
import useSiteMetadata from "../hooks/useSiteMetadata";
import { Box, Heading, Text } from "grommet";
import { Book, Clock } from "grommet-icons";
import { Section, PageHeading } from "../components/Page";
import { Paragraph } from "../components/Grommet/Paragraph";
import { ArticleLongCard } from "../components/Article/FullCard";
import useArticles from "../hooks/useArticles";
import { Article } from "../graphql/graphqlArticles";

export const WritingPage: FunctionComponent = props => {
  const meta = useSiteMetadata();
  const articles = useArticles();

  const articlesByYear: Record<string, Article[]> = {};

  articles.forEach(article => {
    if (!articlesByYear[article.fields.publishYear]) {
      articlesByYear[article.fields.publishYear] = [];
    }
    articlesByYear[article.fields.publishYear].push(article);
  });

  let archives = Object.keys(articlesByYear).reverse();

  return (
    <Box pad="large">
      <PageHeading>Writing</PageHeading>
      <Paragraph>
        <strong>I'm neither published nor awarded</strong> but I am opinionated
        and spend a bunch of time playing around with new languages and
        frameworks - it's possible something I write might help someone skip the
        suffering that I've run into. There's always a chance a post on my
        personal husbanding or fathering methods may appear!
      </Paragraph>
      <Paragraph>Enjoy...</Paragraph>
      {archives.map(year => (
        <Section heading={year} headingSize="large" key={`articles-${year}`}>
          {articlesByYear[year].map(article => (
            <ArticleLongCard key={article.id} article={article} />
          ))}
        </Section>
      ))}
    </Box>
  );
};

export default WritingPage;
