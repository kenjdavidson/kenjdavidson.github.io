import React, { FunctionComponent, useState, useContext } from "react";
import styled from "styled-components";
import {
  Grommet,
  GrommetProps,
  Anchor,
  Box,
  Heading,
  Paragraph,
  Text,
  Grid,
  Main as GrommetMain,
  Image,
  Sidebar as GrommetSidebar,
  base as baseTheme,
  BoxProps,
  Footer as GrommetFooter,
  Nav
} from "grommet";
import useSiteMetadata from "../hooks/useSiteMetadata";
import { navigate } from "gatsby";
import SocialLinks from "./SocialLinks";
import Copy from "./Copy";
import theme from "../utils/themes";
import { Container } from "./Container";
import { MDXProvider } from "@mdx-js/react";
import { MDXComponents } from "./grommet/MDXComponents/MDXComponents";
import { HeroImageWrapper } from "./Hero";
import { deepMerge } from "grommet/utils";
import { ResponsiveContext } from "grommet";
import { AnchorLink } from "./grommet/AnchorLink/AnchorLink";

/**
 * `SidebarContent` provides a standardized heading/menu for the site.  On large and medium screens
 * it is a 1/3 width `fixed` {@link Sidebar}.   On small screens it gets wrapped in a {@link Layer}
 * whose display is controlled by the {@link PageLayout}.
 */
const Sidebar: FunctionComponent<BoxProps> = ({ children, ...rest }) => {
  return (
    <Box
      background="brand"
      justify="start"
      align="end"
      width={{ width: "calc(100vw / 3)" }}
      pad="large"
      style={{ position: "fixed", top: 0, height: "100vh" }}
    >
      {children}
    </Box>
  );
};

/**
 * `SidebarContent` controls the actual size of where sidebar content is allowed.  This is fully dependent
 * on the size of the screen.
 *
 * - `small` screens (768 default) this will be 100% of the outer container (effectively 100% of the width)
 * - `medium` (1536 default) is the max size of the entire page (including content).
 */
const SidebarContent: FunctionComponent<BoxProps> = ({ children, ...rest }) => {
  return <Box width={{ width: "100%", max: "512px" }}>{children}</Box>;
};

/**
 * Displays the header image or a default from site metadata.  Size is managed based on the
 * {@link ResponsiveContext} and window size.
 *
 * @param BoxProps - added/override properties passed to the header
 */
const SidebarHeader: FunctionComponent<BoxProps> = ({ children, ...rest }) => {
  const meta = useSiteMetadata();

  return (
    <Box align="center">
      <Box
        width="250px"
        height="250px"
        round="50%"
        border={{ size: "large", color: "background" }}
        overflow="hidden"
      >
        <Image
          src={meta.author.avatar}
          alt={meta.author.name}
          a11yTitle={meta.author.name + " avatar"}
          fit="cover"
        />
      </Box>
      {children}
    </Box>
  );
};

const Navigation: FunctionComponent<BoxProps> = ({ ...props }) => {
  const meta = useSiteMetadata();

  return (
    <Nav>
      {meta.menu.map((menuItem: any) => (
        <AnchorLink href={menuItem.href}>{menuItem.title}</AnchorLink>
      ))}
    </Nav>
  );
};

/**
 * `Main` content provides a standardized location for content.  On large and medium screens
 * this is a 2/3 width scrollable area with a `1/2` margin to align with the {@link Sidebar}.
 */
const Main = styled(GrommetMain)`
  margin-left: calc(100vw / 3);
`;

const Footer = styled(GrommetFooter)`
  margin-left: calc(100vw / 3);
`;

/**
 * Used in the `gatsby-browser` api `wrapPageElement` to ensure all pages have a consistent layout.
 *
 * @param GrommetProps - the {@link GrommetProps} passed through to `<Grommet/>`.  Currently `full`, `theme` and
 *  `themeMode` are overridden and controlled by the `PageLayout`
 */
const SiteLayout: FunctionComponent<GrommetProps> = ({ children, ...rest }) => {
  const meta = useSiteMetadata();
  const [, setNavShowing] = useState(false);
  const [darkTheme] = useState(false);

  const mergedTheme = deepMerge({}, baseTheme, theme);
  console.log(mergedTheme);

  return (
    <Grommet
      {...rest}
      full
      theme={theme}
      themeMode={darkTheme ? "dark" : "light"}
    >
      <Sidebar>
        <SidebarContent>
          <SidebarHeader />
          <Navigation />
        </SidebarContent>
      </Sidebar>
      <Main fill={undefined}>
        <MDXProvider components={MDXComponents}>{children}</MDXProvider>
      </Main>
      <Footer
        pad="large"
        align="center"
        justify="start"
        gap="medium"
        direction="column"
      >
        <SocialLinks
          wrap={true}
          justify="center"
          iconSize="medium"
        ></SocialLinks>
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
      </Footer>
    </Grommet>
  );
};

export default SiteLayout;

export interface SectionProps extends BoxProps {}

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
  const padSize = "small" === size ? "medium" : "large";

  return (
    <Box
      className="outer-container"
      background={background}
      pad={{ horizontal: "none", vertical: "medium" }}
      style={{ position: "relative" }}
    >
      {heading && (
        <>
          <a id={heading.toLowerCase().replace(/[^A-Za-z0-9]*/, "-")} />
          <Heading
            size="large"
            style={{ position: "absolute" }}
            margin="none"
            color="#18181833"
          >
            {heading}
          </Heading>
        </>
      )}
      <Box
        fill
        className="inner-container"
        gap="xsmall"
        margin={{ top: "medium" }}
        {...rest}
      >
        {children}
      </Box>
    </Box>
  );
};
