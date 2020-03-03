import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

import device from '../utils/breakpoints';

const StyledBrand = styled(Link)`  
  color: var(--base07);

  font-size: 1.25em;
  font-family: 'Playfair Display', serif;
  font-weight: 500;
  
  text-decoration: none;
  background: none;
  
  padding: var(--gutter);

  @media ${device.min.laptopL} {
    font-size: 1.5em
  }
`;

export default ({ onClick }) => {
  return (
    <StyledBrand to="/" 
      className="brand-logo"
      onClick={onClick}>
      <span className="ken">ken</span>
      <span className="j">j</span>
      <span className="davidson">davidson</span>
    </StyledBrand>
  );
};