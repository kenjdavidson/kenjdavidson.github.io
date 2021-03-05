import { BookOutlined, ClockCircleOutlined } from '@ant-design/icons';
import React, { FunctionComponent } from 'react';
import { Article } from '../../gatsby/articlesGraphQL';

export interface FieldsProps {
  article: Article;
}

export const Fields: FunctionComponent<FieldsProps> = ({
  article,
  ...rest
}) => {
  return (
    <div>
      <section>
        <BookOutlined />
        <span>{article.fields.publishTime}</span>
      </section>
      <section>
        <ClockCircleOutlined />
        <span>{article.timeToRead} min read</span>
      </section>
    </div>
  );
};
