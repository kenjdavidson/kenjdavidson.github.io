import React from "react";
import { graphql } from "gatsby";
import { PageLayout } from "../components/PageLayout";
import { Hero, HeroHeading, HeroParagraph } from "../components/Hero";
import { Anchor, Box } from "grommet";
import { Container } from "../components/Container";

export default ({}) => (
  <PageLayout
    pageTitle="I'd rather be golfing..."
    pageSummary="Golf profile and scores maintained by Golf Canada"
    pageSlug="/golfing"
  >
    <Hero>
      <Box>
        <HeroHeading color="text">
          "They call it golf because all the other four letter words were
          taken."
        </HeroHeading>
        <HeroParagraph size="large">- Gary Player</HeroParagraph>
      </Box>
    </Hero>
    <Container>
      Sit back while I work on my first Gatsy plugin to pull in data from{" "}
      <Anchor href="https://golfcanada.ca/">Golf Canada</Anchor>.
    </Container>
  </PageLayout>
);

export const query = graphql`
  query GolfQuery {
    site {
      ...siteMetadata
    }
  }
`;
