import React, { FunctionComponent } from "react";
import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { Box, Heading, Text } from "grommet";
import { PageHeading, Section } from "../components/Page";
import { Anchor, Paragraph } from "../components/Grommet";
import { Twitter, Link } from "grommet-icons";
import { H2 } from "../components/Grommet/Heading";
import { Timeline } from "../graphql/graphqlTimeline";

export interface ResumePageProps {
  data: {
    site: {};
    experience: {
      nodes: Timeline[];
    };
    education: {
      nodes: Timeline[];
    };
  };
}

const ResumePage: FunctionComponent<ResumePageProps> = ({ data }) => {
  const year = new Date().getFullYear();
  const retirement = 2045 - year;

  return (
    <Box pad="large">
      <PageHeading>Resume</PageHeading>
      <Paragraph>
        <strong>Only 24 more years 'til retirement!</strong> I've had a pretty
        good run so far; only a couple small bumps that I've turned into
        learning opportunities. I've been lucky enough to work in a number roles
        (support, development, design) across a number of industries (transit,
        manufacturing, horse racing).
      </Paragraph>
      {data.experience.nodes.map((job: any) => {
        const endDate = !job.frontmatter.end
          ? "Present"
          : job.frontmatter.end.month + " " + job.frontmatter.end.year;
        const startDate =
          job.frontmatter.start.month + " " + job.frontmatter.start.year;

        return (
          <Section
            heading={job.frontmatter.company.name}
            key={`education-${job.frontmatter.company.name}-${job.frontmatter.role}`}
          >
            <H2 size="medium" margin="none">
              {job.frontmatter.role}
            </H2>
            <Box>
              {startDate} - {endDate}
            </Box>
            <MDXRenderer>{job.body}</MDXRenderer>
          </Section>
        );
      })}
      {data.education.nodes.map(edu => {
        const endDate = !edu.frontmatter.end
          ? "Ongoing"
          : edu.frontmatter.end.month + " " + edu.frontmatter.end.year;

        return (
          <Section
            heading={edu.frontmatter.school?.name}
            key={`education-${edu.frontmatter.school?.name}-${edu.frontmatter.degree}`}
          >
            <H2 size="medium" responsive margin="none">
              {edu.frontmatter.degree}
            </H2>
            <Box direction="row" justify="start" align="center" gap="small">
              {endDate && <Text>{endDate}</Text>}
            </Box>
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

export default ResumePage;
