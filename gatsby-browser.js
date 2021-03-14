import React from 'react';
import SiteTemplate from './src/templates/site';
import { GatsbyBrowser } from 'gatsby';

import dark from './src/styles/prismjs-atom-dark.css';

export const wrapPageElement = ({
  element,
  ...rest
}) => <SiteTemplate>{element}</SiteTemplate>;
