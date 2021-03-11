import React, { FunctionComponent } from 'react';
import { Link } from './link';
import styled from 'styled-components';
import { Heading } from './heading';
import slugify from 'slugify';
import { LinkOutlined } from '@ant-design/icons';

const StyledLink = styled(Link)`
  font-weight: 600;
`;

const StyledHeading = styled(Heading)`
  text-decoration: none;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  & > a {
    font-size: 0.8em;
    margin-left: 0.5em;
    display: none;
  }

  &:hover > a {
    display: block;
  }
`;

const createHeading = (depth: 1 | 2 | 3 | 4 | 5 | 6) => ({ children }: any) => {
  const value = typeof children == 'object' ? children.join(' ') : children;
  const link = slugify(value).toLowerCase();
  return (
    <StyledHeading level={depth} margin="medium" id={link}>
      {children}
      {(depth < 4 && (
        <Link to={`#${link}`} decoration="none">
          <LinkOutlined />
        </Link>
      )) ||
        children}
    </StyledHeading>
  );
};

export const mdxComponents = {
  a: ({ href, ...rest }: any) => <StyledLink to={href} {...rest} />,
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
};
