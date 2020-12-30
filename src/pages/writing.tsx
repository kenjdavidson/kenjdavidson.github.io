import React, { FunctionComponent } from "react";
import { graphql, navigate } from "gatsby";
import useSiteMetadata from "../hooks/useSiteMetadata";
import { ArticleFragment } from "../utils/fragments";
import { Box, Heading } from "grommet";
import { Book, Clock } from "grommet-icons";
import { Section } from "../components/SiteLayout";
import { Paragraph } from "../components/grommet/Paragraph/Paragraph";

interface WritingPageProps {
  data: {
    allMdx: {
      edges: {
        node: ArticleFragment;
      }[];
    };
  };
}

export const WritingPage: FunctionComponent<WritingPageProps> = ({ data }) => {
  const meta = useSiteMetadata();

  const articlesByYear: Record<string, ArticleFragment[]> = {};

  data.allMdx.edges.forEach(node => {
    const article = node.node;
    if (!articlesByYear[article.fields.publishYear]) {
      articlesByYear[article.fields.publishYear] = [];
    }
    articlesByYear[article.fields.publishYear].push(article);
  });

  let archives = Object.keys(articlesByYear).reverse();
  console.log(archives);
  console.log(articlesByYear);

  return (
    <Box pad="large">
      {archives.map(year => (
        <Section heading={year}>
          {articlesByYear[year].map(article => (
            <Box onClick={() => navigate(`/${article.fields.slug}`)}>
              <Heading
                level="2"
                size="medium"
                responsive
                margin={{ bottom: "none" }}
              >
                {article.frontmatter.title}
              </Heading>
              <Paragraph
                fill
                margin={{ horizontal: "none", vertical: "small" }}
              >
                {article.frontmatter.summary}
              </Paragraph>
              <Box direction="row" fill gap="medium" align="center">
                <Box direction="row" margin="none" align="center" gap="xsmall">
                  <Book size="small" /> {article.fields.publishTime}
                </Box>
                <Box direction="row" margin="none" align="center" gap="xsmall">
                  <Clock size="small" /> {article.timeToRead} min read
                </Box>
              </Box>
            </Box>
          ))}
        </Section>
      ))}
      {/* <PageHeader>
        <div>
          <h3>I'm neither published nor awarded</h3> but I am opinionated and
          spend a bunch of time playing around with new languages and frameworks
          - it's possible something I write might help someone skip the
          suffering that I've run into. There's always a chance a post on my
          personal husbanding or fathering methods may appear!
        </div>
      </PageHeader>
      {archives.map(archive => (
        <Archive key={archive.year} archive={archive}></Archive>
      ))} */}
    </Box>
  );
};

export default WritingPage;

export const query = graphql`
  query WritingQuery {
    allMdx(
      filter: { fileAbsolutePath: { regex: "/content/posts/" } }
      sort: { fields: fields___publishTime, order: DESC }
    ) {
      edges {
        node {
          ...article
        }
      }
    }
  }
`;
