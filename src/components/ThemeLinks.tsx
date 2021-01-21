import React, { FunctionComponent, useContext } from "react";
import { BoxProps, Box, Button } from "grommet";
import { Blank } from "grommet-icons";

export interface ThemeLinksProps extends BoxProps {
  vertical?: boolean;
  iconSize?: string;
  availableThemes: any[];
  selectThemeIndex: (index: number) => void;
}

export const ThemeLinks: FunctionComponent<ThemeLinksProps> = ({
  vertical: verticalProp = false,
  iconSize,
  availableThemes,
  selectThemeIndex,
  ...rest
}) => {
  return (
    <Box direction="row" gap="xsmall">
      {availableThemes.map((theme: any, index: number) => (
        <Button
          key={`theme-selection-${index}`}
          onClick={() => selectThemeIndex(index)}
          focusIndicator={false}
          icon={
            <Blank
              viewBox="0 0 24 24"
              stroke="background-back"
              size="18px"
              color="plain"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke={theme.global.colors[`background-back`]}
                strokeWidth="2"
                fill={theme.global.colors[`background-front`]}
              />
            </Blank>
          }
        ></Button>
      ))}
    </Box>
  );
};
