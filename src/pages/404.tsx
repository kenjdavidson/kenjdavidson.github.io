import React, { FunctionComponent, useContext } from "react";
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

const NotFoundPage: FunctionComponent = (props: any) => {
  const meta = useSiteMetadata();
  const theme = useContext(ThemeContext);

  return (
    <Box pad="large">
      <Seo
        title="Fore, oh! Fore!"
        description="Looks like we're in the junk together"
      />
      <Section heading="Whoops">
        <PageHeading>Fore! Oh, Fore!</PageHeading>
        <Paragraph>
          I'm always not finding my ball, but there's no way you should be lost.
        </Paragraph>
      </Section>
    </Box>
  );
};

export default NotFoundPage;
