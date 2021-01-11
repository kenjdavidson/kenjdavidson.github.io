import { graphql } from "gatsby";

export const fragment = graphql`
  fragment siteMetadata on Site {
    siteMetadata {
      siteUrl
      title
      summary
      description
      image
      twitterUsername
      author {
        name
        avatar
        summary
      }
      menu {
        href
        title
      }
      social {
        account
        display
        href
        name
      }
    }
  }
`;

export type MenuItem = {
  href: string;
  title: string;
};

export type SocialItem = {
  account: string;
  display: string;
  href: string;
  name: string;
};

export type AuthorDetail = {
  name: string;
  avatar: string;
  summary: string;
};

export type SiteMetadata = {
  siteUrl: string;
  title: string;
  summary: string;
  description: string;
  image: string;
  twitterUsername: string;
  author: AuthorDetail;
  menu: MenuItem[];
  social: SocialItem[];
};
