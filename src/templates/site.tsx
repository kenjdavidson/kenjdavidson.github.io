import React, { FunctionComponent, useState, MouseEvent } from 'react';
import styled, { css, ThemeProvider } from 'styled-components';
import { baseTheme } from '../styles/themes';
import { Footer } from '../components/layout/footer';
import { Helmet } from 'react-helmet';
import { createGlobalStyle } from 'styled-components';
import { VortexReverse } from 'react-burgers';
import { Link, navigate, useStaticQuery, graphql } from 'gatsby';
import { GlobalStyle } from '../components/globalStyle';

const Hamburger = styled(VortexReverse)`
  z-index: 1000;

  &.Burger {
    position: fixed;
    top: 0.5rem;
    right: max(
      0.5rem,
      calc(((100vw - ${({ theme }) => theme.container.maxWidth}) / 2) + 1rem)
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

const fixed = css`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 100vh;
`;

const Chest = styled.div`
  ${fixed}
  overflow: hidden;
  perspective: 800px;
  z-index: 1;
`;
Chest.displayName = 'Chest';

const Drawer = styled.aside`
  ${fixed}
  z-index: 10;

  ${({ style }) => `${style}`}
`;
Drawer.displayName = 'Drawer';

const Content = styled.section`
  ${fixed}
  z-index: 20;
  overflow: auto;
  transition: all 0.3s;
  transform-origin: 80%;
  background-color: ${({ theme }) => theme.primary.background};
  display: flex;
  flex-direction: column;

  > main {
    flex: 1;
  }

  ${Chest}.drawer-opened & {
    transform: rotateY(-92deg) translatex(400px);
    box-shadow: -12px 0px 20px 9px #cccccc;
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.medium}px) {
    ${Chest}.drawer-opened & {
      transform: rotateY(-80deg) translatex(200px);
    }
  }
`;
Content.displayName = 'Content';

const StyledNav = styled.nav`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  max-width: 50vw;

  font-size: 1.5rem;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.medium}px) {
    font-size: 1.75rem;
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.large}px) {
    font-size: 2.5rem;
  }
`;

const StyledLink = styled(Link)`
  position: relative;
  text-decoration: underline;
`;

export const SiteTemplate: FunctionComponent<SiteTemplateProps> = ({
  children,
}) => {
  const [menuShowing, showMenu] = useState(false);

  const goto = (e: MouseEvent, to: string) => {
    console.log(`Close menu and navigate to ${to}`);
    e.preventDefault();
    navigate(to);
    setTimeout(() => {
      showMenu(false);
    }, 300);
  };

  const { hi } = useStaticQuery(graphql`
    query {
      hi: file(relativePath: { eq: "images/bitmoji-hi.png" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid_tracedSVG
          }
        }
      }
    }
  `);

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
        <Chest className={menuShowing ? `drawer-opened` : ``}>
          <Hamburger
            active={menuShowing}
            onClick={() => showMenu(!menuShowing)}
          />
          <Drawer
            style={{
              background: `url(${hi.childImageSharp.fluid.src}) bottom left no-repeat`,
            }}
          >
            <StyledNav>
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
            </StyledNav>
          </Drawer>
          <Content>
            <main>{children}</main>
            <Footer />
          </Content>
        </Chest>
      </ThemeProvider>
    </>
  );
};

export default SiteTemplate;
