import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import { MDXRenderer } from "gatsby-plugin-mdx"

import device from '../utils/breakpoints';

const StyledTitle = styled.header`
  margin: 3rem 0;

  h1 {
    margin-top: 1rem;
  }
`;
const Title = ({ slug, children }) => (
  <StyledTitle>
    <Link to="/">Home</Link>&nbsp;/ <Link to="/writing">Writing</Link>&nbsp;/
    <Link to={slug}>
      <h1>{children}</h1>
    </Link>
  </StyledTitle>
);

const StyledFooter = styled.footer``;
const Footer = ({ children }) => <StyledFooter>{children}</StyledFooter>;

const StyledArticle = styled.article`
  width: 100%;
  min-height: 100vh;

  h2,
  h3,
  h4 {
    margin-top: 2em;
    margin-bottom: 1em;
  }

  span.gatsby-resp-image-wrapper {
    margin: 3em auto;
    box-shadow: 1px 1px 10px 1px var(--base05);
  }

  @media ${device.max.tablet} {
    span.gatsby-resp-image-wrapper,
    div.gatsby-highlight {
      margin-left: calc(var(--gutter) * -1) !important;
      margin-right: calc(var(--gutter) * -1) !important;
    }
  }

  @media ${device.min.laptop} {
    max-width: var(--max-width-laptop);
    margin: 0px auto;
  }

  @media ${device.min.desktop} {
    max-width: var(--max-width-desktop);
  }
`;
export default ({ post }) => (
  <>
    <StyledArticle>
      <Title slug={post.fields.slug}>{post.frontmatter.title}</Title>
      <MDXRenderer>{post.body}</MDXRenderer>
      <Footer></Footer>
    </StyledArticle>
  </>
);
