import { BookOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { Typography } from 'antd';
import React, { FunctionComponent } from 'react';
import { Article } from '../../graphql/articles';

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
        <Typography.Text>{article.fields.publishTime}</Typography.Text>
      </section>
      <section>
        <ClockCircleOutlined />
        <Typography.Text>{article.timeToRead} min read</Typography.Text>
      </section>
    </div>
  );
};
