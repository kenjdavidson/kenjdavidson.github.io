import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { fixed } from '../styles/themes';
import { useStaticQuery, graphql } from 'gatsby';

/**
 * Provides a full screen container for the navigation components.  The
 * padding and widths are determined by the screen size, with smaller
 * screens showing 90% of the window and larger screens showing
 * 50%.
 */
const NavigationWrapper = styled.aside<{ bg: string }>`
  ${fixed(0, 0, 0, 0)}
  z-index: 0;

  padding-left: calc(10% + 1.5rem);
  padding-right: min(1.5rem, calc((100vw - 1200) / 2));

  background: url(${({ bg }) => bg}) no-repeat bottom right fixed;
  background-size: 250px;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.medium}px) {
    padding-left: calc(50% + 1.5rem);
    background-size: 500px;
  }
`;

export const Navigation: FunctionComponent<any> = ({ children }) => {
  const { hi } = useStaticQuery(graphql`
    query {
      hi: file(relativePath: { eq: "images/bitmoji-hi.png" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid_tracedSVG
          }
        }
      }
    }
  `);

  return (
    <NavigationWrapper bg={hi.childImageSharp.fluid.src}>
      {children}
    </NavigationWrapper>
  );
};

/**
 * Contains the navigation.
 */
export const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  max-width: 50vw;

  font-size: 1.5rem;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.medium}px) {
    font-size: 1.75rem;
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.large}px) {
    font-size: 2.5rem;
  }
`;
