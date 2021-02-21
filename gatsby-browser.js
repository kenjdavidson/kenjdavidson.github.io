import React from "react";
import { SiteTemplate } from "./src/templates/site";

import style from "./src/styles/main.less";
import dark from "./src/styles/prismjs-atom-dark.css";

export const wrapPageElement = ({ element, ...rest }) => {
  return (
    <SiteTemplate>{element}</SiteTemplate>
  );
};
