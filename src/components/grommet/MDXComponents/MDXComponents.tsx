
import React, {FunctionComponent} from "react";
import { MDXProvider, MDXProviderProps } from "@mdx-js/react";
import { Paragraph } from '../Paragraph/Paragraph';
import { AnchorLink } from '../AnchorLink/AnchorLink';

export const MDXComponents = {
  p: Paragraph,
  a: AnchorLink
};
