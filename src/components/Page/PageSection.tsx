import React, { FunctionComponent } from "react";
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
}

export const Section: FunctionComponent<SectionProps> = ({
  heading,
  headingSize = "large",
  background,
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
        margin={{ top: headingSize }}
        {...rest}
      >
        {children}
      </Box>
    </SectionWrapper>
  );
};
