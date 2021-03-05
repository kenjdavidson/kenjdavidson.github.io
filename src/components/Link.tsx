import React, { FunctionComponent } from 'react';
import { Link as GatsbyLink, GatsbyLinkProps } from 'gatsby';
import styled, {
  css,
  ThemedCssFunction,
  DefaultTheme,
} from 'styled-components';
interface LinkProps
  extends Omit<GatsbyLinkProps<Record<string, unknown>>, 'ref'> {
  transition?: string;
  decorated?: string;
  hover?: ThemedCssFunction<DefaultTheme>;
}

const styles = css<LinkProps>`
  transition: ${({ transition }) => transition || 'all 0.3s'};
  text-decoration: ${({ decorated }) => decorated || 'underline'};

  ${({ hover }) => `&:hover {
  ${hover}
}`};
`;

const StyledLink = styled.a<LinkProps>`
  ${styles}
`;

const StyledGatsbyLink = styled(GatsbyLink)<LinkProps>`
  ${styles}
`;

export const Link: FunctionComponent<LinkProps> = ({ to, ...rest }) => {
  if (!to || to?.match(/^https?/i)) {
    return <StyledLink href={to} target="blank" {...rest}></StyledLink>;
  }

  const url = !to.startsWith('/') && !to.startsWith('#') ? `/${to}` : to;
  return <StyledGatsbyLink to={url} {...rest}></StyledGatsbyLink>;
};

export const scaleHover: (factor: number) => any = (factor) =>
  css`
    transform: scale(${factor});
  `;
