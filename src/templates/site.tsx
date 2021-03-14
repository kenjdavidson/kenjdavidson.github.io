import React, { FunctionComponent } from 'react';
import { ThemeProvider } from 'styled-components';
import { greenTheme } from '../styles/themes';
import { Helmet } from 'react-helmet';
import { GlobalStyle } from '../components/globalStyle';

export interface SiteTemplateProps {
  children: React.ComponentType[];
}

export const SiteTemplate: FunctionComponent<SiteTemplateProps> = ({
  children,
}) => {
  return (
    <>
      <Helmet>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=League+Script&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <ThemeProvider theme={greenTheme}>
        <GlobalStyle />
        {children}
      </ThemeProvider>
    </>
  );
};
SiteTemplate.displayName = 'SiteTemplate';

export default SiteTemplate;
