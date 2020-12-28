import React, { FunctionComponent, useContext } from "react";
import styled from "styled-components";
import { navigate, Link, GatsbyLinkProps } from "gatsby";
import {
  Anchor,
  AnchorProps,
  Box,
  Heading,
  HeadingProps,
  LayerProps,
  Keyboard,
  defaultProps
} from "grommet";
import useSiteMetadata from "../hooks/useSiteMetadata";
import { HeadingAnchor } from "./HeadingAnchor";
import { Container } from "./Container";
import { ResponsiveContext } from "grommet";

const Title = styled(Heading)`
  text-transform: uppercase;
  font-weight: 300;
`;

export interface SiteNavigationProps extends LayerProps {
  close: () => void;
}

const SiteNavigation: FunctionComponent<SiteNavigationProps> = ({
  close,
  children
}) => {
  const metadata = useSiteMetadata();
  const size = useContext(ResponsiveContext);

  const handleClick = (href: string) => {
    navigate(href);
    close();
  };

  const responsiveDir = "small" === size ? "column" : "row";
  const responsiveAlign = "small" === size ? "center" : "start";

  return (
    <Container
      direction={responsiveDir}
      gap="large"
      justify="end"
      align={responsiveAlign}
      pad="large"
    >
      {metadata.menu.map((menu: { title: React.ReactNode; links: any[] }) => (
        <Box>
          <Title level="3" textAlign={responsiveAlign}>
            {menu.title}
          </Title>
          {menu.links.map(item => (
            <HeadingAnchor
              onClick={() => close()}
              href={item.url}
              textAlign={responsiveAlign}
              margin={{ horizontal: "none", vertical: "small" }}
            >
              {item.title}
            </HeadingAnchor>
          ))}
        </Box>
      ))}
    </Container>
  );
};

export default SiteNavigation;
