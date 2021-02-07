import React, { FunctionComponent, useContext } from "react";
import useSiteMetadata from "../hooks/useSiteMetadata";
import {
  Box,
  Heading,
  Markdown,
  ResponsiveContext,
  ThemeContext
} from "grommet";
import { Anchor, H2, Paragraph } from "../components/grommet";
import { PageHeading, Section } from "../components/page";
import { List } from "../components/article";
import { Seo } from "../components/Seo";
import { SectionPart } from "../components/page/SectionPart";
import { graphql } from "gatsby";
import Img from "gatsby-image";
import { SiteMetadata } from "../graphql/siteMetadata";

const NotFoundPage: FunctionComponent<NotFoundPageProps> = ({ data }) => {
  const meta = useSiteMetadata();
  const theme = useContext(ThemeContext);

  return (
    <Box pad="large">
      <Seo
        title="Fore, oh! Fore!"
        description="Looks like we're in the junk together"
      />
      <Section heading="Whoops">
        <PageHeading>I've made a huge mistake!</PageHeading>
      </Section>
      <Section headingPad="small">
        <Box direction="row-responsive">
          <Box basis="1/2">
            <Paragraph>
              Looks like one of us made a huge mistake! There's a fairly good
              chance it's my fault; breaking things and all. But in the small
            </Paragraph>
            <Paragraph>
              You're probably going to want to head back{" "}
              <Anchor href="/">home</Anchor>, check out one of my{" "}
              <Anchor href="/writing">articles</Anchor> or if you're in the area
              join me for a round of <Anchor href="/golfing">golf</Anchor>.
            </Paragraph>
            <Paragraph>
              I really hope in real life the footer isn't duplicated!
            </Paragraph>
          </Box>
          <Box basis="1/2" align="center">
            <Img fixed={data.error.childImageSharp.fixed} />
          </Box>
        </Box>
      </Section>
    </Box>
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
