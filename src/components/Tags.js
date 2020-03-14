import React from 'react';
import styled from 'styled-components';

const Tag = styled.li`
  display: inline-block;
  font-size: 0.8em;    
  margin: 8px 1em 0 0;  
  padding: 0.2rem 1.25rem 0.15rem 0.5rem;
  background-color: var(--base02);
  color: var(--base04);
  border-radius: 2px 15px 15px 2px;
  position: relative;
  font-weight: initial;

  &:after {
    content: ' ';
    position: absolute;
    background-color: var(--base00);
    height: 3px;
    width: 3px;
    top: 50%; transform: translateY(-50%);
    right: 0.5em;
  }

  &:last-child {
    margin-right: 0;
  }
`;

const TagsList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

export default ({className, tags}) => (
  <TagsList className={className}>
    {tags.map(tag => (
      <Tag key={tag}>{tag}</Tag>
    ))}
  </TagsList>
);