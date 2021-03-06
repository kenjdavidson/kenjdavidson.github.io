import { DefaultTheme, css } from 'styled-components';
import { Breakpoints, Sizes, Font, Palette } from '../../@types/styled';

export const breakpoints: Breakpoints = {
  small: 576,
  medium: 768,
  large: 992,
  xlarge: 1200,
  xxlarge: 1600,
};

export const sizes: Sizes = {
  maxWidth: `${breakpoints.xlarge}px`,
  padding: `1.5rem`,
  margin: `1rem`,
};

export const font: Font = {
  family: `'Merriweather', serif`,
  weight: 300,
};

export const heading: Font = {
  family: `'Merriweather', serif`,
  weight: 600,
};

/**
 * `baseTheme` provides all the common elements that can be used throughout
 * the `styled-components`.  The `primary` and `inverse` can be switched
 * using the `invertTheme` function when passing into a new `ThemeProvider`.
 *
 * For example, the `<Footer>` is wrapped in a `ThemeProvider` while switching
 * the primary palette.
 *
 * ```jsx
 * <ThemeProvider theme={invertTheme}>
 *  <Footer />
 * </ThemeProvider>
 * ```
 *
 */
export const baseTheme: DefaultTheme = {
  breakpoints,
  sizes,
  font,
  heading,
  primary: {
    background: '#17BB90',
    text: 'hsl(0, 0%, 10%)',
    accent1: '#F9DC5C',
    accent2: '#0D324D',
    accent3: '#B0413E',
    ok: 'green',
    error: 'red',
    warning: 'orange',
    info: 'aqua',
    grey0: 'hsl(0, 0%, 0%)',
    grey1: 'hsl(0, 0%, 10%)',
    grey2: 'hsl(0, 0%, 20%)',
    grey3: 'hsl(0, 0%, 30%)',
    grey4: 'hsl(0, 0%, 40%)',
    grey5: 'hsl(0, 0%, 50%)',
    grey6: 'hsl(0, 0%, 60%)',
    grey7: 'hsl(0, 0%, 70%)',
    grey8: 'hsl(0, 0%, 80%)',
    grey9: 'hsl(0, 0%, 90%)',
    grey10: 'hsl(0, 0%, 100%)',
  },
  inverse: {
    background: 'hsl(0, 0%, 90%)',
    text: 'hsl(0, 0%, 10%)',
    accent1: '#0D324D',
    accent2: '#F9DC5C',
    accent3: '#B0413E',
    ok: 'green',
    error: 'red',
    warning: 'orange',
    info: 'aqua',
    grey0: 'hsl(0, 0%, 100%)',
    grey1: 'hsl(0, 0%, 90%)',
    grey2: 'hsl(0, 0%, 80%)',
    grey3: 'hsl(0, 0%, 70%)',
    grey4: 'hsl(0, 0%, 60%)',
    grey5: 'hsl(0, 0%, 50%)',
    grey6: 'hsl(0, 0%, 40%)',
    grey7: 'hsl(0, 0%, 30%)',
    grey8: 'hsl(0, 0%, 20%)',
    grey9: 'hsl(0, 0%, 10%)',
    grey10: 'hsl(0, 0%, 0%)',
  },
};

export type Theme = typeof baseTheme;

export interface ThemedProps {
  theme: DefaultTheme;
}

export interface BoxStyleable {
  padding?: string;
  margin?: string;
  width?: string;
  height?: string;
}

export interface FontStyleable {
  color?: keyof Palette;
  size?: string;
  weight?: string | number;
}

export interface LinkStyleable extends FontStyleable {
  transition?: string;
  decorated?: string;
}

export const invertTheme = (theme: DefaultTheme) => ({
  ...theme,
  primary: theme.inverse,
  inverse: theme.primary,
});

/**
 * Standardized `fixed` positioned element styles.
 *
 * @param top
 * @param right
 * @param bottom
 * @param left
 */
export const fixed = (
  top: number,
  right: number,
  bottom: number,
  left: number
) => (props: ThemedProps) => {
  return css`
    position: fixed;
    top: ${top}px;
    right: ${right}px;
    bottom: ${bottom}px;
    left: ${left}px;
  `;
};

/**
 * Standardize `absolute` positioned elements.
 *
 * @param top
 * @param left
 * @param width
 * @param height
 */
export const absolute = (
  top: number,
  left: number,
  width?: number,
  height?: number
) => (props: ThemedProps) => {
  return css`
    position: absolute;
    top: ${top}px;
    left: ${left}px;
    ${width && `width: ${width}px`};
    ${height && `height: ${height}px`};
  `;
};

/**
 * Standardize `elements` which are width contrained by padding.
 * This is the preferred method, as it allows for full bleed
 * background/color effects.
 *
 * @param props
 */
export const paddingContain = (props: ThemedProps) => css`
  padding-right: max(
    2rem,
    calc(((100vw - ${({ theme }) => theme.sizes.maxWidth}) / 2))
  );
  padding-left: max(
    2rem,
    calc(((100vw - ${({ theme }) => theme.sizes.maxWidth}) / 2))
  );
`;

/**
 * Standardize `elements` which are width constrained by margin.
 *
 * @param props
 */
export const marginContain = (props: ThemedProps) => css`
  padding-right: max(
    2rem,
    calc(((100vw - ${({ theme }) => theme.sizes.maxWidth}) / 2))
  );
  padding-left: max(
    2rem,
    calc(((100vw - ${({ theme }) => theme.sizes.maxWidth}) / 2))
  );
`;
