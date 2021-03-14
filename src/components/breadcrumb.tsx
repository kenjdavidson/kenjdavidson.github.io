import React, { FunctionComponent } from 'react';
import { Section } from './layout/section';
import { Link } from './link';
import { HomeOutlined } from '@ant-design/icons';
import styled, { css } from 'styled-components';
import { BoxStyleable } from '../styles/themes';
import { useLocation } from '@reach/router';

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
 * `<Breadcrumb />` props accepts a Crumb[] or it will fall back to
 * the `useLocation()` and `pathname`.
 */
export interface BreadcrumbProps {
  crumbs?: Crumb[];
}

const BreadcrumbWrapper = styled.section`
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;

  ${({ theme }) => css`
    padding-left: max(1.5rem, calc((100vw - ${theme.sizes.container}) / 2));
    padding-right: max(1.5rem, calc((100vw - ${theme.sizes.container}) / 2));
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
  color: ${({ theme }) => theme.primary.grey3};

  & a {
    color: ${({ theme }) => theme.primary.grey3};
    text-decoration: none;
    padding: 0.5rem 0.5rem 0.5rem 0.5rem;
  }

  & a:not(.home)::before {
    content: ' / ';
    padding-right: 0.5rem;
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
  crumbs = [],
  ...rest
}) => {
  return (
    <BreadcrumbWrapper>
      <StyledBreadcrumbs {...rest}>
        <StyledBreadcrumb>
          <Link to="/" className="home">
            <HomeOutlined />
          </Link>
        </StyledBreadcrumb>
        {crumbs &&
          crumbs.map((crumb) => (
            <StyledBreadcrumb key={`page-breadcrumb-${crumb.href}`}>
              <Link to={`${crumb.href}`} className={crumb.title}>
                {crumb.title}
              </Link>
            </StyledBreadcrumb>
          ))}
      </StyledBreadcrumbs>
    </BreadcrumbWrapper>
  );
};

export const buildCrumbs: (pathname: string, drop: number) => Crumb[] = (
  pathname,
  drop
) => {
  let paths = pathname.split('/').filter((path) => path.length > 0);
  paths = paths.splice(0, paths.length - drop);
  return paths.map((path) => ({
    title: unslugify(path),
    href: `/${path}`,
  }));
};
