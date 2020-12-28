import React from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import SiteLayout from "./src/components/SiteLayout";

//import "./src/scss/prismjs-github.css";

library.add(fab, faEnvelope);

export const wrapPageElement = ({ element, rest }) => {
  return <SiteLayout {...rest}>{element}</SiteLayout>;
};
