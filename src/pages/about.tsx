import React from 'react';
import { graphql } from 'gatsby';
import { ThemeProvider } from 'styled-components';

import { Seo } from '../components/seo';
import { Breadcrumb } from '../components/breadcrumb';
import {
  Section,
  Heading as SectionHeading,
  Content as SectionContent,
} from '../components/layout/section';
import { Hero } from '../components/layout/hero';
import { Heading, PageHeading } from '../components/heading';
import { invertTheme } from '../styles/themes';
import { SiteMetadata } from '../graphql/siteMetadata';
import { Timeline } from '../graphql/timeline';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import moment from 'moment';
import styled from 'styled-components';
import { TimelineSection } from '../components/timeline';
import slugify from 'slugify';
import { StandardLayout } from '../templates/layout';

const AboutPage: React.FC<AboutPageProps> = ({ data }) => {
  const { timeline } = data;
  const headingText = `A Brief History`;

  return (
    <StandardLayout>
      <Seo
        title="What've I done? Where've I been?"
        description="I've done and I've seen things; probably not as many [or as few] as you, but I have no complaints."
      />
      <Breadcrumb />
      <Hero>
        <PageHeading my="small" data-title={headingText}>
          {headingText}
        </PageHeading>
      </Hero>
      <ThemeProvider theme={invertTheme}>
        <Section size="large" style={{ textAlign: 'center' }} squished>
          <SectionContent>
            <Heading level={5} weight={300}>
              <i>
                "I put my pants on one leg at a time, except when I'm done I
                make gold records!"
              </i>{' '}
              No, sorry, that's a lie, I'm terrible with music. But I have done
              other stuff; not a lot, but some...
            </Heading>
          </SectionContent>
          <SectionContent></SectionContent>
        </Section>
        <Section size="large">
          {timeline.events.map((event) => (
            <TimelineSection
              key={`timeline-event-${slugify(event.frontmatter.title)}`}
              event={event}
            />
          ))}
        </Section>
      </ThemeProvider>
    </StandardLayout>
  );
};

export default AboutPage;

interface AboutPageProps {
  data: {
    site: SiteMetadata;
    timeline: {
      events: Timeline[];
    };
  };
}

export const query = graphql`
  query AboutQuery {
    site {
      ...siteMetadata
    }
    timeline: allMdx(
      filter: { fileAbsolutePath: { regex: "/content/timeline/" } }
      sort: { fields: frontmatter___date, order: ASC }
    ) {
      events: nodes {
        ...timeline
      }
    }
  }
`;
