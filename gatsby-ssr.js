import React from "react";
import { SiteTemplate } from "./src/templates/site";

import "./src/styles/main.less";
import "./src/styles/prismjs-atom-dark.css";

export const wrapPageElement = ({ element, ...rest }) => {
  return (
    <SiteTemplate>{element}</SiteTemplate>
  );
};
