import React, {
  FunctionComponent,
  useState,
  useContext,
  CSSProperties
} from "react";
import styled, { css } from "styled-components";
import {
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
import Copy from "./Copy";
import { common, coolAndFresh, strikingAndSimple } from "../utils/themes";
import { MDXProvider } from "@mdx-js/react";
import { MDXComponents } from "./grommet/MDXComponents/MDXComponents";
import { deepMerge } from "grommet/utils";
import { ResponsiveContext, AnchorProps } from "grommet";
import { Anchor } from "./grommet/Anchor/Anchor";
import themes from "../utils/themes";
import { Menu } from "grommet-icons";

const MenuLayer: FunctionComponent<LayerProps> = ({ children, ...rest }) => {
  const size = useContext(ResponsiveContext);

  return (
    <Layer
      modal={"small" == size}
      animation={"small" == size ? "fadeIn" : "none"}
      position="right"
      full="vertical"
      {...rest}
    >
      <Box
        fill="vertical"
        background="background-front"
        width={"small" == size ? "300px" : "calc(100vw / 3)"}
      >
        {children}
      </Box>
    </Layer>
  );
};

const SidebarHeader: FunctionComponent<BoxProps> = ({ children, ...rest }) => {
  const meta = useSiteMetadata();

  return (
    <Avatar
      src={meta.author.avatar}
      a11yTitle={meta.author.name + " avatar"}
      size="site"
    />
  );
};

interface NavigationItemProps extends AnchorProps {
  background?: string;
  className?: string;
}

const NavigationItem: FunctionComponent<NavigationItemProps> = ({
  children,
  href
}) => {
  const location = useLocation();
  const theme = useContext(ThemeContext);
  const active = href === location.pathname;
  const style = {
    //backgroundColor: active ? normalizeColor("background", theme) : "",
    color: normalizeColor("text", theme)
  };

  return (
    <Anchor href={href} style={style}>
      {children}
    </Anchor>
  );
};

const Navigation: FunctionComponent<BoxProps> = ({}) => {
  const meta = useSiteMetadata();

  return (
    <Nav>
      {meta.menu.map((menuItem: any) => (
        <NavigationItem
          color="text"
          size="xlarge"
          href={menuItem.href}
          key={`menu-item-${menuItem.title}`}
        >
          {menuItem.title}
        </NavigationItem>
      ))}
    </Nav>
  );
};
interface ResponsiveBox extends BoxProps {
  size: string;
}

const ResponsiveMain: FunctionComponent<ResponsiveBox> = ({
  size,
  children,
  ...rest
}) => {
  const margin = {
    top: "none",
    bottom: "large",
    left: "small" === size ? "large" : "none",
    right: "small" === size ? "large" : "calc(100vw / 3)"
  };

  return (
    <GrommetMain margin={margin} {...rest}>
      {children}
    </GrommetMain>
  );
};

const ResponsiveFooter: FunctionComponent<ResponsiveBox> = ({
  size,
  children,
  ...rest
}) => {
  const margin = {
    top: "large",
    bottom: "large",
    left: "small" === size ? "large" : "none",
    right: "small" === size ? "large" : "calc(100vw / 3)"
  };
  const pad = "none";

  return (
    <GrommetFooter pad={pad} margin={margin} {...rest}>
      {children}
    </GrommetFooter>
  );
};

const SiteLayout: FunctionComponent<GrommetProps> = ({ children, ...rest }) => {
  const meta = useSiteMetadata();
  const [showMenu, setShowMenu] = useState(true);
  const [selectedTheme, setSelectedTheme] = useState(0);

  const size = useContext(ResponsiveContext);
  console.log(`Size in SiteLayout`, size);

  return (
    <>
      {showMenu && (
        <MenuLayer>
          <Sidebar
            margin="none"
            pad="medium"
            width={{ width: "100%", max: "300px" }}
            header={<SidebarHeader />}
            footer={
              <>
                <SocialLinks iconSize="18px" gap="xsmall" />
                {/* <ThemeSelector
                  themes={themes}
                  selectedTheme={selectedTheme}
                  onThemeSelected={setSelectedTheme}
                /> */}
              </>
            }
          >
            <Navigation />
          </Sidebar>
        </MenuLayer>
      )}
      <ResponsiveMain size={size} fill={undefined}>
        <MDXProvider components={MDXComponents}>{children}</MDXProvider>
      </ResponsiveMain>
      <ResponsiveFooter
        pad="large"
        align="center"
        justify="start"
        gap="medium"
        direction="column"
        size={size}
      >
        <SocialLinks wrap={true} justify="center" iconSize="medium" />
        <Box justify="center" basis="2">
          <Paragraph margin="none" textAlign="center">
            Straight from Ontario Canada
          </Paragraph>
          <Paragraph margin="none" textAlign="center">
            <Copy>{meta.author.name}</Copy>
          </Paragraph>
          <Paragraph margin="none" textAlign="center">
            Built with <Anchor href="https://www.gatsbyjs.org/">Gatsby</Anchor>{" "}
            &amp; published to{" "}
            <Anchor href="https://pages.github.com/">Github Pages</Anchor>.
          </Paragraph>
        </Box>
      </ResponsiveFooter>
    </>
  );
};

export default SiteLayout;

export const PageHeading: FunctionComponent<HeadingProps> = ({
  children,
  ...rest
}) => {
  return (
    <Heading {...rest} responsive size="large" margin="none">
      {children}
    </Heading>
  );
};

/**
 * Container properties provides a `heading` and `footer` component.
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
  const size = useContext(ResponsiveContext);

  return (
    <Box
      className="outer-container"
      background={background}
      pad={{ horizontal: "none", vertical: "medium" }}
      style={{ position: "relative" }}
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
