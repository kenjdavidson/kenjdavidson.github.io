import React, { FunctionComponent } from "react";
import { HeadingProps } from "grommet";
import { H1 } from "../Grommet";

export const PageHeading: FunctionComponent<HeadingProps> = ({
  children,
  ...rest
}) => {
  return (
    <H1 size="large" {...rest} margin="none">
      {children}
    </H1>
  );
};
