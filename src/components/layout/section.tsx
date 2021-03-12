import React, {
  FunctionComponent,
  HTMLAttributes,
  HtmlHTMLAttributes,
} from 'react';
import classNames from 'classnames';
import styled, { css } from 'styled-components';

export interface SectionProps extends HtmlHTMLAttributes<HTMLDivElement> {
  size?: 'none' | 'small' | 'medium' | 'large';
  fullBleed?: boolean;
  squished?: boolean;
}

const paddingSizes = {
  none: '0rem',
  small: '1rem',
  medium: '2.5rem',
  large: '5rem',
};

export const Section = styled.section<SectionProps>`
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

  ${({ fullBleed, squished, theme }) =>
    !fullBleed &&
    css`
      padding-left: max(
        1.5rem,
        calc((100vw - ${theme.sizes[squished ? 'squished' : 'container']}) / 2)
      );
      padding-right: max(
        1.5rem,
        calc((100vw - ${theme.sizes[squished ? 'squished' : 'container']}) / 2)
      );
    `}
`;

export const Heading = styled.header`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

export const Content = styled.section<{ width?: string }>`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;

  ${({ theme, width }) =>
    width &&
    css`
      @media screen and (min-width: ${theme.breakpoints.medium}px) {
        max-width: ${width};
        margin-left: auto;
        margin-right: auto;
      }
    `}
`;
