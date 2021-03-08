import React, { FunctionComponent } from 'react';
import { Section } from './layout/container';
import { Link } from './link';
import { HomeOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { BoxStyleable } from '../styles/themes';

const unslugify = (str: string) =>
  str.slice(0, 1).toUpperCase() +
  str.slice(1).replace(/[-_\s]{1}(\w)/g, (m) => m.toUpperCase());

interface Crumb {
  title: string;
  href: string;
}

export interface BreadcrumbProps {
  paths?: string[];
  crumbs?: Crumb[];
}

const StyledBreadcrumbs = styled.ul<BoxStyleable>`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const StyledBreadcrumb = styled.li<BoxStyleable>`
  list-style: none;
  display: inline-block;
  color: ${({ theme }) => theme.primary.grey3};

  & ~ &::before {
    content: ' / ';
  }

  &:not(:last-child) a {
    color: #00000066;
  }

  & a {
    text-decoration: none;
    padding: 0.5rem 0.5rem;
  }
`;

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
    <StyledBreadcrumbs {...rest}>
      <StyledBreadcrumb>
        <Link to="/">
          <HomeOutlined />
        </Link>
      </StyledBreadcrumb>
      {paths &&
        paths.map((path) => (
          <StyledBreadcrumb key={`page-breadcrumb-${path}`}>
            <Link to={`${path.href}`}>{path.title}</Link>
          </StyledBreadcrumb>
        ))}
    </StyledBreadcrumbs>
  );
};
