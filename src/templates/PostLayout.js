import React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';

import SEO from '../components/SEO';
import Section, { SectionHeader } from '../components/Section';
import Article from '../components/Article';
import ArticleGrid from '../components/ArticleGrid';

import useSiteMetadata from '../hooks/useSiteMetadata';
import device from '../utils/breakpoints';

const StyledArticlesGrid = styled(ArticleGrid)`
  @media ${device.min.laptop} {
    article:last-child {
      display: none;
    }
  }
`;

export default ({ data }) => {
  const post = data.allMdx.edges[0].node;
  const recent = data.recent.edges;
  const meta = useSiteMetadata();

  return (
    <>
      <SEO title={`${meta.title} | ${post.frontmatter.title}`}
        description={`${post.frontmatter.summary}`}
        type="article"></SEO>
      <Section>
        <Article post={post}></Article>
      </Section>
      <Section>
        <SectionHeader>Recent</SectionHeader>
        <StyledArticlesGrid posts={ recent }></StyledArticlesGrid>                           
      </Section>  
    </>
  );
};

export const query = graphql`
  query($id: String!) {
    allMdx(filter: {id: {eq: $id} }) {
      edges {
        node {
          ...article
        }
      }
    }
    recent: allMdx(filter: {id: {ne: $id }, fileAbsolutePath: {regex: "/posts/"}}, limit: 4, sort: {fields: fields___publishTime, order: DESC}) {
      edges {
        node {
          ...article
        }
      }
    }
  }
`;
