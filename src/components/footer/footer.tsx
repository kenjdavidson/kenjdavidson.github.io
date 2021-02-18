import React, { FunctionComponent } from 'react';
import { Col, Divider, Image, Layout, List, Row, Typography } from 'antd';
import useSiteMetadata from '../../hooks/useSiteMetadata';
import { useRecentArticles } from '../../hooks/useRecentArticles';
import { useAvatar } from '../../hooks/useAvatar';
import { Link } from '../Link';
import { Copyright } from './copyright';
import { SocialList } from '../social/socialList';
import { SiteMetadata } from '../../graphql/siteMetadata';
import { Section } from '../section/section';

export interface FooterProps {
  meta: SiteMetadata;
}

export const Footer: FunctionComponent<FooterProps> = ({ meta, ...rest }) => {
  const articles = useRecentArticles();
  const avatar = useAvatar();
  const { author, social } = meta;

  return (
    <Layout.Footer className="inverse">
      <Section verticalPad="sm">
        <Row className="footer-row-content" gutter={[16, 16]}>
          <Col md={12} lg={8}>
            <Typography.Title level={3}>Recent posts...</Typography.Title>
            <List
              dataSource={articles}
              renderItem={(item) => {
                return (
                  <List.Item>
                    <Link href={item.fields.slug}>
                      <Typography.Text ellipsis={{ suffix: ' ' }}>
                        {item.frontmatter.title}
                      </Typography.Text>
                    </Link>
                  </List.Item>
                );
              }}
              bordered={false}
              split={false}
            ></List>
          </Col>
          <Col md={12} lg={8}>
            <Typography.Title level={3}>In case you missed...</Typography.Title>
            <List
              dataSource={[
                {
                  title: 'A terribly written biography',
                  href: '/about',
                },
                {
                  title: 'Fitness & dieting sucks',
                  href: '/health',
                },
                {
                  title: "I just can't seem to break 12 handicap",
                  href: '/golf',
                },
                {
                  title: 'People are way smarter than me',
                  href: './backlinks',
                },
              ]}
              renderItem={(item) => {
                return (
                  <List.Item>
                    <Link href={item.href}>
                      <Typography.Text ellipsis={{ suffix: ' ' }}>
                        {item.title}
                      </Typography.Text>
                    </Link>
                  </List.Item>
                );
              }}
              bordered={false}
              split={false}
            ></List>
          </Col>
          <Col md={24} lg={8}>
            <Row gutter={{ md: 16 }}>
              <Col md={12} lg={24}>
                <Image
                  className="footer-avatar"
                  alt={`Hey, it's me ${author.name} and Carson taking a walk`}
                  src={avatar.childImageSharp.fluid.src}
                  srcSet={avatar.childImageSharp.fluid.srcSet}
                  preview={false}
                  placeholder={
                    <Image
                      src={avatar.childImageSharp.fluid.tracedSVG}
                      preview={false}
                    />
                  }
                ></Image>
              </Col>
              <Col md={12} lg={24}>
                <Typography.Paragraph>
                  Thanks again for swinging by. If you weren't able to find what
                  youre looking for, feel free to shoot me a message and I'll
                  try to get things updated. If you've come across a spelling or
                  grammatical error (there are probably a bunch) feel free to{' '}
                  <Typography.Link href="https://gitub.com/kenjdavidson/kenjdavidson.github.io">
                    correct me
                  </Typography.Link>
                  . I won't be offended.
                </Typography.Paragraph>
              </Col>
            </Row>
          </Col>
        </Row>
      </Section>
      <Divider className="footer-divider" />
      <Section verticalPad="sm">
        <Row justify="center" className="footer-row-social">
          <SocialList dataSource={social} />
        </Row>
      </Section>
      <Divider className="footer-divider" />
      <Section verticalPad="sm">
        <Row
          gutter={[16, 16]}
          justify="space-between"
          className="footer-row-copyright"
        >
          <Col>
            <Typography.Text>
              Built with{' '}
              <Link href="https://www.gatsbyjs.org/" target="blank">
                Gatsby
              </Link>
              ,
              <Link href="https://pages.github.com/" target="blank">
                Github Pages
              </Link>{' '}
              and <Link href="/about/website">other fun things</Link>.
            </Typography.Text>
          </Col>
          <Col>
            <Typography.Text>
              <Copyright>{author.name}</Copyright>
            </Typography.Text>
          </Col>
        </Row>
      </Section>
    </Layout.Footer>
  );
};
