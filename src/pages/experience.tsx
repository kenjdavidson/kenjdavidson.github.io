import React, { FunctionComponent } from 'react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { Box, Text } from 'grommet';
import { Link } from 'grommet-icons';
import { Timeline } from '../graphql/timeline';
import { Seo } from '../components/seo';
import { Section } from '../components/section/section';
import { Timeline as AntTimeline, Typography } from 'antd';

export interface ResumePageProps {
  data: {
    experience: {
      nodes: Timeline[];
    };
  };
}

const ResumePage: FunctionComponent<ResumePageProps> = ({ data }) => {
  const year = new Date().getFullYear();

  return (
    <>
      <Seo title="Ken J Davidson - Experience and Education" />
      <Section className="hero">
        <Typography.Title>I've seen things!!</Typography.Title>
        <Typography.Paragraph>
          I've had a pretty good run so far, both personally and professionally.
        </Typography.Paragraph>
        <Typography.Paragraph>
          <Typography.Text strong>
            Only 24 more years 'til retirement!
          </Typography.Text>
        </Typography.Paragraph>
      </Section>
      <Section className="experience-timeline">
        <AntTimeline mode="alternate">
          {data.experience.nodes.map((exp: Timeline) => (
            <AntTimeline.Item>
              {exp.frontmatter.subtitle && (
                <Typography.Text>{exp.frontmatter.subtitle}</Typography.Text>
              )}
              <Typography.Title level={3}>
                {exp.frontmatter.title}
              </Typography.Title>
            </AntTimeline.Item>
          ))}
        </AntTimeline>
      </Section>
      {/* {data.experience.nodes.map((job: any) => {
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
        })} */}
    </>
  );
};

export const query = graphql`
  query Resume {
    site {
      ...siteMetadata
    }
    experience: allMdx(
      filter: {
        fileAbsolutePath: { regex: "/timeline/" }
        frontmatter: { draft: { ne: true } }
      }
      sort: { fields: frontmatter___start___year }
    ) {
      nodes {
        ...experience
      }
    }
  }
`;

export default ResumePage;
