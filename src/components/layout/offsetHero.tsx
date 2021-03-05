import React, { ComponentType } from 'react';
import styled from 'styled-components';
import { Container, ContainerProps } from './container';
import Img, { FluidObject } from 'gatsby-image';
import { Title } from '../heading';

export interface Props extends ContainerProps {
  title: string;
  featureImage: FluidObject;
  featureImageAlt?: string;
}

const Hero = styled.section`
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
Hero.displayName = 'OffsetImageHero';

const HeroTitle = styled(Title)`
  font-size: clamp(5rem, 0.75rem + 8vw, 8.768rem);
  margin-right: 1rem;
  max-width: 75%;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.medium}px) {
    margin-bottom: 1rem;
    max-width: 100%;
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.large}px) {
    margin-bottom: 3rem;
    text-align: right;
  }
`;
HeroTitle.displayName = 'OffsetImageHeroTitle';

const FeatureImage = styled.section`
  position: relative;
  margin-top: -25%;
  z-index: 1;

  &::after {
    position: absolute;
    content: '';
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: 1rem solid #00000022;
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.medium}px) {
    width: 45%;
    position: absolute;
    margin-top: 0;
  }
`;
FeatureImage.displayName = 'OffsetImageHeroImage';

const Article = styled.article`
  z-index: 10;

  background-color: ${({ theme }) => theme.primary.background};
  padding: 1rem;
  border-radius: 1rem;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.medium}px) {
    margin-left: 40%;
    margin-right: 1rem;
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.large}px) {
    margin-left: 50%;
  }
`;
Article.displayName = 'OffsetImageHeroArticle';

export const OffsetHero: React.FC<Props> = ({
  title,
  featureImage,
  featureImageAlt,
  children,
  ...rest
}) => {
  return (
    <Hero {...rest}>
      <HeroTitle>{title}</HeroTitle>
      <FeatureImage>
        <Img fluid={featureImage} alt={featureImageAlt} />
      </FeatureImage>
      <Article>{children}</Article>
    </Hero>
  );
};
