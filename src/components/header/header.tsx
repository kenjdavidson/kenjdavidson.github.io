import { Layout, Typography, Row } from 'antd';
import React, { FunctionComponent, useState } from 'react';
import { useLocation } from '@reach/router';
import { SiteMetadata } from '../../graphql/siteMetadata';
import styled from 'styled-components';
import useSiteMetadata from '../../hooks/useSiteMetadata';
import { Brand } from './brand';
import { Link } from 'gatsby';
import { Menu } from './menu';

export interface HeaderProps {}

export const Header: FunctionComponent<HeaderProps> = ({ ...rest }) => {
  const [open, setOpen] = useState(false);
  const meta = useSiteMetadata();

  return (
    <Layout.Header>
      <Row>
        <Brand meta={meta} />
        <Menu />
      </Row>
    </Layout.Header>
  );
};
