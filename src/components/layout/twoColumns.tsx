import React, { HtmlHTMLAttributes, ReactNode } from 'react';
import styled from 'styled-components';

export type ColumnType = '1/2' | '1/4' | '3/4';
export type GapType = 'none' | 'small' | 'medium' | 'large';

interface StyleProps extends HtmlHTMLAttributes<HTMLDivElement> {
  columns?: ColumnType;
  gap?: GapType;
}

export interface Props extends StyleProps {
  left: ReactNode;
  right: ReactNode;
}

const columnConfigs = {
  ['1/2']: '50% 50%',
  ['1/4']: '25% auto',
  ['3/4']: '75% auto',
};

const gapConfigs = {
  none: '0',
  small: '1rem',
  medium: '2.5rem',
  large: '4rem',
};

const Grid = styled.section<StyleProps>`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  grid-template-areas:
    'left'
    'right';
  grid-gap: ${({ gap }) => gapConfigs[gap || 'medium']} 0px;
  gap: ${({ gap }) => gapConfigs[gap || 'medium']} 0px;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.medium}px) {
    grid-template-columns: ${({ columns }) => columnConfigs[columns || '1/2']};
    grid-template-rows: auto;
    grid-template-areas: 'left right';
    grid-gap: ${({ gap }) => gapConfigs[gap || 'medium']};
    gap: ${({ gap }) => gapConfigs[gap || 'medium']};
  }
`;
Grid.displayName = 'TwoColumnSection';

export const TwoColumns: React.FC<Props> = ({ left, right, ...rest }) => {
  return (
    <Grid {...rest}>
      <div style={{ gridArea: 'left' }}>{left}</div>
      <div style={{ gridArea: 'right' }}>{right}</div>
    </Grid>
  );
};
