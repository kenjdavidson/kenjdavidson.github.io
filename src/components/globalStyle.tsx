import React from 'React';
import { createGlobalStyle } from 'styled-components';
import { fontStyle } from '../styles/themes';
import { Breadcrumb } from './breadcrumb';

export const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
  }

  html {
    ${({ theme }) => fontStyle(0.9, 1.02)};
    color: ${({ theme }) => theme.primary.text};
  }

  body {
    background: ${({ theme }) => theme.inverse.background};
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 300;  
  }

  h1 {
    ${({ theme }) => fontStyle(2.027, 3.815, 'heading')};
  }

  h2 {
    ${({ theme }) => fontStyle(1.802, 3.052, 'heading')};
  }

  h3 {
    ${({ theme }) => fontStyle(1.602, 2.441, 'heading')};
  }

  h4 {
    ${({ theme }) => fontStyle(1.424, 1.953, 'heading')};
  }

  h5 {
    ${({ theme }) => fontStyle(1.266, 1.563, 'heading')};
  }

  h6 {
    ${({ theme }) => fontStyle(1.125, 1.25, 'heading')};
  } 

`;
