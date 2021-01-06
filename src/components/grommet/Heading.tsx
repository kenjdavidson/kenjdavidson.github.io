import { HeadingProps } from "grommet";
import React, { FunctionComponent } from "react";
import { Heading as GrommetHeading } from "grommet";
import styled from "styled-components";

export const Heading = styled(GrommetHeading)`
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
