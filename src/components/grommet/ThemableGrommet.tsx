import React, {
  FunctionComponent,
  createContext,
  useState,
  useEffect
} from "react";
import { Grommet, GrommetProps } from "grommet";
import themes from "../../theme/themes";
import styled from "styled-components";

const THEME_KEY = "kenjdavidson:selected-theme";

const StyledGrommet = styled(Grommet)`
  height: auto;
`;

export interface ThemeableGrommetProps {
  themes: any[];
  selectedTheme: number;
  setSelectedTheme: (index: number) => void;
}

export const ThemeableGrommetContext = createContext<ThemeableGrommetProps>({
  themes: themes,
  selectedTheme: 0,
  setSelectedTheme: index => console.log(themes[index])
});

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

  console.log(themes[selectedTheme]);
  return (
    <ThemeableGrommetContext.Provider
      value={{
        themes,
        selectedTheme,
        setSelectedTheme: saveSelectedTheme
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
