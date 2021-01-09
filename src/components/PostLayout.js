import React, { } from "react";
import { graphql } from "gatsby";

import useSiteMetadata from "../hooks/useSiteMetadata";
import { PageHeading, Section } from "./SiteLayout";
import { Box, Heading } from "grommet";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { RecentArticles } from "./article/RecentArticles";
import { Anchor, Paragraph } from "./grommet";
import { ArticleFields } from "./article/ArticleFields";
import { ArticleFooter } from "./article/ArticleFooter";

export const PostLayout = ({
  data
}) => {
  const post = data.allMdx.edges[0].node;
  const recent = data.recent.edges;
  const meta = useSiteMetadata();

  return (
    <Box pad="large">
      <Paragraph>
        <Anchor href="/">Home</Anchor> / <Anchor href="/writing">Writing</Anchor> /
      </Paragraph>
      <Section heading={post.frontmatter.category}>
        <PageHeading size="medium">
          {post.frontmatter.title}
        </PageHeading>
        <Paragraph>
          <ArticleFields article={post} />
        </Paragraph>
        <MDXRenderer>{post.body}</MDXRenderer>
        <ArticleFooter article={post} />
      </Section>

      <Section heading="Recent Posts">
        <RecentArticles articles={3} />
      </Section>
    </Box>
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

export default PostLayout;