import React from 'react';
import styled from 'styled-components';
import Img, { FluidObject } from 'gatsby-image';
import { PageHeading } from './heading';
import { fontStyle } from '../styles/themes';
import { Hero } from './layout/container';

export interface Props {
  title: string;
  featureImage: FluidObject;
  featureImageAlt?: string;
}

const StyledSection = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
`;
StyledSection.displayName = 'OffsetImageHeader';

const Title = styled(PageHeading)`
  margin-right: 1rem;
  z-index: 10;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.small}px) {
    text-align: right;
    margin-bottom: 2rem;
    margin-left: 20%;
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.large}px) {
    margin-bottom: 2rem;
  }
`;
Title.displayName = 'OffsetImageHeaderTitle';

const FeatureImage = styled.section`
  position: relative;
  margin-top: -5rem;

  &::after {
    position: absolute;
    content: '';
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: 1rem solid #00000022;
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.small}px) {
    width: 45%;
    position: absolute;
    margin-top: 0;
  }
`;
FeatureImage.displayName = 'OffsetImageHeadingImage';

const Article = styled.article`
  z-index: 10;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.small}px) {
    margin-left: 50%;
    margin-right: 1.5rem;
  }
`;
Article.displayName = 'OffsetImageHeadingArticle';

export const OffsetImageHeader: React.FC<Props> = ({
  title,
  featureImage,
  featureImageAlt,
  children,
  ...rest
}) => {
  return (
    <StyledSection {...rest}>
      <Title data-title={title}>{title}</Title>
      <FeatureImage>
        <Img fluid={featureImage} alt={featureImageAlt} />
      </FeatureImage>
      <Article>{children}</Article>
    </StyledSection>
  );
};
