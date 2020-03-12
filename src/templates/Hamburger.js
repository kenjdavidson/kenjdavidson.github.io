import React from 'react';
import styled from 'styled-components';

export default ({ hamburgerType, isActive, ariaControls, onClick }) => {

  if (hamburgerType === undefined)
    hamburgerType = 'squeeze';
  
  const activeClass = isActive ? ' is-active' : '';

  return (
    <HamburgerWrapper className={"hamburger hamburger--" + hamburgerType + activeClass} type="button"
        aria-label="Menu" aria-controls={ariaControls}
        onClick={onClick}>
      <span className="hamburger-box">
        <span className="hamburger-inner"></span>
      </span>
    </HamburgerWrapper>
  );
};

const HamburgerWrapper = styled.button`
  .hamburger-box .hamburger-inner,
  .hamburger-box .hamburger-inner::before,
  .hamburger-box .hamburger-inner::after {
    background-color: var(--base07);
  }
`;
