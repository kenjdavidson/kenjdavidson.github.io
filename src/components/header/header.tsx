import { Layout, Typography, Row } from 'antd';
import React, { FunctionComponent } from 'react';
import { useLocation } from '@reach/router';
import { SiteMetadata } from '../../graphql/siteMetadata';
import styled from 'styled-components';
import useSiteMetadata from '../../hooks/useSiteMetadata';
import { Brand } from './brand';
import { Link } from 'gatsby';
import { Navigation } from './navigation';

export interface HeaderProps {}

export const Header: FunctionComponent<HeaderProps> = ({ ...rest }) => {
  const location = useLocation();
  const meta = useSiteMetadata();

  return (
    <Layout.Header>
      <Row>
        <Brand meta={meta} />
        <Navigation />
      </Row>
    </Layout.Header>
  );
};
