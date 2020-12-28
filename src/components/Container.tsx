import React, { FunctionComponent, useContext } from "react";
import {
  BoxProps,
  Box,
  HeadingProps,
  Heading,
  Stack,
  ResponsiveContext
} from "grommet";
import styled from "styled-components";

/**
 * Container properties provides a `heading` and `footer` component.
 */
export interface ContainerProps extends BoxProps {
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
export const Container: FunctionComponent<ContainerProps> = ({
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
      pad={{ horizontal: "none", vertical: "large" }}
    >
      {heading && (
        <ContainerHeading>
          <a id={heading.toLowerCase()}>{heading}</a>
        </ContainerHeading>
      )}
      <Box
        fill
        className="inner-container"
        width={{ max: "xlarge" }}
        margin={{ horizontal: "auto" }}
        gap="xsmall"
        {...rest}
      >
        {children}
      </Box>
    </Box>
  );
};

/**
 * Container heading component.
 */
const CapitalizedHeading = styled(Heading)`
  text-transform: uppercase;
  font-weight: 400;
`;

export const ContainerHeading: FunctionComponent<HeadingProps> = ({
  children,
  ...rest
}) => {
  return (
    <Stack anchor="center" margin={{ horizontal: "none", vertical: "large" }}>
      <Box background="brand" height="2px"></Box>
      <Box
        background="background"
        pad={{ horizontal: "medium", vertical: "none" }}
      >
        <CapitalizedHeading level="2" {...rest}>
          {children}
        </CapitalizedHeading>
      </Box>
    </Stack>
  );
};
