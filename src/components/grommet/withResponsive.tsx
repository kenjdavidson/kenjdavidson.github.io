import React, { ComponentType, FunctionComponent, useContext } from "react";
import { ResponsiveContext, ThemeContext } from "grommet";

/**
 * Default responsive size stepdowns.  When requesting `withResponsiveSize` on a
 * component you may want to step down the responsive size (or maybe setup up).
 * For example, if you'd like `Icon` to display as `small` while on a `medium`
 * responsive size, pass in the mapping size.
 */
export const stepDown: Record<string, string> = {
  small: "small",
  medium: "medium",
  large: "large",
  xlarge: "xlarge"
};

/**
 * Provide a `component` using the Grommet `ResponsiveContext` to match
 * size.  This is generally used for text type components, but they will work
 * for any component based on sizing.
 *
 * TODO provide multiple props to be responsive through the call.  For example,
 * it would make sense to let `pad` and `margin` be equally as responsive.
 *
 * @param Component the component being responsively sized
 * @param mappings step down mappings for the sizing
 */
export const withResponsiveSize = <P extends object>(
  Component: ComponentType<P>,
  mappings?: Record<string, string>
): FunctionComponent<P> => ({ ...props }) => {
  const size = useContext(ResponsiveContext);
  const theme = useContext(ThemeContext);
  const steps = Object.assign({}, stepDown, mappings);
  const responsiveSize = steps[size] || size;  
  
  return <Component size={responsiveSize} theme={theme} {...props} />;
};

/**
 * Provide a `component` using the Grommet `ResponsiveContext` to match
 * size.  This is generally used for text type components, but they will work
 * for any component based on sizing.
 *
 * TODO provide multiple props to be responsive through the call.  For example,
 * it would make sense to let `pad` and `margin` be equally as responsive.
 *
 * @param Component the component being responsively sized
 * @param mappings step down mappings for the sizing
 */
export const withResponsiveWidth = <P extends object>(
  Component: ComponentType<P>,
  mappings?: Record<string, string>
): FunctionComponent<P> => ({ ...props }) => {
  const size = useContext(ResponsiveContext);
  const theme = useContext(ThemeContext);
  const steps = Object.assign({}, stepDown, mappings);
  const responsiveSize = steps[size] || size;

  return <Component width={responsiveSize} theme={theme} {...props} />;
};
