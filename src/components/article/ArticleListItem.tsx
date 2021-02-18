import { Typography } from 'antd';
import React, { FunctionComponent } from 'react';
import { Article } from '../../graphql/articles';
import { Link } from '../Link';
import classNames from 'classnames';
import slugify from 'slugify';

export interface ArticleListItemProps {
  article: Article;
}

export const ArticleListItem: FunctionComponent<ArticleListItemProps> = ({
  article,
  ...props
}) => {
  const classes = classNames([
    `article-list-item`,
    `article-${slugify(article.frontmatter.title)}`,
  ]);

  return (
    <article className={classes}>
      <Link href={article.fields.slug}>
        <Typography.Title level={3}>
          {article.frontmatter.title}
        </Typography.Title>
        {article.frontmatter.subtitle && (
          <Typography.Title level={4}>
            {article.frontmatter.subtitle}
          </Typography.Title>
        )}
        <Typography.Paragraph ellipsis={{ rows: 3 }}>
          {article.frontmatter.summary || article.excerpt}
        </Typography.Paragraph>
        <Typography.Paragraph>Continue Reading</Typography.Paragraph>
      </Link>
    </article>
  );
};
