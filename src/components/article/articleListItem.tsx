import React, { FunctionComponent } from 'react';
import { Article } from '../../graphql/articles';
import { Link } from '../link';
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
      <Link to={article.fields.slug}>
        <h3>{article.frontmatter.title}</h3>
        {article.frontmatter.subtitle && (
          <h4>{article.frontmatter.subtitle}</h4>
        )}
        <p>{article.frontmatter.summary || article.excerpt}</p>
      </Link>
    </article>
  );
};
