import React, { FunctionComponent } from "react";
import { graphql } from "gatsby";
import { Box } from "grommet";
import { Section } from "../components/SiteLayout";
import { Paragraph } from "../components/grommet";

const GolfingPage: FunctionComponent = () => (
  <Box pad="large">
    <Section heading="Golf Canada">
      <Paragraph>
        Need to get my Golf Canada gatsby source plugin up and running. Figure
        leaving a reminder here is a better push than not having it at all.
      </Paragraph>
    </Section>
  </Box>
);

export default GolfingPage;

export const query = graphql`
  query GolfQuery {
    site {
      ...siteMetadata
    }
  }
`;
