import React, { FunctionComponent } from "react";
import { GlobalStyle } from "../components/GlobalStyle";
import useSiteMetadata from "../hooks/useSiteMetadata";
import { Layout, Typography } from "antd";
import { Section } from "../components/section/section";
import { Footer } from "../components/footer/footer";
import { Header } from "../components/header/header";

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
      <Layout>
        <Layout.Content dir="vertical">{children}</Layout.Content>
        <Footer meta={meta} />
      </Layout>
    </>
  );
};

export default SiteTemplate;
