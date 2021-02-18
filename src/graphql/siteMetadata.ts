import { graphql } from "gatsby";

export const fragment = graphql`
  fragment siteMetadata on Site {
    siteMetadata {
      siteUrl
      title
      description
      image
      twitterUsername
      editUrl
      author {
        name
        avatar
        description
      }
      menu {
        href
        title
        icon
        alt
      }
      social {
        account
        display
        href
        name
        icon
      }
    }
  }
`;

export type MenuItem = {
  href: string;
  title: string;
  icon: string;
};

export type SocialItem = {
  account: string;
  display: string;
  href: string;
  name: string;
  icon: string;
};

export type AuthorDetail = {
  name: string;
  avatar: string;
  description: string;
};

export type SiteMetadata = {
  siteUrl: string;
  title: string;
  description: string;
  image: string;
  twitterUsername: string;
  editUrl: string;
  author: AuthorDetail;
  menu: MenuItem[];
  social: SocialItem[];
};
