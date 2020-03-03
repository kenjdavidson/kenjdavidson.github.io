import React from 'react';
import styled from 'styled-components';

const Tag = styled.li`
  display: inline-block;
  font-size: 0.8em;    
  margin: 0 1em 0 0;  
  padding: 0.2rem 1.25rem 0.15rem 0.5rem;
  background-color: var(--base02);
  color: var(--base07);
  border-radius: 2px 15px 15px 2px;
  position: relative;

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

const UnstyledList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0px;
`;

export default ({className, tags}) => (
  <UnstyledList>
    {tags.map(tag => (
      <Tag key={tag}>{tag}</Tag>
    ))}
  </UnstyledList>
);