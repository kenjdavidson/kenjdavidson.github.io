import React, { FunctionComponent, HtmlHTMLAttributes } from 'react';
import styled, { css } from 'styled-components';
import { Palette } from '../../@types/styled';
import { fontStyle } from '../styles/themes';

export interface HeadingProps extends HtmlHTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  size?: string;
  accent?: boolean;
  color?: keyof Palette;
  weight?: number | string;
  margin?: 'small' | 'medium' | 'large';
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

const margins = {
  small: '0.5em 0em',
  medium: '1em 0em',
  large: '1.5em 0em',
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
  ${({ margin }) => margin && `margin: ${margins[margin]}`}
`;

export const PageHeading = styled(Heading)`
  ${fontStyle(3.583, 4.768, 'heading')}
  position: relative;
  font-weight: 600;

  &::before,
  &&::after {
    content: attr(data-title);
    position: absolute;
    width: 100%;
    height: 100%;
    color: ${({ theme }) => theme.primary.accent1};
    z-index: -1;
  }

  &::before {
    top: 1px;
    left: 1px;
  }

  &::after {
    top: -1px;
    left: -1px;
  }
`;
