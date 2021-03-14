import React, { FunctionComponent, HtmlHTMLAttributes } from 'react';
import { Link as GatsbyLink, GatsbyLinkProps } from 'gatsby';
import styled, {
  css,
  ThemedCssFunction,
  DefaultTheme,
} from 'styled-components';
import { LinkStyleable } from '../styles/themes';

/**
 * Extend `GatsbyLinkProps` omitting the `ref` as keeping it in there
 * causes typing errors when passing spread `{...rest}` to the
 * original `GatsbyLink`.
 *
 */
export interface LinkProps {
  to: string;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  className?: string;
  target?: string;
}

const styles = css<LinkStyleable>`
  transition: ${({ transition }) => transition || 'all 0.3s'};
  color: ${({ theme, color }) => theme.primary[color || 'text']};
  text-decoration: ${({ decoration }) => decoration || 'underline'};
`;

const StyledLink = styled.a`
  ${styles}
`;

const StyledGatsbyLink = styled(GatsbyLink)`
  ${styles}
`;

export const Link: FunctionComponent<LinkProps & LinkStyleable> = ({
  to: toProp,
  onClick,
  children,
  className,
  target,
}) => {
  const external = /^https?/i.test(toProp);

  if (external) {
    return (
      <StyledLink
        className={className}
        href={toProp}
        onClick={onClick}
        target={target || 'blank'}
      >
        {children}
      </StyledLink>
    );
  } else {
    const url =
      toProp && !toProp.startsWith('/') && !toProp.startsWith('#')
        ? `/${toProp}`
        : toProp;
    return (
      <StyledGatsbyLink
        className={className}
        to={url}
        onClick={onClick}
        activeClassName="active"
      >
        {children}
      </StyledGatsbyLink>
    );
  }
};
