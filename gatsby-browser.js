import React from "react";
import { ThemeableGrommet } from "./src/components/grommet";
import SiteLayout from "./src/components/SiteLayout";

import "./src/scss/main.scss";
import "./src/theme/prismjs-atom-dark.css";

export const wrapPageElement = ({ element, ...rest }) => {
  return (
    <ThemeableGrommet {...rest}>
      <SiteLayout>{element}</SiteLayout>
    </ThemeableGrommet>
  );
};
