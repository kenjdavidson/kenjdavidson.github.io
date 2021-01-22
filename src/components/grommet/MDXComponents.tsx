import React, { FunctionComponent } from "react";
import { MDXProvider, MDXProviderProps } from "@mdx-js/react";
import { Paragraph } from "./Paragraph";
import { Anchor } from "./Anchor";
import { H1, H2, H3, H4, H5, H6 } from "./Heading";
import { Text } from "./Text";
import { HeadingProps, Box } from "grommet";
import { css } from "styled-components";

const ListItem: FunctionComponent = props => (
  <li>
    <Text {...props} />
  </li>
);
const Pre: FunctionComponent = ({ children, ...props }) => (
  <Text>
    <pre {...props}>{children}</pre>
  </Text>
);

export const MDXComponents = {
  a: Anchor,
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  p: Paragraph,
  li: ListItem,
  pre: Pre,
  box: Box
};
