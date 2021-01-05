import React, { FunctionComponent } from "react";
import { BoxProps } from "grommet";

export interface CopyrightProps extends BoxProps {}

export const Copyright: FunctionComponent<CopyrightProps> = ({
  children,
  ...rest
}) => {
  const year = new Date().getFullYear();

  return (
    <>
      &copy; {year} {children}
    </>
  );
};
