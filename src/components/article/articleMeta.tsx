import React, { FunctionComponent } from 'react';
import useSiteMetadata from '../../hooks/useSiteMetadata';
import useEditUrl from '../../hooks/useEditUrl';
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton,
} from 'react-share';
import { Article } from '../../gatsby/articlesGraphQL';
import { Tags } from './tags';
import { Fields } from './fields';
import { Link } from '../link';

export interface ArticleMetaProps {
  article: Article;
  shareUrl?: string;
}

export const ArticleMeta: FunctionComponent<ArticleMetaProps> = ({
  article,
  shareUrl,
  ...rest
}) => {
  return (
    <aside>
      <section>
        <Fields article={article} />
        <Tags tags={article.frontmatter.tags!} />
      </section>
      <section>
        <span>Share on</span>
      </section>
      <section>
        <span>Edit on</span>
        <Link to={useEditUrl(article.fileAbsolutePath)} />
      </section>
    </aside>
  );
};
