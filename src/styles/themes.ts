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

export const bodyFont: Font = {
  family: `'Merriweather', serif`,
  weight: 300,
  baseSizePx: 16,
};

export const headingFont: Font = {
  family: `'Merriweather', serif`,
  weight: 300,
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
  body: bodyFont,
  heading: headingFont,
  primary: {
    background: '#17BB90',
    text: 'hsl(0, 0%, 10%)',
    heading: 'hsl(0, 0%, 0%)',
    accent1: '#F9DC5C',
    accent2: '#0D324D',
    accent3: '#B0413E',
    ok: 'green',
    error: 'red',
    warning: 'orange',
    info: 'aqua',
    grey0: '#000000ff',
    grey1: '#000000dd',
    grey2: '#000000bb',
    grey3: '#00000099',
    grey4: '#00000077',
    grey5: '#ffffff55',
    grey6: '#ffffff77',
    grey7: '#ffffff99',
    grey8: '#ffffffbb',
    grey9: '#ffffffdd',
    grey10: '#ffffffff',
  },
  inverse: {
    background: 'hsl(0, 0%, 100%)',
    text: 'hsl(0, 0%, 10%)',
    heading: 'hsl(0, 0%, 0%)',
    accent1: '#0D324D',
    accent2: '#F9DC5C',
    accent3: '#B0413E',
    ok: 'green',
    error: 'red',
    warning: 'orange',
    info: 'aqua',
    grey10: '#000000ff',
    grey9: '#000000dd',
    grey8: '#000000bb',
    grey7: '#00000099',
    grey6: '#00000077',
    grey5: '#ffffff55',
    grey4: '#ffffff77',
    grey3: '#ffffff99',
    grey2: '#ffffffbb',
    grey1: '#ffffffdd',
    grey0: '#ffffffff',
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
  decoration?: string;
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

export const fontStyle = (
  minSizeRem: number,
  maxSizeRem: number,
  font?: 'body' | 'heading'
) => (props: ThemedProps) => {
  const fontType = font || 'body';
  const minWidth =
    props.theme.breakpoints.large / (props.theme[fontType].baseSizePx || 16);
  const maxWidth =
    props.theme.breakpoints.xxlarge / (props.theme[fontType].baseSizePx || 16);
  const slope = (maxSizeRem - minSizeRem) / (maxWidth - minWidth);
  const y = -minWidth * slope + minSizeRem;
  return css`
    ${props.theme[fontType].family &&
    `font-family: ${props.theme[fontType].family};`}
    font-size: clamp(
      ${minSizeRem}rem,
      ${y}rem + ${slope * 100}vw,
      ${maxSizeRem}rem
    );
    ${props.theme[fontType].weight &&
    `font-weight: ${props.theme[fontType].weight};`}
  `;
};
