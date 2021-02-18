import React from 'react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { Seo } from '../components/Seo';
import { PageQuery } from '../graphql/pages';
import { H2 } from '../components/grommet';
import { Section } from '../components/section/section';
import { Layout, Typography } from 'antd';
import { useLocation } from '@reach/router';
import { Breadcrumb } from '../components/section/breadcrumb';
import { Header } from '../components/header/header';
import useSiteMetadata from '../hooks/useSiteMetadata';
import { Content } from 'antd/lib/layout/layout';

export const PageTemplate = ({ data }: PageQueryProps) => {
  const page = data.pagesMdx.pages[0];

  const meta = useSiteMetadata();
  const location = useLocation();

  const paths = location.pathname.split('/').filter((p, i) => i > 0);

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
      <Layout>
        <Header meta={meta} />
        <Content>
          {paths.length > 1 ? (
            <Section verticalPad="md">
              <Breadcrumb paths={paths} />
            </Section>
          ) : undefined}
          <Section>
            <Typography.Title>{page.frontmatter.title}</Typography.Title>
            <MDXRenderer>{page.body}</MDXRenderer>
          </Section>
          {page.sections &&
            page.sections.map((section) => (
              <Section key={`section-${section.id}`}>
                <H2>{section.frontmatter.title}</H2>
                <MDXRenderer>{section.body}</MDXRenderer>
              </Section>
            ))}
        </Content>
      </Layout>
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
