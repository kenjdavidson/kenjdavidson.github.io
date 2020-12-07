import React from "react";
import { graphql } from "gatsby";
import styled from 'styled-components';
import { MDXRenderer } from "gatsby-plugin-mdx"

import SEO from '../components/SEO';
import PageHeader from '../components/PageHeader';
import Section, { SectionHeader } from '../components/Section';
import {
  StyledExcerpt,
  ExcerptHeader,
  ExcerptDate,
  ExcerptCategory,
} from '../components/ArticleExcerptItem';
import Flex from '../components/Flex';

import useSiteMetadata from '../hooks/useSiteMetadata';

const CompanyName = styled.span`
  text-transform: uppercase;
  padding-right: 1rem;
  color: var(--base04);
`;

const JobTitle = styled.h2``;

export default ({ data }) => {
  const meta = useSiteMetadata();
  const year = new Date().getFullYear();
  const retirement = 2045 - year;

  return (
    <>      
      <SEO title={ `${meta.title} | Resume` }
        description="Check out where I've worked and what I've studied."></SEO> 
      <PageHeader meta={data.site.siteMetadata}>
        <div>
          <h3>Only {retirement} more years 'til retirement!</h3> I've had a pretty good run so far, only a couple small
          bumps that I've turned into learning opportunities.  I've been lucky enough to work in a number roles (support,
          development, design) in a number of industries (transit, manufacturing, horse racing).   
        </div>
      </PageHeader>  
      <Section>
      <Flex>    
        <SectionHeader>Experience</SectionHeader>
          { data.experience.nodes.map((job) => {

            const endDate = !job.frontmatter.end ? 'Present' 
              : job.frontmatter.end.month + ' ' + job.frontmatter.end.year;
            const startDate = job.frontmatter.start.month + ' ' + job.frontmatter.start.year;
          
            return (    
              <StyledExcerpt>
                <ExcerptHeader>
                  <ExcerptDate>{ endDate }</ExcerptDate>
                  <ExcerptCategory>{ startDate }</ExcerptCategory> 
                </ExcerptHeader>
                <Flex>
                  <CompanyName>{ job.frontmatter.title }</CompanyName>
                  <JobTitle className="title">{ job.frontmatter.subtitle }</JobTitle>
                  <MDXRenderer>{job.body}</MDXRenderer>
                </Flex>                
              </StyledExcerpt>
            )
          })}
      </Flex>
      <Flex>    
        <header>
          <SectionHeader>Education</SectionHeader>
        </header>  
        <main>
          { data.education.nodes.map((edu) => {

            const endDate = !edu.frontmatter.end ? 'Present' 
              : edu.frontmatter.end.month + ' ' + edu.frontmatter.end.year;

            return (   
              <StyledExcerpt>
                <ExcerptHeader>
                  <ExcerptDate>{ endDate }</ExcerptDate>
                </ExcerptHeader>            
                <Flex>
                  <CompanyName>{ edu.frontmatter.title }</CompanyName>                
                  <JobTitle className="title">{ edu.frontmatter.subtitle }</JobTitle>
                  <MDXRenderer>{edu.body}</MDXRenderer>
                </Flex>                
              </StyledExcerpt>    
            )
          })}
        </main>
      </Flex>    
      </Section> 
    </>
  );
};


export const query = graphql`
  query Resume {
    site {
      ...siteMetadata
    }
    experience: allMdx(filter: {frontmatter: {subcategory: {regex: "/Experience/"}}, fileAbsolutePath: {regex: "/timeline/"}}, sort: {fields: frontmatter___start___year, order: DESC}) {
      nodes {
        ...timeline
      }
    }
    education: allMdx(filter: {frontmatter: {subcategory: {regex: "/Education/"}}, fileAbsolutePath: {regex: "/timeline/"}}, sort: {fields: frontmatter___start___year, order: DESC}) {
      nodes {
        ...timeline
      }
    }
  }
`;