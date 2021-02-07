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
import { PageQuery } from "../graphql/pages";
import { H2, H1 } from "./grommet";

export const PageLayout = ({ data }: PageQueryProps) => {
  const page = data.pagesMdx.pages[0];
  const sections = data.sectionsMdx.sections;
  const size = useContext(ResponsiveContext);

  return (
    <>
      <Seo
        title={page.frontmatter.title}
        description={page.frontmatter.summary}
        image={page.frontmatter.featureImage}
      />
      <Box pad="large">
        <PageHeading>{page.frontmatter.title}</PageHeading>
        <MDXRenderer>{page.body}</MDXRenderer>
        {sections.map(section => (
          <Section key={`section-${section.id}`} headingPad="none">
            <H2>{section.frontmatter.title}</H2>
            <MDXRenderer>{section.body}</MDXRenderer>
          </Section>
        ))}
      </Box>
    </>
  );
};

export default PageLayout;

interface PageQueryProps {
  data: PageQuery;
}

export const query = graphql`
  query PageQuery($id: String!) {
    pagesMdx: allMdx(filter: { id: { eq: $id } }) {
      pages: nodes {
        ...Page
      }
    }
    sectionsMdx: allMdx(
      filter: { frontmatter: { type: { eq: "Section" }, draft: { ne: true } } }
      sort: { fields: frontmatter___order }
    ) {
      sections: nodes {
        ...PageSection
      }
    }
  }
`;
