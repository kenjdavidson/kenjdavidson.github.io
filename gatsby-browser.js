import React from "react";
import { ThemeableGrommet } from "./src/components/grommet/ThemableGrommet";
import SiteLayout from "./src/components/SiteLayout";

import "./src/scss/main.scss";

export const wrapPageElement = ({ element, rest }) => {
  return (
    <ThemeableGrommet {...rest}>
      <SiteLayout>
        {element}
      </SiteLayout>
    </ThemeableGrommet>
  );
};
