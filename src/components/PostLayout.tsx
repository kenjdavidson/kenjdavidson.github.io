import React, { useContext } from "react";
import { graphql } from "gatsby";
import { PageHeading, Section } from "./page";
import { Box, ResponsiveContext, BoxProps } from "grommet";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { Fields, Footer, List as ArticleList, Tags } from "./article";
import { Anchor, Paragraph } from "./grommet";
import { Seo } from "./Seo";
import { css } from "styled-components";
import styled from "styled-components";

export const PostLayout = ({ location, data }: any) => {
  const { post, next, previous } = data.posts.edges[0];
  const size = useContext(ResponsiveContext);

  return (
    <>
      <Seo
        title={post.frontmatter.title}
        description={post.frontmatter.description}
        image={post.frontmatter.featureImage}
      />
      <Box pad="large">
        <Paragraph>
          <Anchor href="/">Home</Anchor> /{" "}
          <Anchor href="/writing">Writing</Anchor> /
        </Paragraph>
        <Box gap="large">
          <Section heading={post.frontmatter.category}>
            <PageHeading>{post.frontmatter.title}</PageHeading>
            <Box pad={{ vertical: "large" }} gap="small">
              <Fields article={post} containerProps={{ justify: "center" }} />
              {post.frontmatter.tags && (
                <Tags
                  tags={post.frontmatter.tags}
                  containerProps={{ justify: "center" }}
                ></Tags>
              )}
            </Box>
            <MDXRenderer>{post.body}</MDXRenderer>
          </Section>
          <Section
            headingSize="small"
            headingPad="small"
            outerStyle={{ borderTop: "1px solid var(--background-front)" }}
          >
            <Footer article={post} shareUrl={location.href} />
          </Section>
          <Section heading="Recent Posts">
            <ArticleList articles={data.recent.articles} />
          </Section>
        </Box>
      </Box>
    </>
  );
};

export default PostLayout;

export const query = graphql`
  query PostQuery($id: String!) {
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
    recent: allMdx(
      sort: { fields: fields___publishTime, order: DESC }
      limit: 3
      filter: {
        frontmatter: { type: { eq: "Post" }, draft: { ne: true } }
        id: { ne: $id }
      }
    ) {
      articles: nodes {
        ...Article
      }
    }
  }
`;
