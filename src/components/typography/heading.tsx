import React from 'react';
import { css } from 'styled-components';
import styled from 'styled-components';

const headingColors = css`
  color: ${({ theme }) => theme.accent1};
  text-shadow: 2px 2px 0px ${({ theme }) => theme.brand};
  z-index: 10;
`;

export const H1 = styled.h1`
  ${headingColors}
`;

export const H2 = styled.h2`
  ${headingColors}
`;

export const H3 = styled.h3`
  ${headingColors}
`;

export const H4 = styled.h5`
  ${headingColors}
`;

export const H5 = styled.h6`
  ${headingColors}
`;

export const H6 = styled.h6`
  ${headingColors}
`;
