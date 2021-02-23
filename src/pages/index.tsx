import React, { FunctionComponent } from 'react';
import { Seo } from '../components/seo';
import { graphql } from 'gatsby';
import { Article } from '../graphql/articles';
import { Section, SectionTitle } from '../components/section/section';
import { Col, Typography, Row, List } from 'antd';
import { Link } from '../components/link';
import { Project } from '../graphql/projects';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { Image } from '../components/image/Image';
import { ArticleListItem } from '../components/article/articleListItem';
import { Header } from '../components/header/header';

const IndexPage: FunctionComponent<IndexPageProps> = ({ data }) => {
  return (
    <>
      <Seo />
      <Header />
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

      <Section>
        <SectionTitle spacing="md">Recent Posts</SectionTitle>
        <List
          dataSource={data.recentArticles.articles}
          renderItem={(item) => <ArticleListItem article={item} />}
        />
      </Section>

      <Section>
        <SectionTitle spacing="md">Notable(ish) Projects</SectionTitle>
        {data.recentProjects.projects.map((project) => (
          <article key={`project-row-${project.frontmatter.title}`}>
            <Row gutter={[24, 32]}>
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
          </article>
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
