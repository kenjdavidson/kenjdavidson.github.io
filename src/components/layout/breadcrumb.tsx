import React, { FunctionComponent } from 'react';
import { Container } from './container';
import { Link } from '../link';
import { HomeOutlined } from '@ant-design/icons';

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
    <ul {...rest}>
      <li>
        <Link to="/">
          <HomeOutlined />
        </Link>
      </li>
      {paths &&
        paths.map((path) => (
          <li key={`page-breadcrumb-${path}`}>
            <Link to={`${path.href}`}>{path.title}</Link>
          </li>
        ))}
    </ul>
  );
};
