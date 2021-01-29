import React, { FunctionComponent, useContext } from "react";
import useSiteMetadata from "../hooks/useSiteMetadata";
import { Box, ThemeContext } from "grommet";
import { Anchor, Paragraph } from "../components/Grommet";
import { PageHeading, Section } from "../components/Page";
import { List as ArticleList } from "../components/Article/List";
import { Seo } from "../components/Seo";
import { SectionPart } from "../components/Page/SectionPart";
import { graphql } from "gatsby";
import { Article } from "../graphql/graphqlArticles";

const IndexPage: FunctionComponent<IndexPageProps> = ({ data }) => {
  return (
    <>
      <Seo />
      <Box pad="large">
        <PageHeading>Hey, I'm Ken.</PageHeading>
        <Paragraph>
          Thanks for swinging by! I'm just <strong>hubanding</strong>,{" "}
          <strong>fathering</strong>, <strong>golfing</strong> and{" "}
          <strong>developing</strong> my way to retirement. Besides being a
          playground for my continual learning, you'll get a little of my{" "}
          <Anchor href="/resume">professional</Anchor>
          and <Anchor href="/">personal</Anchor> history.
        </Paragraph>
        <Paragraph>
          This site is ever changing, but always open; if you run into issues
          shoot me a message or{" "}
          <Anchor href="https://www.github.com/kenjdavidson/kenjdavidson.github.io">
            teach me a lesson{" "}
          </Anchor>
          . Have a good one!
        </Paragraph>
        <Section heading="Recent Posts">
          <ArticleList articles={data.recent.articles} />
          <Paragraph>
            <Anchor href="/writing">Check out more articles...</Anchor>
          </Paragraph>
        </Section>
        <Section heading="Projects">
          <SectionPart heading="React Native Bluetoth Classic">
            <Paragraph markdown>
              While developing [Standardbred
              Canada](https://www.standardbredcanada.ca) mobile application I
              was required to write (well I guess I could have not used React
              Native) a plugin that provided Bluetooth Classic functionality to
              both Android and IOS. There were numerous plugins for Android, but
              most of them fell back to BLE for their IOS implementations.
              Starting with the great base of [React Native Bluetooth
              Serial](https://github.com/rusel1989/react-native-bluetooth-serial)
              I was able to get **External Accessory** up and running for IOS.
            </Paragraph>
            <Paragraph markdown>
              Check out the [project
              docs](https://www.kenjdavidson.com/react-native-bluetooth-classic)
            </Paragraph>
          </SectionPart>
          <SectionPart heading="Caddieasy (Suite)">
            <Paragraph markdown>
              I love golf; but I've been falling out of love with my
              [Garmin](https://www.garmin.com/en-CA/). Which may have started
              happening after Sue bought me my [Fitbit
              Ionic](https://www.fitbit.com/global/no/products/smartwatches/ionic).
              The one missing feature on the Fitbit is the lack of Golf app -
              although looking around there are a couple. I tried to get in
              contact with the author of [Smart Watch Golf
              GPS](https://smartwatchgolfgps.com/) in order to contribute but
              sadly never received any word back.
            </Paragraph>
            <Paragraph markdown>
              That's when I decided that I might as well start my own project,
              using Github, to provide myself (and I guess others) with a free
              and easy way to share (and most importantly customize) courses for
              their own game!
            </Paragraph>
          </SectionPart>
        </Section>
      </Box>
    </>
  );
};

export default IndexPage;
interface IndexPageProps {
  data: {
    recent: {
      articles: Article[];
    };
  };
}

export const query = graphql`
  query IndexPageQuery {
    recent: allMdx(
      sort: { fields: fields___publishTime, order: DESC }
      limit: 6
      filter: { frontmatter: { type: { eq: "Post" }, draft: { ne: true } } }
    ) {
      articles: nodes {
        ...Article
      }
    }
  }
`;
