import React, { FunctionComponent, useContext } from "react";
import { graphql, Link } from "gatsby";
import useSiteMetadata from "../hooks/useSiteMetadata";
import "../utils/fragments.ts";
import { Box, Heading, ResponsiveContext } from "grommet";
import { Anchor, Paragraph } from "../components/grommet";
import { PageHeading, Section } from "../components/SiteLayout";

const IndexPage: FunctionComponent = (props: any) => {
  const meta = useSiteMetadata();

  return (
    <Box
      // pageTitle={meta.title} pageSummary={meta.summary} pageSlug="/"
      pad="large"
    >
      <PageHeading>Hey, I'm Ken.</PageHeading>
      <Heading responsive level="2" size="large"></Heading>
      <Section heading="Recent Posts">
        {/* <Paragraph>
          I've been trying to post a bit more in the last year. It's not much,
          but the fact that a couple of them have helped others out is worth it!
        </Paragraph>
        <ArticleGrid posts={data.allMdx.edges}></ArticleGrid>
        <Center padding="2rem">
          <Link to="/writing">Read more</Link>
        </Center> */}
      </Section>
      <Section heading="Golfing">
        <Paragraph>
          When I'm not husbanding, fathering or working it's a good bet that I'm
          somewhere on a course.
        </Paragraph>
      </Section>
      <Section heading="Projects">
        <Paragraph>React Native Bluetooth Classic</Paragraph>
        <Paragraph>Git Golf (Suite)</Paragraph>
      </Section>
    </Box>
  );
};

export default IndexPage;

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
