import React, { FunctionComponent, useContext } from "react";
import { Text as GrommetText } from "grommet";
import { withResponsiveSize, stepDown } from './withResponsiveSize';

export const Text = withResponsiveSize(GrommetText, stepDown);
