import {
  Breadcrumb as AntBreadcrumb,
  BreadcrumbProps as AntBreadcrumbProps,
} from 'antd';
import React, { FunctionComponent } from 'react';
import { Section } from './section';
import BreadcrumbSeparator from 'antd/lib/breadcrumb/BreadcrumbSeparator';
import { Link } from '../Link';
import BreadcrumbItem from 'antd/lib/breadcrumb/BreadcrumbItem';

const capitalize = (str: string) =>
  str.slice(0, 1).toUpperCase() + str.slice(1);

export interface BreadcrumbProps extends AntBreadcrumbProps {
  paths?: string | string[];
}

export const Breadcrumb: FunctionComponent<BreadcrumbProps> = ({
  paths,
  ...rest
}) => {
  const splitPaths = Array.isArray(paths) ? paths : paths?.split('/');
  console.log(`Paths: ${JSON.stringify(splitPaths)}`);
  return (
    <AntBreadcrumb {...rest}>
      <BreadcrumbSeparator />
      {splitPaths &&
        splitPaths.map((path) => (
          <BreadcrumbItem key={`page-breadcrumb-${path}`}>
            <Link href={`/${path}`}>{capitalize(path)}</Link>
          </BreadcrumbItem>
        ))}
    </AntBreadcrumb>
  );
};
