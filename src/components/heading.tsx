import React, { FunctionComponent, HtmlHTMLAttributes } from 'react';
import { css } from 'styled-components';
import styled from 'styled-components';
import { Palette } from '../../@types/styled';

export interface TitleProps extends HtmlHTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  size?: string;
  accent?: boolean;
  color?: keyof Palette;
}

const colors = (props: TitleProps) => {
  if (props.accent)
    return css`
      color: ${({ theme }) => theme.primary.accent1};
      text-shadow: 2px 2px 0px ${({ theme }) => theme.primary.accent2};
    `;

  return css`
    color: ${({ theme }) => theme.primary[props.color || 'grey0']};
  `;
};

const TitleBase: FunctionComponent<TitleProps> = ({ level = 1, ...rest }) => {
  const Heading = `h${level}`;
  return <Heading {...rest} />;
};

export const Title = styled(TitleBase)`
  ${colors}
  ${({ size }) => size && `font-size: ${size};`}
`;
