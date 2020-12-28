import React from "react";
import { graphql } from "gatsby";
import styled from "styled-components";
import Helmet from "react-helmet";

import { Hero } from "../components/Hero";
import Flex from "../components/Flex";
import Section, { SectionHeader } from "../components/Section";
import ArticleExcerptItem from "../components/ArticleExcerptItem";

import useSiteMetadata from "../hooks/useSiteMetadata";

const ArchiveSection = styled(Section)`
  margin-bottom: 0;
`;

const Archive = ({ archive }) => (
  <ArchiveSection>
    <Flex>
      <header>
        <SectionHeader>{archive.year}</SectionHeader>
      </header>
      <main>
        {archive.articles.map(article => (
          <ArticleExcerptItem
            key={article.id}
            post={article}
          ></ArticleExcerptItem>
        ))}
      </main>
    </Flex>
  </ArchiveSection>
);

export default ({ data }) => {
  const meta = useSiteMetadata();

  let postsByYear = {};

  data.allMdx.edges.forEach(node => {
    let post = node.node;

    if (!postsByYear[post.fields.publishYear]) {
      postsByYear[post.fields.publishYear] = [];
    }
    postsByYear[post.fields.publishYear].push(post);
  });

  let archives = Object.keys(postsByYear)
    .reverse()
    .map(year => {
      return {
        year: year,
        articles: postsByYear[year]
      };
    });

  return (
    <>
      <Helmet>
        <title>{`${meta.title} | Writing`}</title>
      </Helmet>
      <PageHeader>
        <div>
          <h3>I'm neither published nor awarded</h3> but I am opinionated and
          spend a bunch of time playing around with new languages and frameworks
          - it's possible something I write might help someone skip the
          suffering that I've run into. There's always a chance a post on my
          personal husbanding or fathering methods may appear!
        </div>
      </PageHeader>
      {archives.map(archive => (
        <Archive key={archive.year} archive={archive}></Archive>
      ))}
    </>
  );
};

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
