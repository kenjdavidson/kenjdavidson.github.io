import React, { FunctionComponent, createContext, useState } from "react";
import { Grommet, GrommetProps } from "grommet";
import themes from "../../utils/themes";

interface ThemeableGrommetProps {
  themes: any[];
  selectedTheme: number;
  setSelectedTheme: (index: number) => void;
}

const ThemeableGrommetContext = createContext<
  ThemeableGrommetProps | undefined
>(undefined);

export const ThemeableGrommet: FunctionComponent<GrommetProps> = ({
  children,
  ...rest
}) => {
  const [selectedTheme, setSelectedTheme] = useState<number>(0);
  return (
    <ThemeableGrommetContext.Provider
      value={{
        themes,
        selectedTheme,
        setSelectedTheme
      }}
    >
      <Grommet theme={themes[selectedTheme]} {...rest}>
        {children}
      </Grommet>
    </ThemeableGrommetContext.Provider>
  );
};
