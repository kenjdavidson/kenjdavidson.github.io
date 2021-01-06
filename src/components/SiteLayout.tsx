import React, {
  FunctionComponent,
  useState,
  useContext,
  CSSProperties
} from "react";
import styled, { css } from "styled-components";
import {
  Anchor as GrommetAnchor,
  Grommet,
  GrommetProps,
  Box,
  Heading,
  Paragraph,
  Main as GrommetMain,
  BoxProps,
  Footer as GrommetFooter,
  Nav,
  Avatar,
  Sidebar,
  HeadingProps,
  ThemeContext,
  LayerProps,
  Layer,
  Button
} from "grommet";
import { normalizeColor } from "grommet/utils";
import useSiteMetadata from "../hooks/useSiteMetadata";
import { useLocation } from "@reach/router";
import SocialLinks from "./SocialLinks";
import { Copyright } from "./Copyright";
import { common, coolAndFresh, strikingAndSimple } from "../utils/themes";
import { MDXProvider } from "@mdx-js/react";
import { MDXComponents } from "./grommet/MDXComponents";
import { deepMerge } from "grommet/utils";
import { ResponsiveContext, AnchorProps } from "grommet";
import { Anchor } from "./grommet/Anchor";
import themes from "../utils/themes";
import { Close, Menu } from "grommet-icons";
import { ThemeableGrommetContext } from "./grommet/ThemableGrommet";
import { navigate, navigateTo } from "gatsby";
import { GlobalStyle } from "./GlobalStyle";
interface NavigationItemProps extends AnchorProps {
  background?: string;
  className?: string;
}

interface NavigationProps extends BoxProps {
  onNavigationChange: (href: string) => void;
}
const Navigation: FunctionComponent<NavigationProps> = ({
  onNavigationChange,
  ...props
}) => {
  const meta = useSiteMetadata();
  const onClick = (href: string) => {
    onNavigationChange(href);
    navigate(href);
  };
  const location = useLocation();

  return (
    <Nav>
      {meta.menu.map((menuItem: any) => (
        <GrommetAnchor
          color="text"
          size="xlarge"
          onClick={() => onClick(menuItem.href)}
          key={`menu-item-${menuItem.title}`}
        >
          {menuItem.title}
        </GrommetAnchor>
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
    max: "1024px"
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
 * Builds a main component, specifically for this {@link PageLayout} that provides
 * appropriate spacing:
 *
 * - small removes all margins
 * - medium up provides a 1/3 margin allowing the sidebar
 *
 * This probably isn't required, just force of habit; can probably be moved into the
 * main content section instead of on it's own.  We'll see.
 *
 * @param ResponsiveBoxProps
 */
const ResponsiveFooter: FunctionComponent<ResponsiveBoxProps> = ({
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
  const pad = "none";

  return (
    <GrommetFooter pad={pad} margin={margin} {...rest}>
      {children}
    </GrommetFooter>
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

  console.log(`Window size: ${size}`);

  return (
    <>
      <GlobalStyle
        background={themes[selectedTheme].global.colors[`background-back`]}
      />
      {small && (
        <Button
          icon={showMenu ? <Close /> : <Menu />}
          onClick={() => setShowMenu(!showMenu)}
          style={{
            position: "fixed",
            right: "16px",
            bottom: "16px",
            zIndex: 2000
          }}
        />
      )}
      {(!small || showMenu) && (
        <Layer
          modal={small}
          animation={small ? "slide" : "none"}
          position="right"
          full="vertical"
          responsive={false}
          onEsc={() => setShowMenu(false)}
          onClickOutside={() => setShowMenu(false)}
          {...rest}
        >
          <Box
            fill="vertical"
            background="background-front"
            width={"small" == size ? "300px" : "calc(100vw / 3)"}
          >
            <Sidebar
              margin="none"
              pad="large"
              width={{ width: "100%", max: "300px" }}
              header={
                <Avatar
                  src={meta.author.avatar}
                  a11yTitle={"Hey, it's me " + meta.author.name}
                  size={`site-${size}`}
                />
              }
              footer={
                <Box gap="small">
                  <SocialLinks iconSize="18px" gap="xsmall" />
                  <Box direction="row" gap="xsmall">
                    {themes.map((theme: any, index: number) => (
                      <Box pad="small" key={`theme-selection-${index}`}>
                        <Button onClick={() => setSelectedTheme(index)}>
                          <Box
                            width="18px"
                            height="18px"
                            background={theme.global.colors[`background-front`]}
                            round="full"
                            border={
                              index == selectedTheme
                                ? { size: "2px", color: "background-back" }
                                : undefined
                            }
                          />
                        </Button>
                      </Box>
                    ))}
                  </Box>
                </Box>
              }
            >
              <Navigation onNavigationChange={() => setShowMenu(false)} />
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
            Built with <Anchor href="https://www.gatsbyjs.org/">Gatsby</Anchor>{" "}
            &amp; published to{" "}
            <Anchor href="https://pages.github.com/">Github Pages</Anchor>.
          </Paragraph>
        </Box>
      </Container>
    </>
  );
};

export default SiteLayout;

/**
 * A large Heading used to display a solid (opacity) heading.
 *
 * @param HeadingProps
 */
export const PageHeading: FunctionComponent<HeadingProps> = ({
  children,
  ...rest
}) => {
  return (
    <Heading color="brand" {...rest} responsive size="large" margin="none">
      {children}
    </Heading>
  );
};

/**
 * SectionProps provide additional functionality to the BoxProps when used in the context of
 * a {@link Section}.  The following props are available:
 *
 * - heading (optional) displays an xlarge light opacity heading
 */
export interface SectionProps extends BoxProps {
  heading?: string;
}

/**
 * Provides a standardized wrapper for page content.   The outer {@link Box} provides a full width
 * (regardless of size) while the inner {@link Box} controls the max width of the content.  Padding
 * should be applied to the children, to ensure that things like {@link Image} and {@link Code}
 * can cozy up to the size of the screen on mobile.
 *
 * @param props - container props
 */
export const Section: FunctionComponent<SectionProps> = ({
  heading,
  background,
  children,
  ...rest
}) => {
  const width = {
    width: "100%",
    max: "1024px"
  };

  return (
    <Box
      className="outer-container"
      background={background}
      pad={{ horizontal: "none", vertical: "medium" }}
      style={{ position: "relative" }}
      width={width}
    >
      {heading && (
        <>
          <a id={heading.toLowerCase().replace(/[^A-Za-z0-9]*/, "-")}>
            <Heading
              size="large"
              style={{ position: "absolute" }}
              margin="none"
              color={"section-heading"}
            >
              {heading}
            </Heading>
          </a>
        </>
      )}
      <Box
        fill
        className="inner-container"
        gap="xsmall"
        margin={{ top: "large" }}
        {...rest}
      >
        {children}
      </Box>
    </Box>
  );
};
