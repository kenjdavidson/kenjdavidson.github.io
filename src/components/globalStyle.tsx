import React from 'React';
import { createGlobalStyle } from 'styled-components';
import { Breadcrumb } from './breadcrumb';

export const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
  }

  html {
    font-family: ${({ theme }) => theme.font.family};
    color: ${({ theme }) => theme.primary.text};
    font-size: clamp(${({ theme }) =>
      theme.font.size?.min}, calc(.7rem + .25vw), ${({ theme }) =>
  theme.font.size?.max});
    font-weight: ${({ theme }) => theme.font.weight};
  }

  body {
    background: ${({ theme }) => theme.inverse.background};
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 400;
    margin: 0.5rem 0;
  }

  h1 {
    font-size: clamp(2.75rem, 0.75rem + 4.5vw, 4.768rem);
  }

  h2 {
    font-size: clamp(2.221rem, 0.75rem + 3.7vw, 4rem);    
  }

  h3 {
    font-size: clamp(1.802rem, 0.75rem + 2vw, 3.052rem);    
  }

  h4 {
    font-size: clamp(1.602rem, 0.75rem + 1.5vw, 2.441rem);    
  }

  h5 {
    font-size: clamp(1.266rem, 0.75rem + 1vw, 1.563rem);    
  }

  h6 {
    font-size: clamp(1.125rem, 0.75rem + 0.5vw, 1.25rem);    
  } 

`;
