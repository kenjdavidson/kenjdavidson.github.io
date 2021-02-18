import React, {
  FunctionComponent,
  createContext,
  useState,
  useEffect,
} from "react";
import { Grommet, GrommetProps } from "grommet";
import themes from "../../styles/themes";
import styled from "styled-components";

const THEME_KEY = "kenjdavidson:selected-theme";

const StyledGrommet = styled(Grommet)`
  height: auto;
`;

/**
 * `TheamableGrommet` props
 */
export interface ThemeableGrommetProps {
  themes: any[];
  selectedTheme: number;
  setSelectedTheme: (index: number) => void;
}

/**
 * `ThemableGrommet` context.
 */
export const ThemeableGrommetContext = createContext<ThemeableGrommetProps>({
  themes: themes,
  selectedTheme: 0,
  setSelectedTheme: (index) => console.log(themes[index]),
});

/**
 * Used to wrap the `Grommet` component so that a more customized theme
 * can be provided.  I really dislike the idea of `light` and `dark` version
 * of the same theme, I much prefer having two completely separate (or more)
 * themes.
 *
 * Mainly due to the fact that `cssVars` only applies string values, which
 * makes using `color: var(--background-front)` not possible.  I also wanted
 * to play around with more them variations.
 *
 * @param ThemeableGrommetProps
 */
export const ThemeableGrommet: FunctionComponent<GrommetProps> = ({
  children,
  ...rest
}) => {
  const [selectedTheme, setSelectedTheme] = useState<number>(0);

  const saveSelectedTheme = (index: number) => {
    setSelectedTheme(index);
    if (window.localStorage) {
      window.localStorage.setItem(THEME_KEY, JSON.stringify(index));
    }
  };

  useEffect(() => {
    if (window.localStorage) {
      const savedTheme = window.localStorage.getItem(THEME_KEY) || "0";
      const themeIndex = JSON.parse(savedTheme);
      setSelectedTheme(themeIndex);
    }
  }, []);

  return (
    <ThemeableGrommetContext.Provider
      value={{
        themes,
        selectedTheme,
        setSelectedTheme: saveSelectedTheme,
      }}
    >
      <StyledGrommet
        cssVars={true}
        theme={themes[selectedTheme]}
        full
        {...rest}
      >
        {children}
      </StyledGrommet>
    </ThemeableGrommetContext.Provider>
  );
};
