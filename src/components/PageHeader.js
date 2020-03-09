import React from 'react';
import styled from 'styled-components';

import Section from './Section';
import device from '../utils/breakpoints';

const StyledSection = styled(Section)`
  margin: 3em 0;
  background-color: var(--base08); 
`;

const Image = styled.img`  
  width: 100%;
  max-width: 250px;
  height: 250px;
  z-index: 10;

  border: var(--gutter) solid var(--base00);
  border-radius: 50%;  

  margin-bottom: 0px;
`;

const Intro = styled.div`
  flex: 1;
  margin-top: -125px;
  padding: calc(var(--gutter) * 2);
  padding-top: calc(125px + var(--gutter));
  text-align: center;

  h3 {
    display: inline;
  }
  
  @media ${device.min.tablet} {
    margin: 0px;
    margin-left: -125px;
    padding: var(--gutter);
    padding-left: calc(125px + var(--gutter));

    min-height: calc(250px + var(--gutter) * 2);

    display: flex;
    justify-content: flex-start;
    align-items: center;
    text-align: left;
  }

  @media ${device.min.laptop} {
    font-size: 120%;
  }

  @media ${device.min.desktop} {
    font-size: 100%;
  }
`;

const Hero = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  @media ${device.min.tablet} {
    flex-direction: row;
  }

  @media ${device.min.laptopL} {
    margin-right: calc(var(--gutter) * -1);
    margin-left: calc(var(--gutter) * -1);
  }
`;


export default ({ meta, children }) => (
  <StyledSection>
    <Hero>
      <Image src={meta.author.avatar} alt={meta.author.name}></Image> 
      <Intro>
        {children}
      </Intro>
    </Hero>
  </StyledSection>
);