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
  aProps?: HtmlHTMLAttributes<HTMLAnchorElement>;
  gProps?: Omit<GatsbyLinkProps<Record<string, unknown>>, 'ref'>;
}

const styles = css<LinkStyleable>`
  transition: ${({ transition }) => transition || 'all 0.3s'};
  text-decoration: ${({ decorated }) => decorated || 'underline'};
  color: ${({ theme, color }) => theme.primary[color || 'text']};
`;

const StyledLink = styled.a`
  ${styles}
`;

const StyledGatsbyLink = styled(GatsbyLink)`
  ${styles}
`;

export const Link: FunctionComponent<
  LinkProps & GatsbyLinkProps<any> & LinkStyleable
> = ({ to, onClick, children, aProps, gProps, className }) => {
  const external = /^https?/i.test(to);

  if (external) {
    return (
      <StyledLink
        className={className}
        href={to}
        onClick={onClick}
        target="blank"
        {...aProps}
      >
        {children}
      </StyledLink>
    );
  } else {
    const url = !to.startsWith('/') && !to.startsWith('#') ? `/${to}` : to;
    return (
      <StyledGatsbyLink
        className={className}
        to={url}
        onClick={onClick}
        {...gProps}
      >
        {children}
      </StyledGatsbyLink>
    );
  }
};
