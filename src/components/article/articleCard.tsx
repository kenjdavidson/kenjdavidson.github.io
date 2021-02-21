import React, { FunctionComponent } from 'react';
import { navigate } from 'gatsby';
import { Fields } from './fields';
import { Article } from '../../graphql/articles';
import styled from 'styled-components';
import { Link } from '../link';
import { Card, Typography } from 'antd';

export interface ArticleCardProps {
  article: Article;
  headingLevel?: 1 | 2 | 3 | 4 | 5;
}

export const ArticleCard: FunctionComponent<ArticleCardProps> = ({
  article,
  headingLevel = 3,
  ...rest
}) => {
  return (
    <Card>
      <Typography.Title level={headingLevel}></Typography.Title>
      <Typography.Paragraph>{article.frontmatter.summary}</Typography.Paragraph>
      <Typography.Paragraph>
        <Link href={article.fields.slug}>Read more</Link>
      </Typography.Paragraph>
    </Card>
  );
};
