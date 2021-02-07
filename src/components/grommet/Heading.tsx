import { HeadingProps, ResponsiveContext } from "grommet";
import React, { FunctionComponent, useContext } from "react";
import { Heading as GrommetHeading } from "grommet";
import styled from "styled-components";

const StyledHeading = styled(GrommetHeading)`
  a.header-anchor {
    padding: 0px 16px;
    display: none;

    svg {
      fill: var(--brand);
      stroke: var(--brand);
    }
  }

  &:hover {
    a {
      display: inline-block;
    }
  }
`;

export const Heading: FunctionComponent<HeadingProps> = ({
  size: sizeProp,
  ...props
}) => {
  const size = sizeProp || useContext(ResponsiveContext);
  return <StyledHeading {...props} />;
};

export const H1: FunctionComponent<HeadingProps> = props => (
  <Heading level="1" fill {...props} />
);
export const H2: FunctionComponent<HeadingProps> = props => (
  <Heading level="2" fill {...props} />
);
export const H3: FunctionComponent<HeadingProps> = props => (
  <Heading level="3" fill {...props} />
);
export const H4: FunctionComponent<HeadingProps> = props => (
  <Heading level="4" fill {...props} />
);
export const H5: FunctionComponent<HeadingProps> = props => (
  <Heading level="5" fill {...props} />
);
export const H6: FunctionComponent<HeadingProps> = props => (
  <Heading level="6" fill {...props} />
);

