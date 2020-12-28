import React, { CSSProperties, FunctionComponent, useContext } from "react";
import useSiteMetadata from "../hooks/useSiteMetadata";
import {
  BoxProps,
  Box,
  Image,
  defaultProps,
  ResponsiveContext,
  Heading,
  ParagraphProps,
  HeadingProps
} from "grommet";
import { Container } from "./Container";
import styled, { css } from "styled-components";
import { ThemeContext } from "styled-components";
import { Paragraph } from "./grommet";
import { useResponsiveText } from "../hooks/useResponsiveText";

const HeroImageWrapper = styled(Box)`
  overflow: hidden;
`;

export interface HeroProps extends BoxProps {
  imageSrc?: string;
  imageAlt?: string;
}

export const Hero: FunctionComponent<HeroProps> = ({
  children,
  imageSrc,
  imageAlt,
  ...rest
}) => {
  const meta = useSiteMetadata();
  const size = useContext(ResponsiveContext);

  return (
    <>
      <Container
        background="brand"
        height={{ min: "medium" }}
        direction="row-responsive"
        align="center"
        pad={{ vertical: "large", horizontal: "medium" }}
        {...rest}
      >
        <Box
          direction={"small" === size ? "column" : "row"}
          gap="large"
          align="center"
          alignContent="center"
        >
          <HeroImageWrapper
            width={{ width: "100%", max: "300px" }}
            height={{ max: "300px" }}
            round="50%"
            border={{ size: "xlarge", color: "background-back" }}
          >
            <Image
              src={meta.author.avatar}
              alt={meta.author.name}
              a11yTitle={meta.author.name + " avatar"}
              fit="contain"
            />
          </HeroImageWrapper>
          {children}
        </Box>
      </Container>
      <Box height="8px"></Box>
      <Box background="brand" height="16px"></Box>
    </>
  );
};

/**
 * Provides a Heading specific to the Hero component.  This provides responsive centering
 * and the ability to inline the message if requested.
 *
 * @param props - {@link HeadingProps}
 */
export const HeroHeading: FunctionComponent<HeadingProps> = ({
  children,
  ...rest
}) => {
  const [align, size] = useResponsiveText();

  return (
    <Heading
      color="text"
      textAlign={align}
      margin={{ horizontal: "none", vertical: "small" }}
      {...rest}
    >
      {children}
    </Heading>
  );
};

export interface HeroParagraphProps extends ParagraphProps {}

/**
 * Provides the Paragraph component displayed within the Hero
 *
 * @param props - {@link HeroParagraphProps}
 */
export const HeroParagraph: FunctionComponent<HeroParagraphProps> = ({
  size: sizeProp,
  children,
  ...rest
}) => {
  const [align, size] = useResponsiveText();

  return (
    <Paragraph
      fill
      color="text"
      textAlign={align}
      size={size}
      margin={{ horizontal: "none", vertical: "small" }}
      {...rest}
    >
      {children}
    </Paragraph>
  );
};
