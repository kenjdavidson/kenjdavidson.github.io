import React, { FunctionComponent, useState, useContext, ComponentType } from "react";
import {
  GrommetProps,
  Box,
  BoxProps,
  Nav,
  Sidebar,
  Layer,
  Button
} from "grommet";
import useSiteMetadata from "../hooks/useSiteMetadata";
import SocialLinks from "./SocialLinks";
import { Copyright } from "./Copyright";
import { MDXProvider } from "@mdx-js/react";
import {
  Anchor,
  H4,
  MDXComponents,
  Paragraph,
  ThemeableGrommetContext
} from "./grommet";
import { Article, Blank, Close, Code, Home, Menu } from "grommet-icons";
import { Link, navigate } from "gatsby";
import { GlobalStyle } from "./GlobalStyle";
import { ResponsiveAvatar as Avatar } from "./Avatar";
import { ThemeLinks } from "./ThemeLinks";
import { useMedia } from "react-media";
import styled from 'styled-components';

const NAV_ICONS: Record<string, ComponentType> = {
  Home,
  Code,
  Article
}

interface NavigationProps extends BoxProps {
  onNavigationChange: (href: string) => void;
}

const Navigation: FunctionComponent<NavigationProps> = ({
  onNavigationChange
}) => {
  const meta = useSiteMetadata();
  const onClick = (event: React.MouseEvent, href: string) => {
    event.preventDefault();
    onNavigationChange(href);

    setTimeout(() => {
      navigate(href);
    }, 300);
  };

  return (
    <Nav gap="small">
      {meta.menu.map((menuItem: any) => (
        <Box key={`menu-item-${menuItem.title}`}>
          <Link
            to={menuItem.href}
            onClick={event => onClick(event, menuItem.href)}
            style={{ 
              textDecoration: "none",
            }}
            activeClassName="active-page"
            activeStyle={{
              background: "rgba(1,1,1,0.1)"
            }}
          >
            <Box direction="row" gap="medium" align="center" pad={{ horizontal: "small", vertical: "xsmall" }}>
              { NAV_ICONS[menuItem.icon] && React.createElement(NAV_ICONS[menuItem.icon]) || <Blank />} 
              <H4 margin="none" color="text">                 
                {menuItem.title}
              </H4>
            </Box>
          </Link>
        </Box>
      ))}
    </Nav>
  );
};

interface RBoxProps extends BoxProps {
  small: boolean;
}

const Outer = styled(Box)<RBoxProps>`
  margin: 0px;
  display: flex;
  justify-content: flex-end;

  @media screen and (min-width: 769px) {
    margin-right: calc(100vw / 3);
  }
`;

const Inner = styled(Box)<RBoxProps>`
  width: 100%;
  max-width: 1024px;
`;

interface SectionProps {
  small: boolean;
  outerProps?: BoxProps;
  innerProps?: BoxProps;
}

const Section: FunctionComponent<SectionProps> = ({
  small,
  outerProps,
  innerProps,
  children}) => {
  return (
    <Outer {...outerProps}>
      <Inner {...innerProps}>
        {children}
      </Inner>
    </Outer>
  );
};

/**
 * The complete PageLayout.  Since all the components in this are specific to this exact
 * layout (right sidebar with content) it makes no real sense to extract them or worry
 * about creating multiple components.
 *
 * This method will allow customization of layouts:
 *
 * - right sidebar
 * - left sidebar
 * - top nav with heros
 *
 * for the different page types and content.  For example pages may be split between the
 * right sidebar (home/lists/etc) while others would be suited for top/nav full
 * (golf, articles, etc).
 *
 * @param GrommetProps
 */
const SiteLayout: FunctionComponent<GrommetProps> = ({ children }) => {
  const meta = useSiteMetadata();
  const [showMenu, setShowMenu] = useState(false);
  const { themes, selectedTheme, setSelectedTheme } = useContext(
    ThemeableGrommetContext
  );

  const breakpoint = themes[selectedTheme].global.breakpoints.small.value;
  const small = useMedia({ query: `(max-width: ${breakpoint}px)` });

  return (
    <>
      <GlobalStyle
        background={themes[selectedTheme].global.colors[`background-back`]}
      />
      {small && (
        <Box
          round="full"
          background="background-front"
          style={{
            position: "fixed",
            right: "16px",
            bottom: "16px",
            zIndex: 2000
          }}
        >
          <Button
            icon={showMenu ? <Close color="fab" /> : <Menu color="fab" />}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              console.log(`Button clicked: ${showMenu}`);              
              setShowMenu(!showMenu)
              }
            }
            focusIndicator={false}
          />
        </Box>
      )}
      {(!small || (small && showMenu)) && (
        <Layer
          modal={small}
          animation={small ? "slide" : "none"}
          position="right"
          full="vertical"
          responsive={false}
          onEsc={() => setShowMenu(false)}
          onClickOutside={(e) => {
            e.stopPropagation();
              e.preventDefault();
            console.log(e);
            setShowMenu(false);
          }}
        >
          <Box
            fill="vertical"
            background="background-front"
            width={small? "300px" : "calc(100vw / 3)"}
            round={{
              corner: "left",
              size: "small"
            }}
          >
            <Sidebar
              margin="none"
              pad="none"
              gap="small"
              width={{ width: "100%" }}
              header={<Avatar width={{ width: "100%", max: "200px"}} margin="xsmall" />}
              footer={
                <Box pad="medium" gap="none">
                  <SocialLinks iconSize="18px" gap="xsmall" />
                  <ThemeLinks
                    iconSize="18px"
                    gap="xsmall"
                    availableThemes={themes}
                    selectThemeIndex={setSelectedTheme}
                  />
                </Box>
              }
            >
              <Box>
                <Navigation onNavigationChange={() => setShowMenu(false)} />
              </Box>
            </Sidebar>
          </Box>
        </Layer>
      )}
      <Section 
        small={small}
        outerProps={{
          as: "main"
        }}>
        <MDXProvider components={MDXComponents}>{children}</MDXProvider>
      </Section>
      <Section
        small={small}
        outerProps={{
          as: "footer",
        }}
      >
        <Box align="center" pad={{ vertical: "medium" }}>
          <SocialLinks wrap={true} justify="center" iconSize="medium" />
          <Paragraph margin="none" textAlign="center">
            Straight from Ontario Canada
          </Paragraph>
          <Paragraph margin="none" textAlign="center">
            <Copyright>{meta.author.name}</Copyright>
          </Paragraph>
          <Paragraph margin="none" textAlign="center">
            Built with <Anchor href="https://www.gatsbyjs.org/">Gatsby</Anchor>,
            <Anchor href="https://pages.github.com/">Github Pages</Anchor> and{" "}
            <Anchor href="/about/website">other fun things</Anchor>.
          </Paragraph>
        </Box>
      </Section>
    </>
  );
};

export default SiteLayout;
