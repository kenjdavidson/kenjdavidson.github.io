import React, { FunctionComponent, HtmlHTMLAttributes } from 'react';
import styled, { css, ThemeConsumer } from 'styled-components';

export interface GridProps extends HtmlHTMLAttributes<HTMLDivElement> {
  columns: number;
  gap?: number | string;
}

export const Grid = styled.div<GridProps>`
  display: grid;
  grid-template-rows: auto;
  ${({ gap }) =>
    css`
      grid-gap: ${gap || `1rem`};
      gap: ${gap || `1rem`};
      padding-bottom: ${gap || `1rem`};
    `}

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.medium}px) {
    grid-template-columns: repeat(
      auto-fit,
      ${({ theme, columns }) =>
        `minmax(${theme.breakpoints.large / columns}px, 1fr)`}
    );
  }
`;
