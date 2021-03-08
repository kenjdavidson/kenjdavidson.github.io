import React, { FunctionComponent, useState, MouseEvent } from 'react';
import styled, { css, ThemeProvider } from 'styled-components';
import { baseTheme, fixed, invertTheme } from '../styles/themes';
import { Footer } from '../components/footer';
import { Helmet } from 'react-helmet';
import { createGlobalStyle } from 'styled-components';
import { VortexReverse } from 'react-burgers';
import { Link, navigate, useStaticQuery, graphql } from 'gatsby';
import { GlobalStyle } from '../components/globalStyle';
import { Navigation, Nav } from '../components/navigation';

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
      calc(((100vw - ${({ theme }) => theme.sizes.maxWidth}) / 2) + 1rem)
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
  overflow-x: hidden;

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
 * Styled navigation link.
 */
const StyledLink = styled(Link)`
  position: relative;
  text-decoration: underline;
`;

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
              Lost? Head back{' '}
              <StyledLink
                onClick={(e) => goto(e, '/')}
                to="/"
                activeClassName="active"
              >
                home
              </StyledLink>
              ,
              <StyledLink
                onClick={(e) => goto(e, '/about')}
                to="/about"
                activeClassName="active"
              >
                get to know me
              </StyledLink>{' '}
              a little, or browse some of my{' '}
              <StyledLink
                onClick={(e) => goto(e, '/writing')}
                to="/writing"
                activeClassName="active"
              >
                articles
              </StyledLink>{' '}
              or{' '}
              <StyledLink
                onClick={(e) => goto(e, '/about#work')}
                to="/about#work"
                activeClassName="active"
              >
                projects
              </StyledLink>
              .
            </p>
          </Nav>
        </Navigation>
        <Content>
          {children}
          <ThemeProvider theme={invertTheme}>
            <Footer />
          </ThemeProvider>
        </Content>
      </ThemeProvider>
    </>
  );
};
SiteTemplate.displayName = 'SiteTemplate';

export default SiteTemplate;
