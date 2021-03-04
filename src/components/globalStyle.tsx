import React from 'React';
import { createGlobalStyle } from 'styled-components';
import { Breadcrumb } from './layout/breadcrumb';

export const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
  }

  html {
    font-family: 'Merriweather', serif;
    color: ${({ theme }) => theme.primary.text};
    font-size: clamp(16px, calc(.7rem + .25vw), 20px);
    font-weight: 300;
  }

  body {

  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 400;
    margin: 0.5rem 0;
  }

  h1 {
    font-size: clamp(2.75rem, 0.75rem + 5vw, 4.768rem);
  }

  h2 {
    font-size: clamp(2.221rem, 0.75rem + 3.5vw, 4rem);    
  }

  h3 {
    font-size: clamp(1.802rem, 0.75rem + 2.5vw, 3.052rem);    
  }

  h4 {
    font-size: clamp(1.602rem, 0.75rem + 2vw, 2.441rem);    
  }

  h5 {
    font-size: clamp(1.266rem, 0.75rem + 1.5vw, 1.563rem);    
  }

  h6 {
    font-size: clamp(1.125rem, 0.75rem + 1vw, 1.25rem);    
  } 

  a {
    transition: all 0.3s;
    color: ${({ theme }) => theme.greys.grey10}
  }
`;
