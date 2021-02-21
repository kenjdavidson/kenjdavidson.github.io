import React from 'react';
import { Typography } from 'antd';
import { Link } from './link';
import styled from 'styled-components';
import { TitleProps } from 'antd/lib/typography/Title';

const UnorderedList = styled.ul`
  padding-left: 1em;
  margin-top: 1em;
  margin-bottom: 1em;
`;
const OrderedList = styled.ol`
  padding-left: 1em;
  margin-top: 1em;
  margin-bottom: 1em;
`;

const ListItem = (props: any) => (
  <li>
    <Typography.Text {...props} />
  </li>
);

const title = (level: 5 | 1 | 2 | 3 | 4 | undefined) => {
  return (props: TitleProps) => <Typography.Title level={level} {...props} />;
};

const h6 = (props: TitleProps) => <Typography.Text strong {...props} />;

export const AntdMdxComponents = {
  a: Link,
  h1: title(1),
  h2: title(2),
  h3: title(3),
  h4: title(4),
  h5: title(5),
  h6: h6,
  p: Typography.Paragraph,
  ul: UnorderedList,
  ol: OrderedList,
  li: ListItem,
};
