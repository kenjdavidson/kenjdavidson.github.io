import React from 'react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { Seo } from '../components/seo';
import { PageQuery } from '../graphql/pages';
import { Section } from '../components/section/section';
import { useLocation } from '@reach/router';
import { Breadcrumb } from '../components/section/breadcrumb';
import { Header } from '../components/header/header';
import useSiteMetadata from '../hooks/useSiteMetadata';

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
      <div>
        <div>
          {location.pathname.split('/').length > 2 ? (
            <Section size="medium">
              <Breadcrumb paths={location.pathname.split('/')} />
            </Section>
          ) : undefined}
          <Section>
            <h1>{page.frontmatter.title}</h1>
            <MDXRenderer>{page.body}</MDXRenderer>
          </Section>
          {page.sections &&
            page.sections.map((section) => (
              <Section key={`section-${section.id}`}>
                <h2>{section.frontmatter.title}</h2>
                <MDXRenderer>{section.body}</MDXRenderer>
              </Section>
            ))}
        </div>
      </div>
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
