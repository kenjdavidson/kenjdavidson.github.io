import React from 'react';

import GridWrapper from './GridWrapper';
import ArticleExcerpt from './ArticleExcerpt';

export default ({ className, posts }) => (
  <GridWrapper className={className}>
    {posts.map(post => (
      <ArticleExcerpt key={post.node.id} post={post.node} />
    ))}      
  </GridWrapper>   
);
