import React, { FunctionComponent, HtmlHTMLAttributes } from 'react';
import { css } from 'styled-components';
import styled from 'styled-components';

export interface TitleProps extends HtmlHTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  colors?: 'primary' | 'inverse';
}

const titleCss = css<TitleProps>`
  color: ${({ theme, colors }) => theme[colors || 'primary'].accent1};
  text-shadow: 2px 2px 0px
    ${({ theme, colors }) => theme[colors || 'primary'].accent2};
  z-index: 10;
`;

const TitleBase: FunctionComponent<TitleProps> = ({ level = 1, ...rest }) => {
  const Heading = `h${level}`;
  return <Heading {...rest} />;
};

export const Title = styled(TitleBase)`
  ${titleCss}
`;
