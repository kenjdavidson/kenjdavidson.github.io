import React, {
  FunctionComponent,
  HTMLAttributes,
  HtmlHTMLAttributes,
} from 'react';
import classNames from 'classnames';
import styled, { css } from 'styled-components';

export interface SectionProps extends HtmlHTMLAttributes<HTMLDivElement> {
  size?: 'none' | 'small' | 'medium' | 'large';
  overrideWidth?: boolean;
}

const paddingSizes = {
  none: '0rem',
  small: '1rem',
  medium: '2.5rem',
  large: '5rem',
};

const StyledSection = styled.section<SectionProps>`
  position: relative;
  background-color: ${({ theme }) => theme.primary.background};
  color: ${({ theme }) => theme.primary.text};

  ${({ size }) => css`
    padding-top: ${paddingSizes[size || 'small']};
    padding-bottom: ${paddingSizes[size || 'small']};

    & ~ & {
      padding-top: 0;
    }
  `}

  ${({ overrideWidth, theme }) =>
    !overrideWidth &&
    css`
      padding-left: max(1.5rem, calc((100vw - ${theme.sizes.maxWidth}) / 2));
      padding-right: max(1.5rem, calc((100vw - ${theme.sizes.maxWidth}) / 2));
    `}
`;

export const Section: FunctionComponent<SectionProps> = ({ ...rest }) => {
  return <StyledSection {...rest} />;
};

export const Hero = styled.section`
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  ${({ theme }) => css`
    padding-left: max(1.5rem, calc((100vw - ${theme.sizes.maxWidth}) / 2));
    padding-right: max(1.5rem, calc((100vw - ${theme.sizes.maxWidth}) / 2));
  `}
`;
