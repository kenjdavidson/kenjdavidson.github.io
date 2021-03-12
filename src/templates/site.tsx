import React, { FunctionComponent, useState, MouseEvent } from 'react';
import styled, { css, ThemeProvider } from 'styled-components';
import { baseTheme, fixed, invertTheme } from '../styles/themes';
import { Footer } from '../components/footer';
import { Helmet } from 'react-helmet';
import { createGlobalStyle } from 'styled-components';
import { VortexReverse } from 'react-burgers';
import { navigate, useStaticQuery, graphql } from 'gatsby';
import { GlobalStyle } from '../components/globalStyle';
import { Navigation, Nav } from '../components/navigation';
import { MDXProvider } from '@mdx-js/react';
import { mdxComponents } from '../components/mdxComponents';
import { Link } from '../components/link';

/**
 * Provides the `Hamburger` implementation for the `SiteTemplate`.  This is currently
 * using the `react-burgers` library - but eventually it will be replaced with a
 * custom version.
 *
 */
const Hamburger = styled(VortexReverse)`
  z-index: 10001;

  &.Burger {
    position: fixed;
    top: 0.5rem;
    right: max(
      0.5rem,
      calc(((100vw - ${({ theme }) => theme.sizes.container}) / 2) + 1rem)
    );
  }

  .BurgerInner {
    background-color: ${({ theme }) => theme.textBack};
  }
`;
Hamburger.displayName = 'Hamburger';

export interface SiteTemplateProps {
  children: React.ComponentType[];
}

/**
 * Primary content - layered on top of the navigation and animated with a
 * fold out/in feature.
 *
 * TODO provide further customizations of the navigation animcation to account
 * for RTL displays, etc.
 */
const Content = styled.section`
  position: relative;
  z-index: 10000;
  transition: all 0.3s;
  transform-origin: 80%;
  background-color: ${({ theme }) => theme.primary.background};
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  > main {
    flex: 1;
  }

  ${Hamburger}.active ~ & {
    transform: translateX(-90%);
    box-shadow: -12px 0px 20px 9px #cccccc;
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.medium}px) {
    ${Hamburger}.active ~ & {
      transform: translateX(-50%);
    }
  }
`;
Content.displayName = 'Content';

/**
 * Provides the `SiteTemplate` for use within the `gatsby-browser` and `gatsby-ssr`
 * apis.
 *
 * It provides the:
 * - primary site navigation
 * - `styled-components` ThemeProvider and GlobalStyle
 * - site footer
 * - common `Helmet` additions
 *
 * @param props
 */
export const SiteTemplate: FunctionComponent<SiteTemplateProps> = ({
  children,
}) => {
  const [menuShowing, showMenu] = useState(false);

  const goto = (e: MouseEvent, to: string) => {
    e.preventDefault();
    navigate(to);
    setTimeout(() => {
      showMenu(false);
    }, 300);
  };

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
      <ThemeProvider theme={baseTheme}>
        <GlobalStyle />
        <Hamburger
          active={menuShowing}
          onClick={() => showMenu(!menuShowing)}
          className={menuShowing ? `active` : ``}
        />
        <Navigation>
          <Nav>
            <p>
              There isn't much I know! You can head back{' '}
              <Link onClick={(e) => goto(e, '/')} to="/">
                home
              </Link>
              , get to{' '}
              <Link onClick={(e) => goto(e, '/about')} to="/about">
                know me
              </Link>{' '}
              a little, or browse some of my{' '}
              <Link onClick={(e) => goto(e, '/writing')} to="/writing">
                articles
              </Link>{' '}
              or{' '}
              <Link onClick={(e) => goto(e, '/about#work')} to="/about#work">
                projects
              </Link>
              .
            </p>
          </Nav>
        </Navigation>
        <Content>
          <MDXProvider components={mdxComponents}>
            {children}
            <ThemeProvider theme={invertTheme}>
              <Footer />
            </ThemeProvider>
          </MDXProvider>
        </Content>
      </ThemeProvider>
    </>
  );
};
SiteTemplate.displayName = 'SiteTemplate';

export default SiteTemplate;
