import React from "react";
import { graphql } from "gatsby";

import Layout from "../templates/Layout";
import { FamilySection, BlogSection } from "../components/home";
import "../scss/main.scss";

export default ({ data }) => (
  <Layout>
    <FamilySection></FamilySection>
    <BlogSection posts={ data.allMarkdownRemark.edges }></BlogSection>
  </Layout>
)

export const query = graphql`
  query BlogSectionQuery {
    allMarkdownRemark(limit: 6, sort: {fields: [fields___date], order: DESC}) {
      edges {
        node {
          frontmatter {
            categories
            description
            tags
            title
          }
          timeToRead
          excerpt
          fields {
            date
            slug
          }
        }
      }
    }
  }
`;