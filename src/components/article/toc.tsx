import React, { HTMLAttributes, FunctionComponent } from 'react';
import { Article } from '../../gatsby/articlesGraphQL';
import { Link } from '../link';
import slugify from 'slugify';
import styled from 'styled-components';

const StyleTableOfContents = styled.section`
  a {
    display: block;
    color: var(--text-color);

    &:hover {
      color: var(--primary-6);
    }

    &.depth-3 {
      padding-left: 1em;
    }
    &.depth-4 {
      padding-left: 2em;
    }
  }
`;

export interface TableOfContentsProps extends HTMLAttributes<HTMLElement> {
  article: Article;
}

export const TableOfContents: FunctionComponent<TableOfContentsProps> = ({
  article,
  children,
  className,
}) => (
  <StyleTableOfContents className={className}>
    {children}
    <Link className="depth-1" to="#introduction">
      Introduction
    </Link>
    {article.headings
      .filter((heading) => heading.depth < 4)
      .map((heading) => {
        const slug = slugify(heading.value).toLowerCase();
        return (
          <Link
            key={`toc-${slug}`}
            className={`depth-${heading.depth}`}
            to={`#${slug}`}
          >
            {heading.value}
          </Link>
        );
      })}
  </StyleTableOfContents>
);
TableOfContents.displayName = 'TableOfContents';
