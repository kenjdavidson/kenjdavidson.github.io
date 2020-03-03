import React from "react";
import { graphql } from "gatsby";

import Container from '../components/Container';
import Article from '../components/Article';

import '../utils/fragments';

export default ({ data, pageContext }) => {
  const post = data.markdownRemark;    
  
  return (
    <Article
      post={post}>
    </Article>
  );
};

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      ...article
    }
  }
`;