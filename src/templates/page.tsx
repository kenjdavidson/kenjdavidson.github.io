import React from 'react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { Seo } from '../components/seo';
import { PageQuery } from '../graphql/pages';
import { Section } from '../components/layout/section';
import { Hero } from '../components/layout/hero';
import { useLocation } from '@reach/router';
import { Breadcrumb, buildCrumbs } from '../components/breadcrumb';
import useSiteMetadata from '../hooks/useSiteMetadata';
import { invertTheme, sizes } from '../styles/themes';
import { ThemeProvider } from 'styled-components';
import { mdxComponents } from '../components/mdxComponents';
import { MDXProvider } from '@mdx-js/react';
import { PageHeading, Heading, AnchorHeading } from '../components/heading';
import { StandardLayout } from './layout';

export const PageTemplate = ({ data }: PageQueryProps) => {
  const page = data.pagesMdx.pages[0];

  const seo = {
    title: page.frontmatter.title,
    description: page.frontmatter.summary,
    image:
      page.frontmatter.featureImage &&
      page.frontmatter.featureImage.childImageSharp.fluid.src,
  };

  const { pathname } = useLocation();

  return (
    <StandardLayout>
      <Seo {...seo} />
      <Breadcrumb crumbs={buildCrumbs(pathname, 1)} />
      <Hero size="small">
        <PageHeading my="small" data-title={page.frontmatter.title}>
          {page.frontmatter.title}
        </PageHeading>
      </Hero>
      <ThemeProvider theme={invertTheme}>
        <Section size="large">
          <section>
            <MDXRenderer>{page.body}</MDXRenderer>
          </section>
          {page.sections &&
            page.sections.map((section) => (
              <section key={`section-${section.id}`}>
                <AnchorHeading
                  anchor={section.frontmatter.title}
                  level={2}
                  my="large"
                >
                  {section.frontmatter.title}
                </AnchorHeading>
                <MDXRenderer>{section.body}</MDXRenderer>
              </section>
            ))}
        </Section>
      </ThemeProvider>
    </StandardLayout>
  );
};

export default PageTemplate;

interface PageQueryProps {
  data: PageQuery;
}

export const query = graphql`
  query PageQuery($id: String!) {
    pagesMdx: allMdx(filter: { id: { eq: $id } }) {
      pages: nodes {
        ...MdxPage
      }
    }
  }
`;
