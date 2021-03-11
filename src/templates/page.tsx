import React from 'react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { Seo } from '../components/seo';
import { PageQuery } from '../graphql/pages';
import { Hero, Section } from '../components/layout/container';
import { useLocation } from '@reach/router';
import { Breadcrumb } from '../components/breadcrumb';
import useSiteMetadata from '../hooks/useSiteMetadata';
import { invertTheme, sizes } from '../styles/themes';
import { ThemeProvider } from 'styled-components';
import { mdxComponents } from '../components/mdxComponents';
import { MDXProvider } from '@mdx-js/react';
import { PageHeading } from '../components/heading';

export const PageTemplate = ({ data }: PageQueryProps) => {
  const page = data.pagesMdx.pages[0];

  const meta = useSiteMetadata();
  const location = useLocation();

  const seo = {
    title: page.frontmatter.title,
    description: page.frontmatter.summary,
    image:
      page.frontmatter.featureImage &&
      page.frontmatter.featureImage.childImageSharp.fluid.src,
  };

  return (
    <>
      <Seo {...seo} />
      {location.pathname.split('/').length > 2 ? (
        <Breadcrumb
          paths={location.pathname
            .split('/')
            .splice(0, location.pathname.split('/').length - 1)}
        />
      ) : undefined}
      <Hero size="small">
        <PageHeading margin="small" data-title={page.frontmatter.title}>
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
                <h2>{section.frontmatter.title}</h2>
                <MDXRenderer>{section.body}</MDXRenderer>
              </section>
            ))}
        </Section>
      </ThemeProvider>
    </>
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
