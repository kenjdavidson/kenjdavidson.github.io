import React, { FunctionComponent } from "react";
import { Link, navigate } from "gatsby";
import {
  Anchor as GrommetAnchor,
  AnchorProps as GrommetAnchorProps
} from "grommet";
import { Text } from ".";
import styled from "styled-components";

const StyledLink = styled(Link)`
  text-decoration: none;
`;

export interface AnchorProps extends GrommetAnchorProps {
  href: string;
  style?: any;
}

export const Anchor: FunctionComponent<AnchorProps> = ({
  href,
  children,
  style,
  ...rest
}) => {
  const external = href?.startsWith("http");
  return external ? (
    <GrommetAnchor href={href} {...rest} style={style}>
      {children}
    </GrommetAnchor>
  ) : (
    <StyledLink to={href}>
      <Text color="brand" weight="bold" {...rest}>
        {children}
      </Text>
    </StyledLink>
  );
};
