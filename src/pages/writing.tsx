import React, { FunctionComponent } from "react";
import { graphql, navigate } from "gatsby";
import useSiteMetadata from "../hooks/useSiteMetadata";
import { ArticleFragment } from "../utils/fragments";
import { Box, Heading, Text } from "grommet";
import { Book, Clock } from "grommet-icons";
import { Section, PageHeading } from "../components/SiteLayout";
import { Paragraph } from "../components/grommet/Paragraph";
import { ArticleLongCard } from "../components/article/ArticleLongCard";

interface WritingPageProps {
  data: {
    allMdx: {
      edges: {
        node: ArticleFragment;
      }[];
    };
  };
}

export const WritingPage: FunctionComponent<WritingPageProps> = ({ data }) => {
  const meta = useSiteMetadata();

  const articlesByYear: Record<string, ArticleFragment[]> = {};

  data.allMdx.edges.forEach(node => {
    const article = node.node;
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
        <Section heading={year} key={`articles-${year}`}>
          {articlesByYear[year].map(article => (
            <ArticleLongCard article={article} />
          ))}
        </Section>
      ))}
    </Box>
  );
};

export default WritingPage;

export const query = graphql`
  query WritingQuery {
    allMdx(
      filter: { fileAbsolutePath: { regex: "/content/posts/" } }
      sort: { fields: fields___publishTime, order: DESC }
    ) {
      edges {
        node {
          ...article
        }
      }
    }
  }
`;
