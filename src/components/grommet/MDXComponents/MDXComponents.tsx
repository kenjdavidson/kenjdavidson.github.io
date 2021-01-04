import React, { FunctionComponent } from "react";
import { MDXProvider, MDXProviderProps } from "@mdx-js/react";
import { Paragraph } from "../Paragraph/Paragraph";
import { Anchor } from "../Anchor/Anchor";

export const MDXComponents = {
  p: Paragraph,
  a: Anchor
};
