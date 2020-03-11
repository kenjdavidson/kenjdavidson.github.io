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
        <h1>Husbanding, Fathering, Golfing and Developing my way to retirement.</h1> 
        Besides providing me an online playground for my projects, you'll be able to find information on 
        my <Link to="/resume">professional experience</Link> and <Link to="/about">personal interests</Link>.
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