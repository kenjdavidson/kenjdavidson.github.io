import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

export const List = styled.ul`
  list-style: none;
  margin: 0px;
  padding: 0px;
`;

export const ListItem = styled.li`
  list-style: none;

  &:nth-of-type(1n + 1) {
    margin-top: 0.5rem;
  }

  &:last-of-type {
    margin-bottom: 0.5rem;
  }
`;
