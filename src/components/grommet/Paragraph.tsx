import React, { FunctionComponent, useContext } from "react";

import {
  Paragraph as GrommetParagraph,
  ParagraphProps,
  ResponsiveContext
} from "grommet";

const sizeMapping: Record<string, string> = {
  small: "small",
  medium: "small",
  large: "medium",
  xlarge: "xxlarge"
};

export const Paragraph: FunctionComponent<ParagraphProps> = ({
  children,
  ...rest
}) => {
  const size = useContext(ResponsiveContext);
  const textSize = sizeMapping[size] || "medium";

  return (
    <GrommetParagraph fill size={textSize} {...rest}>
      {children}
    </GrommetParagraph>
  );
};
