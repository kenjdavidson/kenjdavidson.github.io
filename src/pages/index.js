import React, { useContext } from "react";
import { graphql, Link } from "gatsby";
import { SectionHeader } from "../components/Section";
import ArticleGrid from "../components/ArticleGrid";
import Center from "../components/Center";
import { PageLayout } from "../components/PageLayout";

import useSiteMetadata from "../hooks/useSiteMetadata";
import "../utils/fragments";
import { Box, ResponsiveContext } from "grommet";
import { Hero, HeroHeading, HeroParagraph } from "../components/Hero";
import { Container } from "../components/Container";
import { AnchorLink } from "../components/grommet";

export default ({ data }) => {
  const meta = useSiteMetadata();

  return (
    <PageLayout pageTitle={meta.title} pageSummary={meta.summary} pageSlug="/">
      <Hero>
        <Box>
          <HeroHeading>
            Husbanding, Fathering, Golfing and Developing my way to retirement.
          </HeroHeading>
          <HeroParagraph fill color="text">
            Besides providing me an online playground for my projects, I've been
            doing my best to keep the personal and professional content up to
            date. For more details, check out my{" "}
            <AnchorLink href="/resume" color="text">
              professional experience
            </AnchorLink>{" "}
            and{" "}
            <AnchorLink href="/about" color="text">
              personal interests
            </AnchorLink>
            .
          </HeroParagraph>
        </Box>
      </Hero>
      <Container heading="Recent Posts">
        <ArticleGrid posts={data.allMdx.edges}></ArticleGrid>
        <Center padding="2rem">
          <Link to="/writing">Read more</Link>
        </Center>
      </Container>
    </PageLayout>
  );
};

export const query = graphql`
  query HomeQuery {
    allMdx(
      filter: { fileAbsolutePath: { regex: "/posts/" } }
      limit: 6
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
