import { TagsOutlined } from '@ant-design/icons';
import { List, Typography } from 'antd';
import React, { FunctionComponent } from 'react';

export interface TagsProp {
  tags: string[];
}

export const Tags: FunctionComponent<TagsProp> = ({ tags, ...rest }) => {
  return (
    <List
      dataSource={tags}
      itemLayout="horizontal"
      renderItem={(tag) => <Tag tag={tag} />}
    />
  );
};

export interface TagProps {
  tag: string;
}

export const Tag: FunctionComponent<TagProps> = ({ tag, ...rest }) => {
  return (
    <div>
      <TagsOutlined />
      <Typography.Text>{tag}</Typography.Text>;
    </div>
  );
};
