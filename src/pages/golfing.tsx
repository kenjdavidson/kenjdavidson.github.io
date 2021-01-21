import React, { FunctionComponent } from "react";
import { graphql } from "gatsby";
import { Box } from "grommet";
import { Section } from "../components/Page";
import { Paragraph } from "../components/Grommet";
import { PageHeading } from "../components/Page/PageHeading";

const GolfingPage: FunctionComponent = () => (
  <Box pad="large">
    <PageHeading>Golf Profile</PageHeading>
    <Paragraph>
      Golf and I (much like a fair number of us) have a love/hate relationship.
    </Paragraph>
    <Paragraph>
      I'm hoping to get my Golf Canada gatsby source plugin up and running; I
      figure leaving a reminder here is a better push than not having it at all.
    </Paragraph>
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
