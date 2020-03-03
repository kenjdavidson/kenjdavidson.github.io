import React from 'react';
import styled from 'styled-components';

import device from '../utils/breakpoints';

const Toolbar = styled.header`
  flex: 1;  
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  height: 72px;  

  @media ${device.min.laptop} {
    height: 92px;
    max-width: var(--max-width-laptop);
    margin: 0px auto; 
  }

  @media ${device.min.desktop} {
    max-width: var(--max-width-desktop);
  }
`;

export default ({children}) => {
  return (
    <Toolbar>      
      {children}
    </Toolbar>
  );
};