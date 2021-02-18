import React, { FunctionComponent } from "react";
import { graphql } from "gatsby";
import { Section } from "../components/section/section";
import { Row, Typography } from "antd";

const GolfingPage: FunctionComponent = () => (
  <Section>
    <Typography.Title>Golf Canada</Typography.Title>
    <Typography.Paragraph>
      Golf and I (much like a fair number of us) have a love/hate relationship.
    </Typography.Paragraph>
    <Typography.Paragraph>
      I'm hoping to get my Golf Canada gatsby source plugin up and running; I
      figure leaving a reminder here is a better push than not having it at all.
    </Typography.Paragraph>
  </Section>
);

export default GolfingPage;

export const query = graphql`
  query GolfQuery {
    site {
      ...siteMetadata
    }
  }
`;
