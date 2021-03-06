import React, {
  ComponentType,
  FunctionComponent,
  HtmlHTMLAttributes,
} from 'react';
import Icon, {
  GithubOutlined,
  AliwangwangOutlined,
  DingdingOutlined,
  TwitterOutlined,
  WechatOutlined,
  YoutubeOutlined,
  SkypeOutlined,
  MediumOutlined,
  LinkedinOutlined,
  FacebookOutlined,
  CodepenOutlined,
  CodeSandboxOutlined,
  GoogleOutlined,
  SlackOutlined,
  DribbbleOutlined,
  InstagramOutlined,
  RedditOutlined,
  MailOutlined,
} from '@ant-design/icons';
import { SocialItem } from '../graphql/siteMetadata';
import { Link, LinkProps } from './link';
import styled from 'styled-components';
import { Palette } from '../../@types/styled';
import { BoxStyleable, FontStyleable } from '../styles/themes';

const StackOverflowSvg = () => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor">
    <g>
      <path d="m6.444 14.839 10.338 2.196.433-2.089-10.338-2.212z" />
      <path d="m6.215 17.571h10.566v2.127h-10.566z" />
      <path d="m7.8 9.831 9.572 4.526.887-1.944-9.577-4.538z" />
      <path d="m17.373 14.358-.001-.001-.001.001z" />
    </g>
    <path d="m2 15.429v8.571h18.992v-8.571h-2.113v6.428h-14.766v-6.428z" />
    <path d="m10.453 5.063 8.109 6.873 1.346-1.65-8.109-6.873z" />
    <path d="m22 8.587-6.302-8.587-1.691 1.286 6.302 8.587z" />
  </svg>
);

const StackOverflow = (props: any) => (
  <Icon component={StackOverflowSvg} {...props} />
);

export const socialIcons: Record<string, ComponentType> = {
  GithubOutlined,
  AliwangwangOutlined,
  DingdingOutlined,
  TwitterOutlined,
  WechatOutlined,
  YoutubeOutlined,
  SkypeOutlined,
  MediumOutlined,
  LinkedinOutlined,
  FacebookOutlined,
  CodepenOutlined,
  CodeSandboxOutlined,
  GoogleOutlined,
  SlackOutlined,
  DribbbleOutlined,
  InstagramOutlined,
  RedditOutlined,
  MailOutlined,
  StackOverflow,
};

interface SocialLinkProps extends HtmlHTMLAttributes<HTMLAnchorElement> {
  social: SocialItem;
}

const StyledLink = styled.a<BoxStyleable & FontStyleable>`
  display: block;
  position: relative;
  text-decoration: none;
  transition: all 0.3s;

  ${({ theme, color }) => color && `color: ${theme.primary[color]};`}
  ${({ theme, size }) => size && `font-size: ${size};`}
  ${({ padding }) => padding && `padding: ${padding};`}

  &:hover {
    transform: scale(1.5);
  }
`;

export const SocialLink: FunctionComponent<
  SocialLinkProps & BoxStyleable & FontStyleable
> = ({ social, ...rest }) => {
  const Icon: any = socialIcons[social.icon];
  return (
    <StyledLink href={social.href} {...rest}>
      {(Icon && <Icon />) || <span>{social.account}</span>}
    </StyledLink>
  );
};
