import React, { FunctionComponent } from "react";
import { Link as GatsbyLink, GatsbyLinkProps } from "gatsby";
import AntdLink, { LinkProps as AntdLinkProps } from "antd/lib/typography/Link";

export const Link: FunctionComponent<AntdLinkProps> = ({ href, ...rest }) => {
  const external = href?.match(/^https?/i);
  const url = !external && !href?.startsWith("/") ? `/${href}` : href;

  return external || !url ? (
    <AntdLink href={url} target="blank" {...rest}></AntdLink>
  ) : (
    <GatsbyLink to={url} {...rest}></GatsbyLink>
  );
};
