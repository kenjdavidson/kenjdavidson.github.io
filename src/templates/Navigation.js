import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

import device from '../utils/breakpoints';

const Navigation = styled.nav`
  height: 100vh;
  background-color: var(--base01);
`;

const NavContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 3rem var(--gutter);

  @media ${device.min.tablet} {
    flex-direction: row;
    justify-content: flex-end;
    align-items: stretch;
  
  }

  @media ${device.min.laptopL} {
    max-width: var(--max-width-laptop);
    margin: 0px auto;
  }

  @media ${device.min.desktop} {
    max-width: var(--max-width-desktop);
  }
`;

const Menu = styled.div`
  display: flex;
  flex-direction: column;  
  align-items: center;  
  margin-bottom: 2em;

  @media ${device.min.tablet} {
    align-items: flex-start;
    padding-right: 3em;
  }
`;
const MenuTitle = styled.h1`
  font-weight: 300;
  font-size: 1.25rem;
  text-transform: uppercase;
`;
const MenuItem = styled.h3``;
const MenuLink = styled(Link)`
  text-dectoration: none;
  background: none;
  font-weight: 500;
  font-size: 1.24em;

  @media ${device.min.tablet} {
    font-size: 2em;
  }  
`;

export default ({ onClick }) => {
  return (
    <Navigation onClick={onClick}>
      <NavContainer>
       <Menu>
          <MenuTitle>Work</MenuTitle>         
          <MenuItem><MenuLink to="/resume">Resume</MenuLink></MenuItem>             
        </Menu>        
        <Menu>
          <MenuTitle>Life</MenuTitle>
          <MenuItem><MenuLink to="/about">About</MenuLink></MenuItem>
          <MenuItem><MenuLink to="/golfing">Golfing</MenuLink></MenuItem>
        </Menu>
        <Menu>
          <MenuTitle>Balance</MenuTitle>
          <MenuItem><MenuLink to="/writing">Writing</MenuLink></MenuItem>          
        </Menu>
      </NavContainer>
    </Navigation>
  );
};