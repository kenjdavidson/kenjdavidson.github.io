import React, { FunctionComponent } from 'react';
import { Link as GatsbyLink, GatsbyLinkProps } from 'gatsby';

interface LinkProps
  extends Omit<GatsbyLinkProps<Record<string, unknown>>, 'ref'> {}

export const Link: FunctionComponent<LinkProps> = ({ to, ...rest }) => {
  if (!to || to?.match(/^https?/i)) {
    return <a href={to} target="blank" {...rest}></a>;
  }

  const url = !to.startsWith('/') && !to.startsWith('#') ? `/${to}` : to;
  return <GatsbyLink to={url} {...rest}></GatsbyLink>;
};
