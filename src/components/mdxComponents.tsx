import React from 'react';
import { Link } from './link';
import styled from 'styled-components';
import { Heading, LinkHeading } from './heading';

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
  return (
    <LinkHeading level={depth} my="medium">
      {children}
    </LinkHeading>
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
