import { createGlobalStyle } from 'styled-components';

export interface GlobalStyleProps {
  background?: string;
}

export const GlobalStyle = createGlobalStyle<GlobalStyleProps>`
  body {
    margin: 0;
    padding: 0;
    ${(props) => props.background && `background-color: ${props.background}`}
  }

  // gatsby-remark-image styles
  // Not that I plan on using captions, but they need to be centered and smaller in order to
  // provide the correct look.  I'd prefer that these could be aligned any way, but the figure
  // captions don't have the same max-width and margin as the image.
  .gatsby-resp-image-figcaption {
    text-align: center;
    font-size: 0.7rem;
  }

  // Force the image-wrapper to be 100%.  I have zero idea why this stopped working, but it 
  // started showing images as 0x0 which is super annoying.
  .gatsby-resp-image-wrapper {
    width: 100%;
    box-shadow: 0px 0px 5px var(--dark-1);
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
`;
