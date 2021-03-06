import React, {
  FunctionComponent,
  HTMLAttributes,
  HtmlHTMLAttributes,
} from 'react';
import classNames from 'classnames';
import styled, { css } from 'styled-components';

export interface ContainerProps extends HtmlHTMLAttributes<HTMLDivElement> {
  size?: 'none' | 'small' | 'medium' | 'large';
  hero?: 'half' | 'full';
  overrideWidth?: boolean;
}

const heroSizes = {
  half: '50vh',
  full: '100vh',
};

const paddingSizes = {
  none: '0rem',
  small: '1rem',
  medium: '2.5rem',
  large: '5rem',
};

const StyledSection = styled.section<ContainerProps>`
  position: relative;
  ${({ size }) => `padding-top: ${paddingSizes[size || 'small']}`};

  ${({ hero }) =>
    hero &&
    css`
      min-height: ${heroSizes[hero]};
      display: flex;
      flex-direction: column;
      justify-content: center;
    `}

  ${({ overrideWidth, theme }) =>
    !overrideWidth &&
    css`
      padding-left: max(1.5rem, calc((100vw - ${theme.sizes.maxWidth}) / 2));
      padding-right: max(1.5rem, calc((100vw - ${theme.sizes.maxWidth}) / 2));
    `}

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.medium}px) {
    ${({ size }) =>
      css`
        padding-top: ${paddingSizes[size || 'small']};
        padding-bottom: ${paddingSizes[size || 'small']};
      `}
  }
`;

export const Container: FunctionComponent<ContainerProps> = ({ ...rest }) => {
  return <StyledSection {...rest} />;
};
