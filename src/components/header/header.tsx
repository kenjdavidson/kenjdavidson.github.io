import { Layout, Typography, Row } from 'antd';
import React, { FunctionComponent } from 'react';
import { useLocation } from '@reach/router';
import { SiteMetadata } from '../../graphql/siteMetadata';
import { Link } from '../link';

export interface HeaderProps {
  meta: SiteMetadata;
}

export const Header: FunctionComponent<HeaderProps> = ({ meta, ...rest }) => {
  const location = useLocation();
  const { author } = meta;

  return (
    <Layout.Header>
      <Row className="ant-layout-header-content">
        <Link href="/">
          <Typography.Title className="cursive brand">
            {author.name}
          </Typography.Title>
        </Link>
      </Row>
    </Layout.Header>
  );
};
