import React, { FunctionComponent } from 'react';
import { List as ArticleList } from '../components/article';
import { Seo } from '../components/Seo';
import { graphql } from 'gatsby';
import { Article } from '../graphql/articles';
import { Section } from '../components/section/section';
import { Col, Typography, Row, List } from 'antd';
import { Link } from '../components/Link';
import { Project } from '../graphql/projects';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { Image } from '../components/image/Image';
import { ArticleListItem } from '../components/article/ArticleListItem';

const IndexPage: FunctionComponent<IndexPageProps> = ({ data }) => {
  return (
    <>
      <Seo />
      <Section className="inverse hero">
        <Typography.Title>Hey, I'm Ken.</Typography.Title>
        <Typography.Paragraph>
          Thanks for swinging by! I'm just <strong>hubanding</strong>,{' '}
          <strong>fathering</strong>, <strong>golfing</strong> and{' '}
          <strong>developing</strong> my way to retirement. Besides being a
          playground for my continual learning, you'll get a little of my{' '}
          <Link href="/resume">professional</Link>
          and <Link href="/">personal</Link> history.
        </Typography.Paragraph>
        <Typography.Paragraph>
          This site is ever changing, but always open; if you run into issues
          shoot me a message or{' '}
          <Link href="https://www.github.com/kenjdavidson/kenjdavidson.github.io">
            teach me a lesson{' '}
          </Link>
          . Have a good one!
        </Typography.Paragraph>
      </Section>

      <Section title="RECENT POSTS">
        <List
          dataSource={data.recentArticles.articles}
          renderItem={(item) => <ArticleListItem article={item} />}
        />
      </Section>

      <Section title="NOTABLE(ish) PROJECTS">
        {data.recentProjects.projects.map((project) => (
          <Row gutter={[16, 32]}>
            <Col md={{ span: 12 }}>
              {project.frontmatter.featureImage && (
                <Image image={project.frontmatter.featureImage} />
              )}
            </Col>
            <Col md={{ span: 12 }}>
              <Typography.Title level={3}>
                {project.frontmatter.title}
              </Typography.Title>
              <MDXRenderer>{project.body}</MDXRenderer>
            </Col>
          </Row>
        ))}
      </Section>
    </>
  );
};

export default IndexPage;
interface IndexPageProps {
  data: {
    recentArticles: {
      articles: Article[];
    };
    recentProjects: {
      projects: Project[];
    };
  };
}

export const query = graphql`
  query IndexPageQuery {
    recentArticles: allMdx(
      sort: { fields: fields___publishTime, order: DESC }
      limit: 8
      filter: { frontmatter: { type: { eq: "Post" }, draft: { ne: true } } }
    ) {
      articles: nodes {
        ...ArticleSummary
      }
    }
    recentProjects: allMdx(
      filter: {
        fileAbsolutePath: { regex: "/projects/" }
        frontmatter: { draft: { ne: true } }
      }
      sort: { fields: frontmatter___order }
    ) {
      projects: nodes {
        ...Project
      }
    }
  }
`;
