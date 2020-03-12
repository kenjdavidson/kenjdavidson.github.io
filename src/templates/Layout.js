import React, { useState } from 'react';
import styled from 'styled-components';

import SEO from '../components/SEO';
import Toolbar from './Toolbar';
import BrandLogo from '../components/BrandLogo';
import Hamburger from './Hamburger';
import Navigation from './Navigation';
import LayoutFooter from './LayoutFooter';

import useSiteMetadata from '../hooks/useSiteMetadata';
import '../utils/fragments';
import "../scss/main.scss";

const LayoutWrapper = styled.div`
  &.lock-scroll {
    height: 100vh;
    overflow: hidden;
  }
`;

export default ({ children }) => {
  const meta = useSiteMetadata();
  const [navShowing, setNavShowing] = useState(false);

  return (
    <>
      <SEO></SEO>
      <LayoutWrapper className={ navShowing ? 'lock-scroll' : ''}>
        <Toolbar>
          <BrandLogo onClick={() => setNavShowing(false)}></BrandLogo>
          <Hamburger isActive={navShowing} onClick={ () => setNavShowing(!navShowing)}></Hamburger>
        </Toolbar>
        { (navShowing) ? (
          <Navigation onClick={() => setNavShowing(false)}></Navigation>
        ) : undefined}      
        { children }
        <LayoutFooter siteMetadata={meta}></LayoutFooter>
      </LayoutWrapper>
    </>
  );
};
