import {
  Breadcrumb as AntBreadcrumb,
  BreadcrumbProps as AntBreadcrumbProps,
} from 'antd';
import React, { FunctionComponent } from 'react';
import { Section } from './section';
import BreadcrumbSeparator from 'antd/lib/breadcrumb/BreadcrumbSeparator';
import { Link } from '../link';
import BreadcrumbItem from 'antd/lib/breadcrumb/BreadcrumbItem';
import { HomeOutlined } from '@ant-design/icons';

const unslugify = (str: string) =>
  str.slice(0, 1).toUpperCase() +
  str.slice(1).replace(/[-_\s]{1}(\w)/g, (m) => m.toUpperCase());

interface Crumb {
  title: string;
  href: string;
}

export interface BreadcrumbProps extends AntBreadcrumbProps {
  paths?: string | string[];
}

export const Breadcrumb: FunctionComponent<BreadcrumbProps> = ({
  paths: pathsProp,
  ...rest
}) => {
  const splitPaths = Array.isArray(pathsProp)
    ? pathsProp
    : pathsProp?.split('/');

  const paths: Crumb[] = [];
  splitPaths?.forEach((split) => {
    const href =
      paths.length > 0
        ? `${paths[paths.length - 1].href}/${split}`
        : `/${split}`;
    paths.push({
      title: unslugify(split),
      href,
    });
  });

  return (
    <AntBreadcrumb {...rest}>
      Somthing
      <BreadcrumbItem>
        <Link href="/">
          <HomeOutlined />
        </Link>
      </BreadcrumbItem>
      {paths &&
        paths.map((path) => (
          <BreadcrumbItem key={`page-breadcrumb-${path}`}>
            <Link href={`${path.href}`}>{path.title}</Link>
          </BreadcrumbItem>
        ))}
    </AntBreadcrumb>
  );
};
