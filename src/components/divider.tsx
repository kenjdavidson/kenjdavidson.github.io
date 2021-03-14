import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { Palette } from '../../@types/styled';

export interface DividerProps {
  width?: string;
  height?: string;
  color?: keyof Palette;
  padding?: string;
}

export const Divider = styled.div<DividerProps>`
  position: relative;

  &:after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: ${({ width }) => (width && `${width}`) || '100%'};
    height: ${({ height }) => (height && `${height}`) || '1px'};
    transform: translate(-50%);

    background-color: ${({ theme, color }) =>
      (color && theme.primary[color]) || theme.primary.grey6};
  }
`;

const StyledTitleDivider = styled(Divider)`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  & > span {
    background-color: ${({ theme }) => theme.primary.background};
    color: ${({ theme, color }) =>
      (color && theme.primary[color]) || theme.primary.grey6};
    margin-left: 0.5em;
    padding: 0 0.5em;
    z-index: 10;
  }
`;

export const TitleDivider: FunctionComponent<{ title: string }> = ({
  title,
}) => (
  <StyledTitleDivider>
    <span>{title}</span>
  </StyledTitleDivider>
);
