import React, { FunctionComponent } from 'react';
import { GlobalStyle } from '../components/globalStyle';
import useSiteMetadata from '../hooks/useSiteMetadata';
import { Layout, Typography } from 'antd';
import { Section } from '../components/section/section';
import { Footer } from '../components/footer/footer';
import { Header } from '../components/header/header';
import { AntdMdxComponents } from '../components/mdxComponents';
import { MDXProvider } from '@mdx-js/react';

export interface SiteTemplateProps {
  children: React.ComponentType[];
}

export const SiteTemplate: FunctionComponent<SiteTemplateProps> = ({
  children,
}) => {
  const meta = useSiteMetadata();

  return (
    <>
      <GlobalStyle />
      <MDXProvider components={AntdMdxComponents}>
        <Layout>
          <Header />
          <Layout.Content dir="vertical">{children}</Layout.Content>
          <Footer meta={meta} />
        </Layout>
      </MDXProvider>
    </>
  );
};

export default SiteTemplate;
