// https://medium.com/rbi-tech/theme-with-styled-components-and-typescript-209244ec15a3
import 'styled-components';

export type Breakpoints = {
  small: number;
  medium: number;
  large: number;
  xlarge: number;
  xxlarge: number;
};

export type Color = string;

export type Sizes = {
  container?: string | number;
  squished?: string | number;
  none?: string | number;
  small?: string | number;
  medium?: string | number;
  large?: string | number;
};

interface Palette {
  background: Color;
  text: Color;
  heading: Color;

  accent1: Color;
  accent2: Color;
  accent3: Color;

  ok: Color;
  error: Color;
  warning: Color;
  info: Color;

  grey0: Color; // Effective black
  grey1: Color;
  grey2: Color;
  grey3: Color;
  grey4: Color;
  grey5: Color;
  grey6: Color;
  grey7: Color;
  grey8: Color;
  grey9: Color;
  grey10: Color; // Effective white
}

export type Font = {
  family?: string;
  weight?: number;
  lineHeightPx?: number;
  baseSizePx?: number;
};

declare module 'styled-components' {
  export interface DefaultTheme {
    breakpoints: Breakpoints;
    sizes: Sizes;
    body: Font;
    heading: Font;

    primary: Palette;
    inverse: Palette;
  }
}
