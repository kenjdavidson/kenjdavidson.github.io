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
import { Article } from '../../graphql/articles';
import { Tags } from './tags';
import { Typography } from 'antd';
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
        <Typography.Text>Share on</Typography.Text>
      </section>
      <section>
        <Typography.Text>Edit on</Typography.Text>
        <Link href={useEditUrl(article.fileAbsolutePath)} />
      </section>
    </aside>
  );
};
