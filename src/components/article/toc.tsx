import React, { HTMLAttributes, FunctionComponent } from 'react';
import { Article } from '../../graphql/articles';
import { Link } from '../link';
import slugify from 'slugify';
import styled from 'styled-components';

const TOCAside = styled.aside`
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
}) => (
  <TOCAside className="toc">
    {children}
    <Link className="depth-1" href="#introduction">
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
            href={`#${slug}`}
          >
            {heading.value}
          </Link>
        );
      })}
  </TOCAside>
);
