import React, { FunctionComponent, useContext } from "react";
import { graphql, Link } from "gatsby";
import useSiteMetadata from "../hooks/useSiteMetadata";
import { Box, Heading, ResponsiveContext, ThemeContext } from "grommet";
import { Anchor, Paragraph } from "../components/Grommet";
import { PageHeading, Section } from "../components/Page";
import { RecentArticles } from "../components/Article/RecentArticles";
import { Seo } from "../components/Seo";

const IndexPage: FunctionComponent = (props: any) => {
  const meta = useSiteMetadata();
  const theme = useContext(ThemeContext);

  console.log(theme);

  return (
    <>
      <Seo title="" description="" />
      <Box
        // pageTitle={meta.title} pageSummary={meta.summary} pageSlug="/"
        pad="large"
      >
        <PageHeading>Hey, I'm Ken.</PageHeading>
        <Section>
          <Paragraph>This is a Grommet styled paragraph</Paragraph>
        </Section>
        <Section heading="Recent Posts">
          <RecentArticles showArticles={3} />
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
