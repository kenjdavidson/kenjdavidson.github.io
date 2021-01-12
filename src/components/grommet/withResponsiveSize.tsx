import React, { ComponentType, FunctionComponent, useContext } from "react";
import { ResponsiveContext } from 'grommet';

export const stepDown: Record<string,string> = {
  small: "small",
  medium: "small",
  large: "medium",
  xlarge: "large"
};

export const withResponsiveSize = <P extends object>(
  Component: ComponentType<P>, mappings?: Record<string,string>
): FunctionComponent<P> => ({
  ...props
}) => {
  const size = useContext(ResponsiveContext);
  const responsiveSize = mappings && mappings[size] || size;

  return <Component size={responsiveSize} {...props}/>
}