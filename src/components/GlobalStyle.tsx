import { createGlobalStyle } from "styled-components";

export interface GlobalStyleProps {
  background?: string;
}

export const GlobalStyle = createGlobalStyle<GlobalStyleProps>`
  body {
    margin: 0;
    padding: 0;
    ${props => props.background && `background-color: ${props.background}`}
  }
`;
