import React from "react";
import { ThemeableGrommet } from "./src/components/grommet/ThemableGrommet";
import SiteLayout from "./src/components/SiteLayout";

//import "./src/scss/prismjs-github.css";

export const wrapPageElement = ({ element, rest }) => {
  return (
    <ThemeableGrommet {...rest}>
      <SiteLayout>
        {element}
      </SiteLayout>
    </ThemeableGrommet>
  );
};
