import React, { FunctionComponent } from 'react';
import { Seo } from '../components/seo';
import { graphql } from 'gatsby';
import { SiteMetadata, MenuItem } from '../graphql/siteMetadata';
import { Section } from '../components/layout/container';
import { Link } from '../components/link';

const NotFoundPage: FunctionComponent<NotFoundPageProps> = ({ data }) => {
  return (
    <>
      <Seo
        title="Fore, oh! Fore!"
        description="Looks like we're in the junk together"
      />
      <Section>
        <h1>I've made a huge mistake!</h1>
        <img
          className="image-404"
          alt={`I've made a huge mistake!`}
          src={data.error.childImageSharp.fluid.src}
          srcSet={data.error.childImageSharp.fluid.srcSet}
          style={{
            maxWidth: '350px',
            float: 'right',
            shapeOutside: `url(${data.error.childImageSharp.fluid.src})`,
            shapeMargin: '2em',
          }}
        />
        <p>
          Looks like one of us made a huge mistake! There's a fairly good chance
          it was me - breaking things and all...
        </p>
        <p>
          But... in case it was a finger slip on your part, you're probably
          going to want to head back <Link to="/">home</Link>, check out one of
          my <Link to="/writing">articles</Link> or if you're in the area join
          me for a round of <Link to="/golfing">golf</Link>.
        </p>
        <p>I really hope in real life the footer isn't duplicated!</p>
      </Section>
    </>
  );
};

export default NotFoundPage;

interface NotFoundPageProps {
  data: {
    site: SiteMetadata;
    error: any;
  };
}

export const query = graphql`
  query NotFoundQuery {
    error: file(relativePath: { eq: "error.png" }) {
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
