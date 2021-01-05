import React, { } from "react";
import { graphql } from "gatsby";


import useSiteMetadata from "../hooks/useSiteMetadata";
import { Section } from "./SiteLayout";
import { Box, Heading } from "grommet";
import { MDXRenderer } from "gatsby-plugin-mdx";

export const PostLayout = ({
  data
}) => {
  const post = data.allMdx.edges[0].node;
  const recent = data.recent.edges;
  const meta = useSiteMetadata();

  return (
    <Box pad="large">
      <Section heading="Article">
        <Heading level="2" size="medium" margin="none">
          {post.frontmatter.title}
        </Heading>
        <MDXRenderer>{post.body}</MDXRenderer>
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