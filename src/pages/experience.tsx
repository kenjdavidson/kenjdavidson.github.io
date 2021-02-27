import React, { FunctionComponent } from 'react';
import { graphql } from 'gatsby';
import { Timeline } from '../graphql/timeline';
import { Seo } from '../components/seo';
import { Section } from '../components/section/section';

export interface ResumePageProps {
  data: {
    experience: {
      nodes: Timeline[];
    };
  };
}

const ResumePage: FunctionComponent<ResumePageProps> = ({ data }) => {
  return (
    <>
      <Seo title="Ken J Davidson - Experience and Education" />
      <Section className="hero">
        <h1>I've seen things!!</h1>
        <p>
          I've had a pretty good run so far, both personally and professionally.
        </p>
        <p>
          <strong>Only 24 more years 'til retirement!</strong>
        </p>
      </Section>
      <Section className="experience-timeline">
        {/* <AntTimeline mode="alternate">
          {data.experience.nodes.map((exp: Timeline) => (
            <AntTimeline.Item>
              {exp.frontmatter.subtitle && (
                <Typography.Text>{exp.frontmatter.subtitle}</Typography.Text>
              )}
              <h3>
                {exp.frontmatter.title}
              </Typography.Title>
            </AntTimeline.Item>
          ))}
        </AntTimeline> */}
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
