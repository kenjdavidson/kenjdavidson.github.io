import React from 'react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { Seo } from '../components/seo';
import { PageQuery } from '../graphql/pages';
import { Container } from '../components/layout/container';
import { useLocation } from '@reach/router';
import { Breadcrumb } from '../components/layout/breadcrumb';
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
            <Container size="medium">
              <Breadcrumb paths={location.pathname.split('/')} />
            </Container>
          ) : undefined}
          <Container>
            <h1>{page.frontmatter.title}</h1>
            <MDXRenderer>{page.body}</MDXRenderer>
          </Container>
          {page.sections &&
            page.sections.map((section) => (
              <Container key={`section-${section.id}`}>
                <h2>{section.frontmatter.title}</h2>
                <MDXRenderer>{section.body}</MDXRenderer>
              </Container>
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
