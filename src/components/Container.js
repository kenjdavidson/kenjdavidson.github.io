import React from 'react';
import styled from 'styled-components';

import device from '../utils/breakpoints';

/**
 * The Container component provides common alignment and max-width spacing based on the
 * current device width.
 */
export default ({className, children}) => (
  <WrappedContainer className={className}>
    {children}
  </WrappedContainer>
);

const WrappedContainer = styled.div`
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