import { TagsOutlined } from '@ant-design/icons';
import React, { FunctionComponent } from 'react';

export interface TagsProp {
  tags: string[];
}

export const Tags: FunctionComponent<TagsProp> = ({ tags, ...rest }) => {
  return (
    <ul>
      {tags.map((tag) => (
        <Tag key={tag} tag={tag} />
      ))}
    </ul>
  );
};

export interface TagProps {
  tag: string;
}

export const Tag: FunctionComponent<TagProps> = ({ tag, ...rest }) => {
  return (
    <div>
      <TagsOutlined />
      <span>{tag}</span>;
    </div>
  );
};
