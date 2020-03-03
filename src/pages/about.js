import React from "react";
import { graphql, Link } from "gatsby";
import styled from 'styled-components';

import PageHeader from '../components/PageHeader';
import { LargeSection, MinimalSection } from '../components/Section';
import ArticleGrid from '../components/ArticleGrid';
import Center from '../components/Center';

import '../utils/fragments';

export default ({ data }) => (
  <>      
  <PageHeader meta={data.site.siteMetadata}>
    <div>
    <h1>Hey I'm Ken</h1> 
    Whether you've stopped by due to a recent application, lurking (Google) or you're Michelle Davidson
    just checking in, I appreciate you stopping by.  This page should give you a pretty good idea of 
    who I am on a personal level.
    </div>
  </PageHeader>   
  </>
);


export const query = graphql`
  query AboutQuery {
    site {
      ...siteMetadata
    }
  }
`;