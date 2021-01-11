import React, { } from "react";
import { graphql } from "gatsby";

import useSiteMetadata from "../hooks/useSiteMetadata";
import { PageHeading, Section } from "./Page";
import { Box, Heading } from "grommet";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { RecentArticles } from "./Article/RecentArticles";
import { Anchor, Paragraph } from "./Grommet";
import { Fields, Footer } from "./Article";

export const PostLayout = ({
  data
}) => {
  const post = data.allMdx.edges[0].node;

  return (
    <Box pad="large">
      <Paragraph>
        <Anchor href="/">Home</Anchor> / <Anchor href="/writing">Writing</Anchor> /
      </Paragraph>
      <Section heading={post.frontmatter.category}>
        <PageHeading size="medium">
          {post.frontmatter.title}
        </PageHeading>
        <Fields article={post} />
        <MDXRenderer>{post.body}</MDXRenderer>
        <Footer article={post} />
      </Section>

      <Section heading="Recent Posts">
        <RecentArticles skipArticleId={post.id} showArticles={3} />
      </Section>
    </Box>
  );
};

export const query = graphql`
  query($id: String!) {
    allMdx(filter: { id: { eq: $id } }) {
      edges {
        node {
          ...articles
        }
      }
    }
  }
`;

export default PostLayout;