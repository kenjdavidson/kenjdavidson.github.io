import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const StyledUl = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;  

  a {
    background: none;
  }

  li {
    display: inline-block;
    font-size: 150%;
    padding: 1rem;
  }
`;

export default ({links}) => (
  <StyledUl>
    {links.map((link) => (
      <li key={link.name}>
        <a href={link.href} target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={link.icon}></FontAwesomeIcon>
        </a>
      </li>
    ))}
  </StyledUl>
);