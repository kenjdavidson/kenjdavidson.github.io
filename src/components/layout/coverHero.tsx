import React from 'react';
import styled from 'styled-components';
import { ContainerProps } from './container';
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
Title.displayName = 'OffsetImageHeroTitle';

const FeatureImage = styled.section`
  overflow: hidden;
  margin-top: -25%;
  z-index: 1;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.medium}px) {
    width: 45%;
    border-radius: 1rem;
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

export const CoverHero: React.FC<Props> = ({
  title,
  featureImage,
  featureImageAlt,
  children,
  ...rest
}) => {
  return (
    <Hero {...rest}>
      <Title>{title}</Title>
      <FeatureImage>
        <Img fluid={featureImage} alt={featureImageAlt} />
      </FeatureImage>
      <Article>{children}</Article>
    </Hero>
  );
};
