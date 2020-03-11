import React from "react";
import { graphql, Link } from "gatsby";
import styled from 'styled-components';

import PageHeader from '../components/PageHeader';
import Section, { LargeSection, MinimalSection } from '../components/Section';
import ArticleGrid from '../components/ArticleGrid';
import Center from '../components/Center';

import '../utils/fragments';

export default ({ data }) => (
  <>      
  <PageHeader meta={data.site.siteMetadata}>
    <div>
      <h3>"They call it golf because all the other four letter words were taken."</h3>
      <p>- Gary Player</p>
    </div>
  </PageHeader>   
  <Section>
    Sit back while I work on my first Gatsy plugin to pull in data from <a href="https://golfcanada.ca/">Golf Canada</a>.
  </Section>
  </>
);


export const query = graphql`
  query GolfQuery {
    site {
      ...siteMetadata
    }
  }
`;