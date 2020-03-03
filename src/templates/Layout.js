import React, { useState } from 'react';
import styled from 'styled-components';
import { useStaticQuery, graphql } from 'gatsby';

import "../scss/main.scss";

import Toolbar from './Toolbar';
import BrandLogo from '../components/BrandLogo';
import Hamburger from './Hamburger';
import Navigation from './Navigation';
import Container from '../components/Container';
import Copy from '../components/Copy';
import SocialLinks from '../components/SocialLinks';
import Flex from '../components/Flex';

import '../utils/fragments';

const StyledLayout = styled.div`
  &.lock-scroll {
    height: 100vh;
    overflow: hidden;
  }
`;

const StyledFooter = styled.footer`
  margin-top: 3rem;
  padding: 3rem 0;
  text-align: center;

  p {
    margin: 0;
    text-align: center;
  }

`;
const Footer = ({siteMetadata}) => (
  <StyledFooter>      
    <Container>
      <Flex>
        <div>         
          <SocialLinks links={siteMetadata.social}></SocialLinks>  
        </div>      
        <div>
          <p><Copy>{siteMetadata.author.name}</Copy></p>
          <p>Straight from Ontario Canada</p>
          <p>Built with <a href="https://www.gatsbyjs.org/">Gatsby</a> &amp; published to <a href="https://pages.github.com/">Github Pages</a>.</p>
        </div>
      </Flex>
    </Container>
  </StyledFooter> 
);

export default ({ children }) => {
  const data = useStaticQuery(graphql`
    query HeaderQuery {
      site {
        ...siteMetadata
      }
    }
  `);

  const sitemeta = data.site.siteMetadata;
  const [navShowing, setNavShowing] = useState(false);

  return (
    <StyledLayout className={ navShowing ? 'lock-scroll' : ''}>
      <Toolbar>
        <BrandLogo onClick={() => setNavShowing(false)}></BrandLogo>
        <Hamburger isActive={navShowing} onClick={ () => setNavShowing(!navShowing)}></Hamburger>
      </Toolbar>
      { (navShowing) ? (
        <Navigation onClick={() => setNavShowing(false)}></Navigation>
      ) : undefined}      
      { children }
      <Footer siteMetadata={sitemeta}></Footer>
    </StyledLayout>
  );
};
