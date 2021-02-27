import React, { FunctionComponent } from 'react';
import { navigate } from 'gatsby';
import { Fields } from './fields';
import { Article } from '../../graphql/articles';
import styled from 'styled-components';
import { Link } from '../link';

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
    <div>
      <h3></h3>
      <p>{article.frontmatter.summary}</p>
      <p>
        <Link to={article.fields.slug}>Read more</Link>
      </p>
    </div>
  );
};
