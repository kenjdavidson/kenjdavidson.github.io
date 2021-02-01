import React, { FunctionComponent, useState, useContext } from "react";
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
  H2,
  H3,
  H4,
  MDXComponents,
  Paragraph,
  Text,
  ThemeableGrommetContext
} from "./grommet";
import { ResponsiveContext, AnchorProps } from "grommet";
import { Close, Menu } from "grommet-icons";
import { Link, navigate } from "gatsby";
import { GlobalStyle } from "./GlobalStyle";
import { ResponsiveAvatar as Avatar } from "./Avatar";
import { ThemeLinks } from "./ThemeLinks";

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
        <Box key={`menu-item-${menuItem.title}`} animation="fadeIn">
          <Link
            to={menuItem.href}
            onClick={event => onClick(event, menuItem.href)}
            style={{ textDecoration: "none" }}
          >
            <H4 margin="none" color="text">
              {menuItem.title}
            </H4>
          </Link>
        </Box>
      ))}
    </Nav>
  );
};

/**
 * Provides an extension to {@link BoxProp} allowing the sending of the current size
 * of the screen on which we are currently being displayed.  This allows {@link Box}
 * components to provide customized props without requiring the
 * {@link ResponsiveContext} directly - this will be helpful if we need to override.
 */
interface ResponsiveBoxProps extends BoxProps {
  size: string;
}

/**
 * Builds a main component, specifically for this {@link PageLayout} that provides
 * appropriate spacing:
 * - small removes all margins
 * - medium up provides a 1/3 margin allowing the sidebar
 *
 * All content is wrapped within this component, and should therefore provide
 * margin or padding as appropriate.  Inside this component is an inner {@link Box}
 * which maxes out and is formated to the end.
 *
 * @param ResponsiveBoxProps
 */
const Container: FunctionComponent<ResponsiveBoxProps> = ({
  size,
  children,
  ...rest
}) => {
  const margin = {
    top: "none",
    bottom: "none",
    left: "none",
    right: "small" === size ? "none" : "calc(100vw / 3)"
  };

  const innerWidth = {
    width: "100%",
    max: "xlarge" == size ? "calc(100vw / 5 * 3)" : "1024px"
  };
  return (
    <Box as="main" margin={margin} justify="start" align="end">
      <Box width={innerWidth} {...rest}>
        {children}
      </Box>
    </Box>
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
const SiteLayout: FunctionComponent<GrommetProps> = ({ children, ...rest }) => {
  const meta = useSiteMetadata();
  const [showMenu, setShowMenu] = useState(false);
  const { themes, selectedTheme, setSelectedTheme } = useContext(
    ThemeableGrommetContext
  );

  const size = useContext(ResponsiveContext);
  const small = "small" == size;

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
            onClick={() => setShowMenu(!showMenu)}
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
          onClickOutside={() => setShowMenu(false)}
        >
          <Box
            fill="vertical"
            background="background-front"
            width={"small" == size ? "300px" : "calc(100vw / 3)"}
            round={{
              corner: "left",
              size: "small"
            }}
          >
            <Sidebar
              margin="none"
              pad="none"
              gap="small"
              width={{ width: "100%", max: "300px" }}
              header={<Avatar />}
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
              <Box pad="medium">
                <Navigation onNavigationChange={() => setShowMenu(false)} />
              </Box>
            </Sidebar>
          </Box>
        </Layer>
      )}
      <Container size={size} fill={undefined}>
        <MDXProvider components={MDXComponents}>{children}</MDXProvider>
      </Container>
      <Container
        size={size}
        fill={undefined}
        as="footer"
        align="center"
        pad="large"
        gap="medium"
      >
        <SocialLinks wrap={true} justify="center" iconSize="medium" />
        <Box justify="center" basis="2">
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
      </Container>
    </>
  );
};

export default SiteLayout;
