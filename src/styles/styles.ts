import {
  css,
  ThemedCssFunction,
  DefaultTheme,
  FlattenSimpleInterpolation,
} from 'styled-components';
import { Breakpoints } from '../../@types/styled';
import { breakpoints } from './themes';

export interface StyleableSpacing {
  m?: string;
  mx?: string;
  my?: string;
  mt?: string;
  mr?: string;
  mb?: string;
  ml?: string;
  p?: string;
  px?: string;
  py?: string;
  pt?: string;
  pr?: string;
  pb?: string;
  pl?: string;
}

export const marginStyle = css<StyleableSpacing>`
  ${({ m }) => `margin: ${m};`}
  ${({ mx }) => `margin-top: ${mx}; margin-bottom: ${mx}`}
  ${({ my }) => `margin-left: ${my}; margin-right: ${my}`}
  ${({ mt }) => `margin-top: ${mt};`}
  ${({ mr }) => `margin-right: ${mr};`}
  ${({ mb }) => `margin-bottom: ${mb};`}
  ${({ ml }) => `margin-left: ${ml};`}
  ${({ p }) => `padding: ${p};`}
  ${({ px }) => `padding-top: ${px}; padding-bottom: ${px}`}
  ${({ py }) => `padding-left: ${py}; padding-right: ${py}`}
  ${({ pt }) => `padding-top: ${pt};`}
  ${({ pr }) => `padding-right: ${pr};`}
  ${({ pb }) => `padding-bottom: ${pb};`}
  ${({ pl }) => `padding-left: ${pl};`}
`;

const createMediaQueryFn = (
  breakpoint: keyof Breakpoints,
  size: 'min' | 'max'
) => (...args: any) => css`
  @media screen and (${size}-width: ${breakpoints[breakpoint]}px) {
    ${css(args)}
  }
`;

export const media = {
  small: createMediaQueryFn('small', 'min'),
  medium: createMediaQueryFn('medium', 'min'),
  large: createMediaQueryFn('large', 'min'),
  xlarge: createMediaQueryFn('xlarge', 'min'),
  xxlarge: createMediaQueryFn('xxlarge', 'min'),
  maxSmall: createMediaQueryFn('small', 'max'),
  maxMedium: createMediaQueryFn('medium', 'max'),
  maxLarge: createMediaQueryFn('large', 'max'),
  maxXLarge: createMediaQueryFn('xlarge', 'max'),
  maxXXLarge: createMediaQueryFn('xxlarge', 'max'),
};
