import React from 'react';
import styled from 'styled-components';

import device from '../utils/breakpoints';

const StyledContainer = styled.div`
  flex: 1;  

  padding: 1rem var(--gutter);

  @media ${device.min.laptop} {
    max-width: var(--max-width-laptop);
    margin: 0px auto;
  }

  @media ${device.min.desktop} {
    max-width: var(--max-width-desktop);
  }
`;

export default ({className, children}) => (
  <StyledContainer className={className}>
    {children}
  </StyledContainer>
);