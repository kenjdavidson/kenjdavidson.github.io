import React, { FunctionComponent } from "react";
import { Box } from "grommet";
import { H2 } from "../grommet";

export interface SectionPartProps {
  heading?: string;
}

export const SectionPart: FunctionComponent<SectionPartProps> = ({
  heading,
  children,
  ...rest
}) => {
  return (
    <Box margin={{ bottom: "large" }} {...rest}>
      {heading && <H2 margin="none">{heading}</H2>}
      {children}
    </Box>
  );
};
