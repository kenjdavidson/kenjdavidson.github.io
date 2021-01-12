import React, { FunctionComponent, useContext } from "react";
import { withResponsiveSize, stepDown } from "./withResponsiveSize";
import {
  Markdown,
  Paragraph as GrommetParagraph,
  ParagraphProps as GrommetParagraphProps
} from "grommet";

export interface ParagraphProps extends GrommetParagraphProps {
  markdown?: boolean;
}

const CustomParagraph: FunctionComponent<ParagraphProps> = ({
  markdown,
  children,
  ...rest
}) =>
  markdown ? (
    <GrommetParagraph fill {...rest}>
      <Markdown>{children}</Markdown>
    </GrommetParagraph>
  ) : (
    <GrommetParagraph fill {...rest}>
      {children}
    </GrommetParagraph>
  );

export const Paragraph = withResponsiveSize(CustomParagraph, stepDown);
