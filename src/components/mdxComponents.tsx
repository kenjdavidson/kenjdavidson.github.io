import React, { FunctionComponent } from "react";
import { MDXProvider, MDXProviderProps } from "@mdx-js/react";
import { Typography } from "antd";
import { Link } from "./Link";

const ListItem: FunctionComponent = (props) => (
  <li>
    <Typography.Text {...props} />
  </li>
);

const Pre: FunctionComponent = ({ children, ...props }) => (
  <Typography.Text code>
    <pre {...props}>{children}</pre>
  </Typography.Text>
);

const H1: FunctionComponent = (props) => <Typography.Title {...props} />;
const H2: FunctionComponent = (props) => (
  <Typography.Title level={2} {...props} />
);
const H3: FunctionComponent = (props) => (
  <Typography.Title level={3} {...props} />
);
const H4: FunctionComponent = (props) => (
  <Typography.Title level={4} {...props} />
);
const H5: FunctionComponent = (props) => (
  <Typography.Title level={5} {...props} />
);
const H6: FunctionComponent = (props) => <Typography.Text strong {...props} />;

/**
 * Provides Grommet specific components for the `MDXProvider`.
 */
export const MDXComponents = {
  a: Link,
  h1: Typography,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  p: Typography.Paragraph,
  li: ListItem,
  pre: Pre,
};
