import React, { FunctionComponent } from 'react';
import { Link as GatsbyLink, GatsbyLinkProps } from 'gatsby';
import AntdLink, { LinkProps as AntdLinkProps } from 'antd/lib/typography/Link';

export const Link: FunctionComponent<AntdLinkProps> = ({
  href,
  className,
  ...rest
}) => {
  if (!href || href?.match(/^https?/i)) {
    return (
      <AntdLink
        href={href}
        className={className}
        target="blank"
        {...rest}
      ></AntdLink>
    );
  }

  const url =
    !href.startsWith('/') && !href.startsWith('#') ? `/${href}` : href;

  return <GatsbyLink to={url} className={className} {...rest}></GatsbyLink>;
};
