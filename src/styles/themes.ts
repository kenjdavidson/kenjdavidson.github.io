import { DefaultTheme, withTheme } from 'styled-components';
import { Breakpoints, Greys, Width } from '../../@types/styled';

const baseSpacing = 24;
const scale = 6;
const baseFontSize = baseSpacing * 0.75; // 18
const fontScale = baseSpacing / scale; // 4

const fontSizing = (factor: number) => ({
  size: `${baseFontSize + factor * fontScale}px`,
  height: `${baseSpacing + factor * fontScale}px`,
  maxWidth: `${baseSpacing * (baseFontSize + factor * fontScale)}px`,
});

const breakpoints: Breakpoints = {
  small: 576,
  medium: 768,
  large: 992,
  xlarge: 1200,
  xxlarge: 1600,
};

const greys: Greys = {
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

const container: Width = {
  maxWidth: `${breakpoints.xlarge}px`,
};

export const baseTheme: DefaultTheme = {
  breakpoints,
  container,
  greys,
  primary: {
    background: 'hsl(147, 63%, 70%)',
    text: greys.grey20,
  },
  secondary: {
    background: 'white',
    text: greys.grey20,
  },
  brand: 'darkblue',
  accent1: 'orange',
};

export type Theme = typeof baseTheme;
