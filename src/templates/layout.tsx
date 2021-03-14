import React, { useState, MouseEvent } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { VortexReverse } from 'react-burgers';
import { Navigation, Nav } from '../components/navigation';
import { Link } from '../components/link';
import { MDXProvider } from '@mdx-js/react';
import { mdxComponents } from '../components/mdxComponents';
import { invertTheme } from '../styles/themes';
import { Footer } from '../components/footer';
import { navigate } from 'gatsby';

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

export const StandardLayout: React.FC = ({ children, ...rest }) => {
  const [menuShowing, showMenu] = useState(false);

  const goto = (e: MouseEvent, to: string) => {
    e.preventDefault();
    showMenu(false);
    setTimeout(() => {
      navigate(to);
    }, 300);
  };

  return (
    <>
      <Hamburger
        active={menuShowing}
        onClick={() => showMenu(!menuShowing)}
        className={menuShowing ? `active` : ``}
      />
      <Navigation>
        <Nav>
          <p>
            There isn't much, I know! You can head back{' '}
            <Link onClick={(e) => goto(e, '/')} to="/">
              home
            </Link>
            , get to{' '}
            <Link onClick={(e) => goto(e, '/about')} to="/about">
              know me
            </Link>{' '}
            a little, or browse some of my{' '}
            <Link onClick={(e) => goto(e, '/writing')} to="/writing">
              writing
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
    </>
  );
};
