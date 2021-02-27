// https://medium.com/rbi-tech/theme-with-styled-components-and-typescript-209244ec15a3
import 'styled-components';

interface Breakpoints {
  small: number;
  medium: number;
  large: number;
  xlarge: number;
  xxlarge: number;
}

interface Greys {
  grey0: string;
  grey10: string;
  grey20: string;
  grey30: string;
  grey40: string;
  grey50: string;
  grey60: string;
  grey70: string;
  grey80: string;
  grey90: string;
  grey100: string;
}

interface Width {
  width?: string | number;
  minWidth?: string | number;
  maxWidth?: string | number;
}

interface Color {
  background: string;
  text: string;
}

declare module 'styled-components' {
  export interface DefaultTheme {
    breakpoints: Breakpoints;
    container: Width;
    greys: Greys;

    primary: Color;
    secondary: Color;

    brand: string;
    accent1?: string;
    accent2?: string;
  }
}
