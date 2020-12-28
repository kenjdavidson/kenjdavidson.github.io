import React, { FunctionComponent, useContext } from "react";
import { BoxProps, Image, Heading, Box } from 'grommet';
import { SEO , SEOProps} from "./SEO";
import { ThemeContext } from "styled-components";
import styled from 'styled-components';

const PageHeading = styled(Heading)`

`;

export interface PageLayoutProps extends BoxProps {
  pageTitle: string;
  pageSummary: string;
  pageSlug: string;  
  heroContent: any;
  heroImage?: string;
}

export const PageLayout: FunctionComponent<PageLayoutProps> = ({
  pageTitle,
  pageSummary,
  pageSlug,
  heroImage,
  heroContent,
  children,
  ...rest
}) => {

  console.log(useContext(ThemeContext));
  return (
    <>
      <SEO
        title={pageTitle}
        description={pageSummary}
        url={pageSlug}
      ></SEO>
      {children}
    </>
  );
};
