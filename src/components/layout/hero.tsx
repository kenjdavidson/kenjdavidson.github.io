import React from 'react';
import styled, { css } from 'styled-components';

type HeroSize = 'small' | 'medium' | 'large' | 'full';

const heroSizes = {
  small: '25vh',
  medium: '50vh',
  large: '75vh',
  full: '100vh',
};

export const Hero = styled.section<{ size?: HeroSize }>`
  display: flex;
  flex-direction: column;
  justify-content: center;

  ${({ size }) => `min-height: ${heroSizes[size || 'small']};`}
  ${({ size }) =>
    size !== 'full' &&
    `
    padding-top: 2rem;
    padding-bottom: 2rem;
  `}

  ${({ theme }) => css`
    padding-left: max(1.5rem, calc((100vw - ${theme.sizes.container}) / 2));
    padding-right: max(1.5rem, calc((100vw - ${theme.sizes.container}) / 2));
  `}
`;
