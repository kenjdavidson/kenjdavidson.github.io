import React, { FunctionComponent } from 'react';
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton,
} from 'react-share';

export interface ShareLinksProps {
  title: string;
  summary?: string;
  href: string;
  email?: boolean;
  facebook?: boolean;
  twitter?: boolean;
  instagram?: boolean;
  linkedin?: boolean;
}

export const ShareLinks: FunctionComponent<ShareLinksProps> = ({
  title,
  summary,
  href,
  email = true,
  facebook = true,
  twitter = true,
  instagram = true,
  linkedin = true,
}) => {
  return (
    <section>
      {email && (
        <EmailShareButton url={href} subject={title}>
          <EmailIcon />
        </EmailShareButton>
      )}
      {facebook && (
        <FacebookShareButton url={href} title={title}>
          <FacebookIcon />
        </FacebookShareButton>
      )}
      {linkedin && (
        <LinkedinShareButton url={href} title={title} summary={summary}>
          <LinkedinIcon />
        </LinkedinShareButton>
      )}
      {twitter && (
        <TwitterShareButton url={href} title={title}>
          <TwitterIcon />
        </TwitterShareButton>
      )}
    </section>
  );
};
