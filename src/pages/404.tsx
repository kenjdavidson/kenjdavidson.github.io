import React, { FunctionComponent } from "react";
import { Seo } from "../components/Seo";
import { graphql } from "gatsby";
import { SiteMetadata, MenuItem } from "../graphql/siteMetadata";
import { Section } from "../components/section/section";
import { Image, Typography, Row, Col } from "antd";
import { Link } from "../components/Link";

const NotFoundPage: FunctionComponent<NotFoundPageProps> = ({ data }) => {
  return (
    <>
      <Seo
        title="Fore, oh! Fore!"
        description="Looks like we're in the junk together"
      />
      <Section size="hero">
        <Typography.Title>I've made a huge mistake!</Typography.Title>
        <img
          className="image-404"
          alt={`I've made a huge mistake!`}
          src={data.error.childImageSharp.fluid.src}
          srcSet={data.error.childImageSharp.fluid.srcSet}
          style={{
            maxWidth: "350px",
            float: "right",
            shapeOutside: `url(${data.error.childImageSharp.fluid.src})`,
            shapeMargin: "2em",
          }}
        />
        <Typography.Paragraph>
          Looks like one of us made a huge mistake! There's a fairly good chance
          it was me - breaking things and all...
        </Typography.Paragraph>
        <Typography.Paragraph>
          But... in case it was a finger slip on your part, you're probably
          going to want to head back <Link href="/">home</Link>, check out one
          of my <Link href="/writing">articles</Link> or if you're in the area
          join me for a round of <Link href="/golfing">golf</Link>.
        </Typography.Paragraph>
        <Typography.Paragraph>
          I really hope in real life the footer isn't duplicated!
        </Typography.Paragraph>
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
