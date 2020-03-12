import React, { useState } from 'react';
import styled from 'styled-components';

import Container from '../components/Container';
import Copy from '../components/Copy';
import SocialLinks from '../components/SocialLinks';
import Flex from '../components/Flex';

const StyledFooter = styled.footer`
  margin-top: 3rem;
  padding: 3rem 0;
  text-align: center;

  p {
    margin: 0;
    text-align: center;
  }
`;
export default ({siteMetadata}) => (
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