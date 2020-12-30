import React, { FunctionComponent, useContext } from "react";
import { graphql } from "gatsby";
import styled from "styled-components";

import { SEO } from "../components/SEO";
import Article, { ArticleTitle, ArticleFooter } from "../components/Article";
import ArticleGrid from "../components/ArticleGrid";
import Tags from "../components/Tags";

import useSiteMetadata from "../hooks/useSiteMetadata";
import device from "../utils/breakpoints";
import { MDXProvider } from "@mdx-js/react";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { MDXComponents } from "../components/grommet";
import { Section } from "../components/SiteLayout";

export default props => {
  // const post = data.allMdx.edges[0].node;
  // const recent = data.recent.edges;
  // const meta = useSiteMetadata();

  return (
    <>
      <Section heading="Article">
        {/* //{" "}
        <Article>
          //{" "}
          <ArticleTitle slug={post.fields.slug}>
            // {post.frontmatter.title}
            //{" "}
          </ArticleTitle>
          // <MDXRenderer>{post.body}</MDXRenderer>
          // <ArticleFooter></ArticleFooter>
          //{" "}
        </Article> */}
      </Section>

      <Section heading="Recent Posts">
        {/* // <SectionHeader>Recent</SectionHeader>
        // <StyledArticlesGrid posts={recent}></StyledArticlesGrid> */}
      </Section>
    </>
  );
};

export const query = graphql`
  query($id: String!) {
    allMdx(filter: { id: { eq: $id } }) {
      edges {
        node {
          ...article
        }
      }
    }
    recent: allMdx(
      filter: { id: { ne: $id }, fileAbsolutePath: { regex: "/posts/" } }
      limit: 4
      sort: { fields: fields___publishTime, order: DESC }
    ) {
      edges {
        node {
          ...article
        }
      }
    }
  }
`;
