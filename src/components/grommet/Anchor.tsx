import React, { FunctionComponent } from "react";
import { navigate } from "gatsby";
import {
  Anchor as GrommetAnchor,
  AnchorProps as GrommetAnchorProps
} from "grommet";
import styled from "styled-components";

export interface AnchorProps extends GrommetAnchorProps {
  style?: any;
  onClick?: () => void;
}

export const Anchor: FunctionComponent<AnchorProps> = ({
  href,
  children,
  onClick: onClickHandler,
  ...rest
}) => {
  const onClick = () => {
    onClickHandler && onClickHandler();
    setTimeout(() => navigate(href!), 0);
  };

  return href?.startsWith("/") || href?.startsWith("#") ? (
    <GrommetAnchor onClick={() => onClick()} {...rest}>
      {children}
    </GrommetAnchor>
  ) : (
    <GrommetAnchor href={href} target="blank" {...rest}>
      {children}
    </GrommetAnchor>
  );
};
