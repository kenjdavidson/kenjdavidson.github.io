import React, { FunctionComponent, useContext, useState } from "react";
import styled, { ThemeContext } from "styled-components";
import {
  Collapsible,
  Grommet,
  GrommetProps,
  Anchor,
  Box,
  BoxProps,
  Button,
  Footer,
  Header,
  Heading,
  Keyboard,
  Paragraph,
  Nav,
  Text,
  defaultProps,
  grommet
} from "grommet";
import { Sun, Moon, Menu, Close } from "grommet-icons";
import useSiteMetadata from "../hooks/useSiteMetadata";
import SiteNavigation from "./SiteNavigation";
import { navigate } from "gatsby";
import SocialLinks from "./SocialLinks";
import Copy from "./Copy";
import theme from "../utils/themes";
import { Container } from "./Container";
import { MDXProvider } from "@mdx-js/react";
import { MDXComponents } from "./grommet/MDXComponents/MDXComponents";

interface SiteHeaderProps extends BoxProps {
  onHomeClicked: () => void;
}

const SiteHeader: FunctionComponent<SiteHeaderProps> = ({
  children,
  onHomeClicked,
  ...rest
}) => {
  return (
    <Header fill width={{ max: "xlarge" }} margin={{ horizontal: "auto" }}>
      <Nav direction="row" pad="medium" gap="xsmall">
        <Heading level="2" size="medium" style={{ fontWeight: 500 }}>
          <Button
            onClick={() => onHomeClicked && onHomeClicked()}
            focusIndicator={false}
          >
            kenjdavidson
          </Button>
        </Heading>
      </Nav>
      <Nav direction="row" pad="medium" gap="xsmall">
        {children}
      </Nav>
    </Header>
  );
};

const SiteLayout: FunctionComponent<GrommetProps> = ({ children, ...rest }) => {
  const meta = useSiteMetadata();
  const [navShowing, setNavShowing] = useState(false);
  const [darkTheme, setDarkTheme] = useState(false);

  const onHomeClicked = () => {
    setNavShowing(false);
    navigate("/");
  };

  return (
    <Grommet
      {...rest}
      full
      theme={theme}
      themeMode={darkTheme ? "dark" : "light"}
    >
      <Box height="xsmall">
        <SiteHeader onHomeClicked={onHomeClicked}>
          {false && (
            <Button
              icon={darkTheme ? <Sun /> : <Moon />}
              onClick={() => setDarkTheme(!darkTheme)}
            />
          )}
          <Button
            icon={navShowing ? <Close /> : <Menu />}
            onClick={() => setNavShowing(!navShowing)}
            focusIndicator={false}
          />
        </SiteHeader>
      </Box>
      <Collapsible open={navShowing}>
        <Keyboard target="document" onEsc={() => setNavShowing(false)}>
          <SiteNavigation close={() => setNavShowing(false)}></SiteNavigation>
        </Keyboard>
      </Collapsible>
      <MDXProvider components={MDXComponents}>{children}</MDXProvider>
      <Container as="footer" align="center">
        <Box>
          <SocialLinks></SocialLinks>
        </Box>
        <Box>
          <Paragraph textAlign="center" margin="xxsmall">
            Straight from Ontario Canada
          </Paragraph>
          <Paragraph textAlign="center" margin="xxsmall">
            <Copy>{meta.author.name}</Copy>
          </Paragraph>
          <Paragraph textAlign="center" margin="xxsmall">
            Built with <Anchor href="https://www.gatsbyjs.org/">Gatsby</Anchor>{" "}
            &amp; published to{" "}
            <Anchor href="https://pages.github.com/">Github Pages</Anchor>.
          </Paragraph>
        </Box>
      </Container>
    </Grommet>
  );
};

export default SiteLayout;
