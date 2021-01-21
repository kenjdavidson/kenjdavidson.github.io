import React, { } from "react";
import { graphql } from "gatsby";
import { PageHeading, Section } from "./Page";
import { Box } from "grommet";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { RecentArticles } from "./Article/RecentArticles";
import { Anchor, Paragraph } from "./Grommet";
import { Fields, Tags, Footer } from "./Article";

export const PostLayout = ({
  data
}) => {
  const { post, next, previous } = data.posts.edges[0];

  return (
    <Box pad="large">
      <Paragraph>
        <Anchor href="/">Home</Anchor> / <Anchor href="/writing">Writing</Anchor> /
      </Paragraph>
      <Section heading={post.frontmatter.category}>
        <PageHeading>
          {post.frontmatter.title}
        </PageHeading>
        <Box pad={{ vertical: "large" }} gap="small">
          <Fields article={post} />
          {post.frontmatter.tags && <Tags tags={post.frontmatter.tags}></Tags>}
        </Box>
        <MDXRenderer>{post.body}</MDXRenderer>
      </Section>
      <Section headingSize="small" outerStyle={{ borderTop: "1px solid var(--background-front)" }}>
        <Footer article={post} />
      </Section>

      <Section heading="Recent Posts">
        <RecentArticles skipArticleId={post.id} showArticles={3} />
      </Section>
    </Box>
  );
};

export const query = graphql`
  query PostQuery ($id: String!) {
    posts: allMdx(filter: { id: { eq: $id } }) {
      edges {
        post: node {
          ...Article
        }
        next {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
        previous {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`;

//405d322c-0726-5575-9703-d695fd464f5a

export default PostLayout;