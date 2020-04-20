import React from "react";
import { graphql, Link } from "gatsby";
import Helmet from 'react-helmet';

import PageHeader from '../components/PageHeader';
import Section, { SectionHeader } from '../components/Section';
import ArticleGrid from '../components/ArticleGrid';
import Center from '../components/Center';

import useSiteMetadata from '../hooks/useSiteMetadata';
import '../utils/fragments';

export default ({ data }) => {
  const meta = useSiteMetadata();

  return (
    <>
      <Helmet>
        <title>{ `${meta.title} | ${meta.summary}` }</title>
      </Helmet>
      <PageHeader>
        <div>
          <h1>Husbanding, Fathering, Golfing and Developing my way to retirement.</h1> 
          Besides providing me an online playground for my projects, you'll be able to find information on 
          my <Link to="/resume">professional experience</Link> and <Link to="/about">personal interests</Link>.
        </div>
      </PageHeader>
      <blockquote class="error">
        <p>
          Everyone stay safe in these crazy <strong>COVID-19</strong> times!!  Stay home when you can or are feeling ill, if you get out for exercise or shopping respect others personal space, and just try to be patient!  This is going on, it's going to go on for a while, the only way we get through this is supporting each other (and the government, regardless of your beliefs).
        </p>
      </blockquote>
      <Section>
        <SectionHeader>Recent</SectionHeader>
        <ArticleGrid posts={ data.allMdx.edges }></ArticleGrid>                    
        <Center padding="2rem">
          <Link to="/writing">Read more</Link>      
        </Center>        
      </Section>    
    </>
  )
};

export const query = graphql`
  query HomeQuery {
    allMdx(filter: {fileAbsolutePath: {regex: "/posts/"}}, limit: 6, sort: {fields: fields___publishTime, order: DESC}) {
      edges {
        node {
          ...article
        }
      }
    }
  }
`;
