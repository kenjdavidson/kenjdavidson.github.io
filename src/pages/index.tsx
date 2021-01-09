import React, { FunctionComponent, useContext } from "react";
import { graphql, Link } from "gatsby";
import useSiteMetadata from "../hooks/useSiteMetadata";
import "../utils/fragments.ts";
import { Box, Heading, ResponsiveContext } from "grommet";
import { Anchor, Paragraph } from "../components/grommet";
import { PageHeading, Section } from "../components/SiteLayout";
import { RecentArticles } from "../components/article/RecentArticles";
import { SEO } from "../components/SEO";

const IndexPage: FunctionComponent = (props: any) => {
  const meta = useSiteMetadata();

  return (
    <>
      <SEO title="" description="" />
      <Box
        // pageTitle={meta.title} pageSummary={meta.summary} pageSlug="/"
        pad="large"
      >
        <PageHeading>Hey, I'm Ken.</PageHeading>
        <Section></Section>
        <Section heading="Recent Posts">
          <RecentArticles articles={3} />
          <Paragraph>
            <Anchor href="/writing">Read More...</Anchor>
          </Paragraph>
        </Section>
        <Section heading="Golfing">
          <Paragraph>
            When I'm not husbanding, fathering or working it's a good bet that
            I'm somewhere on a course.
          </Paragraph>
        </Section>
        <Section heading="Projects">
          <Paragraph>React Native Bluetooth Classic</Paragraph>
          <Paragraph>Git Golf (Suite)</Paragraph>
        </Section>
      </Box>
    </>
  );
};

export default IndexPage;
