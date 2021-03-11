import React, { FunctionComponent } from 'react';
import { Section } from './layout/container';
import { Link } from './link';
import { HomeOutlined } from '@ant-design/icons';
import styled, { css } from 'styled-components';
import { BoxStyleable } from '../styles/themes';

const unslugify = (str: string) =>
  str.slice(0, 1).toUpperCase() +
  str.slice(1).replace(/[-_\s]{1}(\w)/g, (m) => m.toUpperCase());

/**
 * The lowest level `Crumb` provides a `title` and `href`.
 */
interface Crumb {
  title: string;
  href: string;
}

/**
 * `<Breadcrumb />` props
 */
export interface BreadcrumbProps {
  paths?: string[];
  crumbs?: Crumb[];
}

const BreadcrumbWrapper = styled.section`
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;

  ${({ theme }) => css`
    padding-left: max(1.5rem, calc((100vw - ${theme.sizes.maxWidth}) / 2));
    padding-right: max(1.5rem, calc((100vw - ${theme.sizes.maxWidth}) / 2));
  `}
`;

const StyledBreadcrumbs = styled.ul<BoxStyleable>`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const StyledBreadcrumb = styled.li<BoxStyleable>`
  list-style: none;
  display: inline-block;
  transition: all 0.3s;
  color: ${({ theme }) => theme.primary.grey4};

  & a {
    color: ${({ theme }) => theme.primary.grey4};
    text-decoration: none;
  }

  & a::after {
    content: ' / ';
    padding: 0.5rem 0.75rem 0.5rem 0.5rem;
  }

  & a:hover {
    color: ${({ theme }) => theme.primary.grey1};
  }
`;

/**
 * Builds a breadcrumb list using the provided paths or crumbs.
 *
 * @param props BreadcrumbProps
 */
export const Breadcrumb: FunctionComponent<BreadcrumbProps> = ({
  paths: pathsProp,
  crumbs: crumbs,
  ...rest
}) => {
  const paths: Crumb[] = crumbs || [];

  if (!crumbs && pathsProp) {
    pathsProp!
      .filter((path) => path != '')
      .forEach((path) => {
        const href =
          paths.length > 0
            ? `${paths[paths.length - 1].href}/${path}`
            : `/${path}`;
        paths.push({
          title: unslugify(path),
          href,
        });
      });
  }

  return (
    <BreadcrumbWrapper>
      <StyledBreadcrumbs {...rest}>
        <StyledBreadcrumb>
          <Link to="/">
            <HomeOutlined />
          </Link>
        </StyledBreadcrumb>
        {paths &&
          paths.map((path) => (
            <StyledBreadcrumb key={`page-breadcrumb-${path.href}`}>
              <Link to={`${path.href}`}>{path.title}</Link>
            </StyledBreadcrumb>
          ))}
      </StyledBreadcrumbs>
    </BreadcrumbWrapper>
  );
};
