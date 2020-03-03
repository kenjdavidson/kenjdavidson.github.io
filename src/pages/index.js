import React from "react";
import { graphql, Link } from "gatsby";
import styled from 'styled-components';

import PageHeader from '../components/PageHeader';
import { LargeSection, SectionHeader } from '../components/Section';
import ArticleGrid from '../components/ArticleGrid';
import Center from '../components/Center';

import '../utils/fragments';

export default ({ data }) => (
  <>
    <PageHeader meta={data.site.siteMetadata}>
      <div>
        <h1>Husbanding, Fathering, Gofling and Developing my way to retirement.</h1> 
        Check out my <Link to="/about">personal interests</Link>, <Link to="/resume">professional experience</Link> or 
        some of the <Link to="/writing">posts/projects</Link> I've [finally] published.
      </div>
    </PageHeader>
    <LargeSection>
      <SectionHeader>Recent</SectionHeader>
      <ArticleGrid posts={ data.allMarkdownRemark.edges }></ArticleGrid>              
      
      <Center padding="2rem">
        <Link to="/writing">Read more</Link>      
      </Center>        
    </LargeSection>    
  </>
)

export const query = graphql`
  query HomeQuery {
    site {
      ...siteMetadata
    }
    allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/posts/"}}, limit: 6, sort: {fields: fields___publishTime, order: DESC}) {
      edges {
        node {
          ...article
        }
      }
    }
  }
`;