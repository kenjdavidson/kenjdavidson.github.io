import React, { useContext } from "react";
import { graphql } from "gatsby";
import styled from "styled-components";

import { SEO } from "../components/SEO";
import Section, { SectionHeader } from "../components/Section";
import Article, { ArticleTitle, ArticleFooter } from "../components/Article";
import ArticleGrid from "../components/ArticleGrid";
import Tags from "../components/Tags";

import useSiteMetadata from "../hooks/useSiteMetadata";
import device from "../utils/breakpoints";
import { MDXProvider } from "@mdx-js/react";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { MDXComponents } from "../components/grommet";

const StyledArticlesGrid = styled(ArticleGrid)`
  @media ${device.min.laptop} {
    article:last-child {
      display: none;
    }
  }
`;

const StyledTags = styled(Tags)`
  margin-bottom: 3em;
`;

export default ({ data }) => {
  const post = data.allMdx.edges[0].node;
  const recent = data.recent.edges;
  const meta = useSiteMetadata();

  return (
    <>
      <SEO
        title={`${meta.title} | ${post.frontmatter.title}`}
        description={`${post.frontmatter.summary}`}
        type="article"
      ></SEO>
      <MDXProvider components={MDXComponents}>
        <Section>
          <Article>
            <ArticleTitle slug={post.fields.slug}>
              {post.frontmatter.title}
            </ArticleTitle>
            <MDXRenderer>{post.body}</MDXRenderer>
            <ArticleFooter></ArticleFooter>
          </Article>
        </Section>
        <Section>
          <SectionHeader>Recent</SectionHeader>
          <StyledArticlesGrid posts={recent}></StyledArticlesGrid>
        </Section>
      </MDXProvider>
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
