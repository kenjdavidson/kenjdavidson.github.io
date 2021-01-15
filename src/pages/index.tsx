import React, { FunctionComponent, useContext } from "react";
import { graphql, Link } from "gatsby";
import useSiteMetadata from "../hooks/useSiteMetadata";
import {
  Box,
  Heading,
  Markdown,
  ResponsiveContext,
  ThemeContext
} from "grommet";
import { Anchor, H2, Paragraph } from "../components/Grommet";
import { PageHeading, Section } from "../components/Page";
import { RecentArticles } from "../components/Article/RecentArticles";
import { Seo } from "../components/Seo";
import { SectionPart } from "../components/Page/SectionPart";

const IndexPage: FunctionComponent = (props: any) => {
  const meta = useSiteMetadata();
  const theme = useContext(ThemeContext);

  console.log(theme);

  return (
    <>
      <Seo title="" description="" />
      <Box
        // pageTitle={meta.title} pageSummary={meta.summary} pageSlug="/"
        pad="large"
      >
        <Section>
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
        </Section>
        <Section heading="Recent Posts">
          <RecentArticles showArticles={3} />
          <Paragraph>
            <Anchor href="/writing">Read More...</Anchor>
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
          <SectionPart heading="Git Golf (Suite)">
            <Paragraph markdown>
              I love golf; but recently I've been not loving
              [Garmin](https://www.garmin.com/en-CA/) which may have started
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
