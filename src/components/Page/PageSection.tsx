import React, { FunctionComponent, CSSProperties } from "react";
import { Box, BoxProps } from "grommet";
import { Heading } from "../Grommet";
import styled from "styled-components";

const AbsoluteHeading = styled(Heading)`
  position: absolute;
`;

const SectionWrapper = styled(Box)`
  position: relative;
`;

export interface SectionProps extends BoxProps {
  heading?: string;
  headingSize?: string;
  headingPad?: string;
  outerStyle?: CSSProperties;
}

export const Section: FunctionComponent<SectionProps> = ({
  heading,
  headingSize = "large",
  headingPad = "large",
  background,
  outerStyle,
  children,
  ...rest
}) => {
  const width = {
    width: "100%"
  };

  return (
    <SectionWrapper
      className="outer-container"
      background={background}
      pad={{ horizontal: "none", vertical: "medium" }}
      width={width}
      style={outerStyle}
    >
      {heading && (
        <>
          <a id={heading.toLowerCase().replace(/[^A-Za-z0-9]*/, "-")}>
            <AbsoluteHeading
              size={headingSize}
              margin="none"
              color={"section-heading"}
            >
              {heading}
            </AbsoluteHeading>
          </a>
        </>
      )}
      <Box
        fill
        className="inner-container"
        gap="xsmall"
        margin={{ top: headingPad }}
        {...rest}
      >
        {children}
      </Box>
    </SectionWrapper>
  );
};
