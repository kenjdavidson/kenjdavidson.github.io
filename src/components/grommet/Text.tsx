import React, { FunctionComponent, useContext } from "react";
import { Text as GText, TextProps, ResponsiveContext } from "grommet";

export const Text: FunctionComponent<TextProps> = ({ children, ...rest }) => {
  const size = useContext(ResponsiveContext);
  const textSize = "small" === size ? "medium" : "large";

  return (
    <GText size={textSize} {...rest}>
      {children}
    </GText>
  );
};
