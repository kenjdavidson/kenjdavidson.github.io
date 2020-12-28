import React from "react";
import { graphql } from "gatsby";
import styled from "styled-components";
import { MDXRenderer } from "gatsby-plugin-mdx";

import { Hero, HeroHeading, HeroParagraph } from "../components/Hero";
import {
  StyledExcerpt,
  ExcerptHeader,
  ExcerptDate,
  ExcerptCategory
} from "../components/ArticleExcerptItem";
import Flex from "../components/Flex";

import useSiteMetadata from "../hooks/useSiteMetadata";
import { PageLayout } from "../components/PageLayout";
import { Box, Heading, Text } from "grommet";
import { Container, ContainerHeading } from "../components/Container";

const CompanyName = styled.span`
  text-transform: uppercase;
  padding-right: 1rem;
  color: var(--base04);
`;

const JobTitle = styled.h2``;

export default ({ data }) => {
  const year = new Date().getFullYear();
  const retirement = 2045 - year;

  return (
    <PageLayout
      pageTitle="Experience and Education"
      pageSummary="Things I've done for money and education"
      pageSlug="/resume"
    >
      <Hero>
        <Box>
          <HeroParagraph>
            <strong>Only {retirement}(or so) years 'til retirement!</strong> I've had a pretty good run so far, only a couple small bumps that
            I've turned into learning opportunities. I've been lucky enough to
            work in a number roles (support, development and design) in a number
            of industries (transit, manufacturing and horse racing).
          </HeroParagraph>
        </Box>
      </Hero>
      <Container heading="Experience">
        {data.experience.nodes.map(job => {
          const endDate = !job.frontmatter.end
            ? "Present"
            : job.frontmatter.end.month + " " + job.frontmatter.end.year;
          const startDate =
            job.frontmatter.start.month + " " + job.frontmatter.start.year;

          return (
            <Box
              direction="row-responsive"
              gap="medium"
              margin={{ top: "medium" }}
              pad="medium"
            >
              <Box basis="1/3" gap="small">
                <Heading level="2">{job.frontmatter.company.name}</Heading>
                <Heading level="3" margin="none">
                  {job.frontmatter.role}
                </Heading>
                <ExcerptHeader>
                  <ExcerptDate>
                    {startDate} - {endDate}
                  </ExcerptDate>
                </ExcerptHeader>
              </Box>
              <Box basis="2/3">
                <MDXRenderer>{job.body}</MDXRenderer>
              </Box>
            </Box>
          );
        })}
      </Container>
      <Container direction="row-responsive" heading="Education" gap="large">
        {data.education.nodes.map(edu => {
          const endDate = !edu.frontmatter.end
            ? "Present"
            : edu.frontmatter.end.month + " " + edu.frontmatter.end.year;

          return (
            <Box
              basis="1/2"
              gap="small"
              pad="medium"
              margin={{ top: "medium" }}
            >
              <Heading level="2" margin="none">
                {edu.frontmatter.subtitle}
              </Heading>
              <Heading level="3" margin="none">
                {edu.frontmatter.title}
              </Heading>
              <ExcerptHeader>
                <ExcerptDate>{endDate}</ExcerptDate>
              </ExcerptHeader>
            </Box>
          );
        })}
      </Container>
    </PageLayout>
  );
};

export const query = graphql`
  query Resume {
    site {
      ...siteMetadata
    }
    experience: allMdx(
      filter: {
        frontmatter: { subcategory: { regex: "/Experience/" } }
        fileAbsolutePath: { regex: "/timeline/" }
      }
      sort: { fields: frontmatter___start___year, order: DESC }
    ) {
      nodes {
        ...experience
      }
    }
    education: allMdx(
      filter: {
        frontmatter: { subcategory: { regex: "/Education/" } }
        fileAbsolutePath: { regex: "/timeline/" }
      }
      sort: { fields: frontmatter___start___year, order: DESC }
    ) {
      nodes {
        ...education
      }
    }
  }
`;
