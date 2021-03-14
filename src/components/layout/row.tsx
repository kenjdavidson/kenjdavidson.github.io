import React, { HtmlHTMLAttributes } from 'react';
import styled, { css } from 'styled-components';

export interface RowProps extends HtmlHTMLAttributes<HTMLDivElement> {
  responsive?: boolean;
}

export const Col = styled.div``;
Col.displayName = 'Column';

export const Row = styled.div<RowProps>`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  padding: 1rem 0;

  > ${Col}:nth-of-type(n+2) {
    margin: 0.5rem 0 0 0;
  }

  ${({ responsive }) => css`
    @media screen and (min-width: ${({ theme }) => theme.breakpoints.small}px) {
      flex-direction: row;
      justify-content: space-evenly;

      > ${Col} {
        flex: 1 0;
      }

      > ${Col}:nth-of-type(n+2) {
        margin: 0 0 0 0.5rem;
      }
    }
  `}
`;
Row.displayName = 'Row';
