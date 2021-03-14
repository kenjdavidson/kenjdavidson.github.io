import React, { FunctionComponent } from 'react';
import { Seo } from '../components/seo';
import { graphql } from 'gatsby';
import { SiteMetadata, MenuItem } from '../graphql/siteMetadata';
import { Link } from '../components/link';
import { ImageSharp } from '../graphql/imageSharp';
import styled from 'styled-components';
import { fontStyle } from '../styles/themes';
import GatsbyImage from 'gatsby-image';
import { media } from '../styles/styles';

const Page = styled.section`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  height: 100vh;

  background-color: ${({ theme }) => theme.primary.background};
  color: ${({ theme }) => theme.primary.text};
`;

const Section = styled.section`
  padding: 1rem;
  z-index: 10;

  text-align; center;
`;

const Title = styled.span`
  ${fontStyle(2.887, 7.451, 'heading')}
  font-weight: 600;
`;

const Info = styled.p`
  ${fontStyle(1.802, 3.052, 'heading')}
`;

const Image = styled(GatsbyImage)`
  display: none;

  ${media.medium`
    display: block;
    width: 300px;`}
`;

const NotFoundPage: FunctionComponent<NotFoundPageProps> = ({ data }) => {
  return (
    <>
      <Seo
        title="Fore, oh! Fore!"
        description="Looks like we're in the junk together"
      />
      <Page>
        <Image
          alt={`Robot Ken thinks you've taken a wrong turn`}
          fluid={data.featureImage.childImageSharp.fluid}
        />
        <Section>
          <Title>Whoops!</Title>
          <Info>One of us has made a huge mistake!</Info>
          <Info>
            <Link to="/">Home</Link> - <Link to="/about">About</Link> -{' '}
            <Link to="/writing">Writing</Link>
          </Info>
        </Section>
      </Page>
    </>
  );
};

export default NotFoundPage;

interface NotFoundPageProps {
  data: {
    site: SiteMetadata;
    featureImage: {
      childImageSharp: ImageSharp;
    };
  };
}

export const query = graphql`
  query NotFoundQuery {
    featureImage: file(absolutePath: { regex: "/404/featureImage/" }) {
      childImageSharp {
        fixed(width: 400) {
          ...GatsbyImageSharpFixed
        }
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;
