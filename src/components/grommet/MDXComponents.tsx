import React, { FunctionComponent } from "react";
import { MDXProvider, MDXProviderProps } from "@mdx-js/react";
import { Paragraph } from "./Paragraph";
import { Anchor } from "./Anchor";
import { Heading } from "./Heading";
import { HeadingProps } from "grommet";

const Heading1 = (props: HeadingProps) => (
  <Heading level="1" {...props}></Heading>
);
const Heading2 = (props: HeadingProps) => (
  <Heading level="2" {...props}></Heading>
);
const Heading3 = (props: HeadingProps) => (
  <Heading level="3" {...props}></Heading>
);
const Heading4 = (props: HeadingProps) => (
  <Heading level="4" {...props}></Heading>
);
const Heading5 = (props: HeadingProps) => (
  <Heading level="5" {...props}></Heading>
);
const Heading6 = (props: HeadingProps) => (
  <Heading level="6" {...props}></Heading>
);

export const MDXComponents = {
  p: Paragraph,
  a: Anchor,
  h1: Heading1,
  h2: Heading2,
  h3: Heading3,
  h4: Heading4,
  h5: Heading5,
  h6: Heading6
};
