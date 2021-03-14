import {
  TagsOutlined,
  BookOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';
import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { Article } from '../../gatsby/articlesGraphQL';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin-bottom: 0.5em;
`;

const Content = styled.div`
  & ~ & {
    margin-left: 1em;
  }

  span {
    margin-left: 0.5em;
  }
`;

export const Tags: FunctionComponent<{ tags: string[] }> = ({ tags }) => {
  return (
    <Wrapper>
      {tags.map((tag) => (
        <Tag key={tag} tag={tag} />
      ))}
    </Wrapper>
  );
};
Tags.displayName = 'Tags';

export const Tag: FunctionComponent<{ tag: string }> = ({ tag }) => {
  return (
    <Content>
      <TagsOutlined />
      <span>{tag}</span>
    </Content>
  );
};
Tag.displayName = 'Tag';

export const Fields: FunctionComponent<{ article: Article }> = ({
  article,
}) => {
  return (
    <Wrapper>
      {article.fields.publishTime && (
        <Content>
          <BookOutlined />
          <span>Published on {article.fields.publishTime}</span>
        </Content>
      )}
      {article.timeToRead && (
        <Content>
          <ClockCircleOutlined />
          <span>{article.timeToRead} min read</span>
        </Content>
      )}
    </Wrapper>
  );
};
Tags.displayName = 'Fields';
