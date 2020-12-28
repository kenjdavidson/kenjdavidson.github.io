import React, { FunctionComponent } from "react";
import { navigate } from "gatsby";
import { Anchor, AnchorProps, Heading, HeadingProps, defaultProps } from "grommet";

export type HeadingAnchorProps = HeadingProps & AnchorProps & {
  onClick?: () => void
};

export const HeadingAnchor: FunctionComponent<HeadingAnchorProps> = ({href, onClick, children, ...rest}) => {
  const handle = () => {    
    navigate(href!);

    // Follow up with the click action
    onClick && onClick();
  }

  return (
    <Anchor onClick={() => handle()} color="text">
      <Heading {...rest}>{children}</Heading>
    </Anchor>
  );
}