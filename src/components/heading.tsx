import React, { FunctionComponent, HtmlHTMLAttributes } from 'react';
import { css } from 'styled-components';
import styled from 'styled-components';
import { Palette } from '../../@types/styled';

export interface HeadingProps extends HtmlHTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  size?: string;
  accent?: boolean;
  color?: keyof Palette;
  weight?: number | string;
}

const colors = (props: HeadingProps) => {
  if (props.accent)
    return css`
      color: ${({ theme }) => theme.primary.accent1};
      text-shadow: 2px 2px 0px ${({ theme }) => theme.primary.accent2};
    `;

  return css`
    color: ${({ theme }) => theme.primary[props.color || 'heading']};
  `;
};

const HeadingBase: FunctionComponent<HeadingProps> = ({
  level = 1,
  ...rest
}) => {
  const Heading = `h${level}`;
  return <Heading {...rest} />;
};

export const Heading = styled(HeadingBase)`
  ${colors}
  ${({ size }) => size && `font-size: ${size};`}
  ${({ weight }) => weight && `font-weight: ${weight};`}
`;
