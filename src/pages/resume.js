import React from "react";
import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";

import { Hero, HeroParagraph } from "../components/Hero";
import {
  ExcerptHeader,
  ExcerptDate
} from "../components/ArticleExcerptItem";

import { Box, Heading } from "grommet";
import { Section } from "../components/SiteLayout";
import { AnchorLink } from "../components/grommet";
import { Twitter, Link } from "grommet-icons";

export default ({ data }) => {
  const year = new Date().getFullYear();
  const retirement = 2045 - year;

  return (
    <Box
      // pageTitle="Experience and Education"
      // pageSummary="Things I've done for money and education"
      // pageSlug="/resume"
      pad="large"
    >
      {data.experience.nodes.map(job => {
        const endDate = !job.frontmatter.end
          ? "Present"
          : job.frontmatter.end.month + " " + job.frontmatter.end.year;
        const startDate =
          job.frontmatter.start.month + " " + job.frontmatter.start.year;

        return (
          <Section heading={job.frontmatter.company.name}>
            <Heading level="2" size="medium">
              {job.frontmatter.role}
            </Heading>
            <ExcerptHeader>
              <ExcerptDate>
                {startDate} - {endDate}
              </ExcerptDate>
            </ExcerptHeader>
            <MDXRenderer>{job.body}</MDXRenderer>
          </Section>
        );
      })}
      {data.education.nodes.map(edu => {
        const endDate = !edu.frontmatter.end
          ? "Present"
          : edu.frontmatter.end.month + " " + edu.frontmatter.end.year;

        return (
          <Section heading={edu.frontmatter.school.name}>
            <Heading level="2" size="medium">
              {edu.frontmatter.degree}
            </Heading>
            <Box direction="row">
              {edu.frontmatter.school.website && <AnchorLink icon={<Link size="medium" />}></AnchorLink>}
              {edu.frontmatter.school.twitter && <AnchorLink icon={<Twitter size="medium" />}></AnchorLink>}
            </Box>
            <ExcerptHeader>
              {edu.frontmatter.startDate && endDate && <ExcerptDate>{endDate}</ExcerptDate>}
            </ExcerptHeader>
            <MDXRenderer>{edu.body}</MDXRenderer>
          </Section>
        );
      })}
    </Box>
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
