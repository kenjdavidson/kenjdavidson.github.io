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
  border-radius: 50%;
  overflow: hidden;
  border: 20px solid rgba(0,0,0,0.133);

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.small}px) {
    width: 45%;
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.medium}px) {
    width: 40%;
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
