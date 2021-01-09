import React, { FunctionComponent } from "react";
import { MDXProvider, MDXProviderProps } from "@mdx-js/react";
import { Paragraph } from "./Paragraph";
import { Anchor } from "./Anchor";
import { H1, H2, H3, H4, H5, H6 } from "./Heading";
import { HeadingProps } from "grommet";

export const MDXComponents = {
  p: Paragraph,
  a: Anchor,
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6
};
