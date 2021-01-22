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
  style,
  ...rest
}) => {
  const target = href?.startsWith("http") ? "blank" : undefined;
  return <GrommetAnchor href={href} target={target} {...rest} style={style} />;
};
