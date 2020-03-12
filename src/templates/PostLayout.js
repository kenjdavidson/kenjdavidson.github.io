import React from 'react';
import { graphql } from 'gatsby';

import SEO from '../components/SEO';
import Article from '../components/Article';

import useSiteMetadata from '../hooks/useSiteMetadata';

export default ({ data, pageContext }) => {
  const post = data.markdownRemark;
  const meta = useSiteMetadata();

  return (
    <>
      <SEO title={`${meta.title} | ${post.frontmatter.title}`}
        description={`${post.frontmatter.summary}`}
        type="article"></SEO>
      <Article post={post}></Article>
    </>
  );
};

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      ...article
    }
  }
`;
