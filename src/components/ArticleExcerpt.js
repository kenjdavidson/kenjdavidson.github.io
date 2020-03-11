import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components'

import Tags from './Tags';

const ExcerptTitle = styled.h3`
  margin: 1rem 0 1rem 0;
  padding: 0;
`;

const ExcerptHeader = styled.header`
  padding: 0px;  

  .excerpt-type,
  .excerpt-subtype {
    text-transform: uppercase;
    padding-right: 1rem;
  }

  .excerpt-type {
    color: var(--base03);
  }

  .excerpt-subtype {
    color: var(--base07);
  }
`;

const ExcerptMain = styled.main`
  margin-bottom: 0.8rem;
  font-weight: initial;
`;

const ExcerptFooter = styled.footer``;

const StyledExcerpt = styled.article`  
  padding: 1rem 0;

  a {
    color: var(--base04);
    text-decoration: none;
  }  
`;

export default ({ className, post }) => (
  <StyledExcerpt className={post.frontmatter.categories}>
    <Link to={ `/${post.fields.slug}`}>      
      <ExcerptHeader>
      {post.frontmatter.featureImage ? (
          <img alt={post.frontmatter.title}></img>
        ) : (
          undefined
        )}    
        <span className="excerpt-type">
          { post.frontmatter.categories }
        </span>
        <span className="excerpt-subtype">
          { post.frontmatter.subcategory ? post.frontmatter.subcategory : post.fields.publishTime }
        </span>    
        <ExcerptTitle>{post.frontmatter.title}</ExcerptTitle>
      </ExcerptHeader>
      <ExcerptMain>{post.frontmatter.summary ? post.frontmatter.summary : post.excerpt}</ExcerptMain>
      <ExcerptFooter>
        { post.frontmatter.tags 
          ? <Tags tags={post.frontmatter.tags}></Tags>
          : undefined }        
      </ExcerptFooter>
    </Link>
  </StyledExcerpt>
);