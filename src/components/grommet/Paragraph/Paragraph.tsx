import React, { FunctionComponent, useContext } from "react";
import {
  Paragraph as GParagraph,
  ParagraphProps,
  ResponsiveContext
} from "grommet";

export const Paragraph: FunctionComponent<ParagraphProps> = ({
  children,
  ...rest
}) => {
  const size = useContext(ResponsiveContext);
  const textSize = "small" === size ? "medium" : "large";

  return (
    <GParagraph fill size={textSize} {...rest}>
      {children}
    </GParagraph>
  );
};
