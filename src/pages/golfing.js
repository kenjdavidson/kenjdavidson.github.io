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
      <h3>I LOVE GOLF!!</h3>  Sadly I haven't had time to get content to this page.  Keep checking back.
    </div>
  </PageHeader>   
  <Section>

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