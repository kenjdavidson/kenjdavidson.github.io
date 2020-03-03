import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

import device from '../utils/breakpoints';

const StyledTitle = styled.header`
  margin: 3rem 0;
  padding: 0 var(--gutter);

  h1 {
    margin-top: 1rem;
  } 
`;
const Title = ({ slug, children }) => (
  <StyledTitle>
    <Link to="/">Home</Link>&nbsp;/ <Link to="/writing">Writing</Link>&nbsp;/
    <Link to={slug}><h1>{children}</h1></Link>
  </StyledTitle>
);

const StyledFooter = styled.footer``;
const Footer = ({children}) => (
  <StyledFooter>{children}</StyledFooter>
);

const StyledArticle = styled.article`
  width: 100%;
  min-height: 100vh;

  main > *:not(img):not(.gatsby-highlight) {
    padding: 0 var(--gutter);
  }

  h2, h3 {
    margin-top: 2em;
    margin-bottom: 1em;
  }

  @media ${device.min.laptop} {
    max-width: var(--max-width-laptop);
    margin: 0px auto;

    main > * {
      padding: 0 var(--gutter);
    }
  }

  @media ${device.min.desktop} {
    max-width: var(--max-width-desktop);
  } 
`;
export default ({post}) => {
  return (
    <StyledArticle> 
      <Title slug={post.fields.slug}>{post.frontmatter.title}</Title>        
      <main dangerouslySetInnerHTML={{ __html: post.html }}></main> 
    </StyledArticle>
  );
};