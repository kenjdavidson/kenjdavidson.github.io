import React, { ComponentType } from "react";

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
} from "@ant-design/icons";

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
