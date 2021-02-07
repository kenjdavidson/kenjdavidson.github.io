import React, { FunctionComponent, CSSProperties } from "react";
import { Box, BoxProps } from "grommet";
import { Heading } from "../grommet";
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
  headingSize = "xlarge",
  headingPad = "large",
  background,
  outerStyle,
  children,
  ...rest
}) => {
  const outerWidth = {
    width: "100%"
  };

  const innerMargin = heading && { top: headingPad };

  return (
    <SectionWrapper
      className="outer-container"
      background={background}
      pad={{ horizontal: "none", vertical: "medium" }}
      width={outerWidth}
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
        margin={innerMargin}
        {...rest}
      >
        {children}
      </Box>
    </SectionWrapper>
  );
};
