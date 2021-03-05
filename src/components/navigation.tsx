import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { fixed } from '../styles/themes';

const NavigationWrapper = styled.aside`
  ${fixed(0, 0, 0, 0)}
`;

export const Navigation: FunctionComponent<any> = ({ children }) => {
  return <NavigationWrapper>{children}</NavigationWrapper>;
};
