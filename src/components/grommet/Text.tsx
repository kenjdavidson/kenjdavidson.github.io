import React, { FunctionComponent, useContext } from "react";
import { Text as GrommetText } from "grommet";
import { withResponsiveSize, stepDown } from './withResponsive';

export const Text = withResponsiveSize(GrommetText, stepDown);
