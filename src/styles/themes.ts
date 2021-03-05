import { DefaultTheme, withTheme } from 'styled-components';
import { Breakpoints, Greys, Width } from '../../@types/styled';

export const breakpoints: Breakpoints = {
  small: 576,
  medium: 768,
  large: 992,
  xlarge: 1200,
  xxlarge: 1600,
};

export const greys: Greys = {
  grey0: 'hsl(0, 0%, 0%)',
  grey10: 'hsl(0, 0%, 10%)',
  grey20: 'hsl(0, 0%, 20%)',
  grey30: 'hsl(0, 0%, 30%)',
  grey40: 'hsl(0, 0%, 40%)',
  grey50: 'hsl(0, 0%, 50%)',
  grey60: 'hsl(0, 0%, 60%)',
  grey70: 'hsl(0, 0%, 70%)',
  grey80: 'hsl(0, 0%, 80%)',
  grey90: 'hsl(0, 0%, 90%)',
  grey100: 'hsl(0, 0%, 100%)',
};

export const container: Width = {
  maxWidth: `${breakpoints.xlarge}px`,
};

export const baseTheme: DefaultTheme = {
  breakpoints,
  container,
  greys,
  primary: {
    background: '#17BB90',
    text: 'F4FFFD',
    accent1: '#F9DC5C',
    accent2: '#0D324D',
    accent3: '#B0413E',
  },
  inverse: {
    background: '#F4FFFD',
    text: greys.grey20,
    accent1: '#F9DC5C',
    accent2: '#0D324D',
    accent3: '#B0413E',
  },
};

export type Theme = typeof baseTheme;
