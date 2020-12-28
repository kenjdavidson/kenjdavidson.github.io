import React, { FunctionComponent } from "react";
import { navigate } from "gatsby";
import { Anchor, AnchorProps } from 'grommet';

export const AnchorLink: FunctionComponent<AnchorProps> = ({href, children, ...rest}) => {
  return (
    <Anchor onClick={() => navigate(href!)} {...rest}>
      {children}
    </Anchor>
  )
};
