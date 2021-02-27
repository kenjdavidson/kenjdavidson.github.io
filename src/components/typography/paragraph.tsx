import React, { HtmlHTMLAttributes } from 'react';
import styled, { css } from 'styled-components';

export interface ParagraphProps
  extends HtmlHTMLAttributes<HTMLParagraphElement> {
  margin?: 'none' | 'small' | 'medium' | 'large';
}

const marginCss = {
  none: css`
    padding: 0px;
  `,
  small: css`
    padding: 0.5rem 0;
  `,
  medium: css`
    padding: 1rem 0;
  `,
  large: css`
    padding: 2rem 0;
  `,
};

export const Paragraph = styled.p<ParagraphProps>`
  ${({ margin }) => (margin && marginCss[margin]) || marginCss['medium']}
`;
