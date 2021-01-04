import React, { FunctionComponent } from "react";
import { navigate } from "gatsby";
import {
  Anchor as GrommetAnchor,
  AnchorProps as GrommetAnchorProps
} from "grommet";
import styled from "styled-components";

export interface AnchorProps extends GrommetAnchorProps {
  style?: any;
}

export const Anchor: FunctionComponent<AnchorProps> = ({
  href,
  children,
  ...rest
}) => {
  return href?.startsWith("/") ? (
    <GrommetAnchor onClick={() => navigate(href!)} {...rest}>
      {children}
    </GrommetAnchor>
  ) : (
    <GrommetAnchor href={href} target="blank" {...rest}>
      {children}
    </GrommetAnchor>
  );
};
