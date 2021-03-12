import React from 'react';
import { Link } from './link';
import styled from 'styled-components';
import { Heading, AnchorHeading } from './heading';
import { Heading as MDastHeading } from 'mdast';
import slugify from 'slugify';

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

const createHeading = (
  depth: 1 | 2 | 3 | 4 | 5 | 6,
  my?: 'small' | 'medium' | 'large'
) => ({ children }: MDastHeading) => {
  let anchor: string = '';

  if (typeof children == 'string') {
    anchor = children as string;
  } else if (typeof children == 'object') {
    // Most likely an array of strings.
    // Future kens problem.
    anchor = children.join(' ');
  }

  return (
    <AnchorHeading anchor={anchor} level={depth} my={my || 'medium'}>
      {children}
    </AnchorHeading>
  );
};

export const mdxComponents = {
  a: ({ href, ...rest }: any) => <StyledLink to={href} {...rest} />,
  h1: createHeading(1, 'large'),
  h2: createHeading(2, 'large'),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
};
