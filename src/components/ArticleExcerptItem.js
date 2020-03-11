import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components'

import Tags from './Tags';

import device from '../utils/breakpoints';

const ExcerptTitle = styled.h3`
  margin: 0.25em 0 0.5em 0;

  @media ${device.min.tablet} {
    margin: initial;
  }
`;

const ExcerptHeader = styled.header`
  padding: 0px; 
  flex-shrink: 0;
  display: flex;

  @media ${device.min.tablet} {
    display: flex;
    flex-direction: column;
  }
`;

const StyledExcerpt = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  margin-bottom: 2em;

  @media ${device.min.tablet} {
    flex-direction: row;
    align-items: flex-start;
  }
`;

const ExcerptMain = styled.main`
  flex: 1;
`;

const ExcerptFooter = styled.footer`
  margin-top: 0.5em;

  @media ${device.min.tablet} {
    margin-top: 0;
  }
`;

const ExcerptDate = styled.span`
  text-transform: uppercase;
  padding-right: 1rem;
  color: var(--base07);
  order: 2;
  font-weight: initial;

  @media ${device.min.tablet} {
    order: 1;
  }
`;

const ExcerptCategory = styled.span`
  text-transform: uppercase;
  padding-right: 1rem;
  color: var(--base03);
  order 1;
  font-weight: initial;

  @media ${device.min.tablet} {
    order: 2;
  }
`;

const ReadTime = styled.span`
  font-weight: initial;
`;

export default ({ className, post }) => (
  <Link to={ `/${post.fields.slug}`}>      
    <StyledExcerpt className={post.frontmatter.categories}>        
      <ExcerptHeader>
      {post.frontmatter.featureImage ? (
          <img alt={post.frontmatter.title}></img>
        ) : (
          undefined
        )}    
        <ExcerptDate>
          { post.fields.publishTime }
        </ExcerptDate>
        <ExcerptCategory>
          { post.frontmatter.categories }
        </ExcerptCategory>
      </ExcerptHeader>   
      <ExcerptMain style={{flex:1}}>
        <ExcerptTitle>{post.frontmatter.title}</ExcerptTitle>
        { post.frontmatter.tags 
          ? <Tags tags={post.frontmatter.tags}></Tags>
          : undefined } 
      </ExcerptMain>          
      <ExcerptFooter>
        <ReadTime>
          { post.timeToRead } min read
        </ReadTime>
      </ExcerptFooter>     
    </StyledExcerpt>
  </Link>
);

export {
  StyledExcerpt,
  ExcerptHeader,
  ExcerptMain,
  ExcerptFooter,
  ExcerptTitle,
  ExcerptDate,
  ExcerptCategory,
};