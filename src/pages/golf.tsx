import React, { FunctionComponent } from 'react';
import { graphql } from 'gatsby';
import { Section } from '../components/section/section';

const GolfingPage: FunctionComponent = () => (
  <Section>
    <h1>Golf Canada</h1>
    <p>
      Golf and I (much like a fair number of us) have a love/hate relationship.
    </p>
    <p>
      I'm hoping to get my Golf Canada gatsby source plugin up and running; I
      figure leaving a reminder here is a better push than not having it at all.
    </p>
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
