import React from 'react';
import styled from 'styled-components';
import Img, { FluidObject } from 'gatsby-image';
import { PageHeading } from './heading';

export interface Props {
  title: string;
  featureImage: FluidObject;
  featureImageAlt?: string;
}

const StyledSection = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.medium}px) {
    justify-content: center;
    align-items: center;
    text-align: center;
  }
`;
StyledSection.displayName = 'ImageHeader';

const Title = styled(PageHeading)`
  z-index: 10;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.small}px) {
    text-align: right;
    margin-left: 20%;
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.large}px) {
  }
`;
Title.displayName = 'OffsetImageHeaderTitle';

const FeatureImage = styled.section`
  position: relative;
  width: 75%;
  left: 0;

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
    top: 50%;
    left: 0;
    transform: translateY(-50%);
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.medium}px) {
    width: 30%;
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
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

export const ImageHeader: React.FC<Props> = ({
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
    </StyledSection>
  );
};
