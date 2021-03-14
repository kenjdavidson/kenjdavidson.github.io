import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

export const List = styled.ul<{
  style?: string;
  margin?: string;
  padding?: string;
}>`
  list-style: ${({ style }) => style || 'none'};
  margin: ${({ margin }) => margin || '0px'};
  padding: ${({ padding }) => padding || '0px'};
`;

export const ListItem = styled.li<{
  listStyle?: string;
  spacing?: {
    top?: number;
    bottom?: number;
  };
}>`
  list-style: ${({ listStyle }) => listStyle || 'none'};

  &:nth-of-type(n + 1) {
    margin-top: ${({ spacing }) =>
      spacing && spacing.top && `calc(0.5rem * ${spacing.top})`};
    margin-bottom: ${({ spacing }) =>
      spacing && spacing.bottom && `calc(0.5rem * ${spacing.bottom})`};
  }
`;
