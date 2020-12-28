import React, { useContext } from "react";
import { ResponsiveContext } from "grommet";

export const useResponsiveText: () => [
  "center" | "start" | "end" | undefined,
  string
] = () => {
  const size = useContext(ResponsiveContext);
  const textAlign = "small" === size ? "center" : "start";
  const textSize = "small" === size ? "large" : "xlarge";

  return [textAlign, textSize];
};
