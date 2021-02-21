import React from 'react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { Seo } from '../components/seo';
import { PageQuery } from '../graphql/pages';
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
          {location.pathname.split('/').length > 2 ? (
            <Section verticalPad="md">
              <Breadcrumb paths={location.pathname} />
            </Section>
          ) : undefined}
          <Section>
            <Typography.Title>{page.frontmatter.title}</Typography.Title>
            <MDXRenderer>{page.body}</MDXRenderer>
          </Section>
          {page.sections &&
            page.sections.map((section) => (
              <Section key={`section-${section.id}`}>
                <Typography.Title level={2}>
                  {section.frontmatter.title}
                </Typography.Title>
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
