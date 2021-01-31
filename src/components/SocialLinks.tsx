import React, { FunctionComponent, useContext } from "react";
import { Box, BoxProps, ThemeContext } from "grommet";
import {
  Github,
  Instagram,
  Linkedin,
  MailOption,
  StackOverflow,
  Twitter
} from "grommet-icons";
import useSiteMetadata from "../hooks/useSiteMetadata";
import { Anchor, AnchorProps } from "./grommet";

const SocialAnchor: FunctionComponent<AnchorProps> = ({ ...rest }) => {
  return <Anchor {...rest}></Anchor>;
};

export interface SocialLinksProps extends BoxProps {
  vertical?: boolean;
  accounts?: boolean;
  iconSize?: string;
  iconColor?: string;
}

const SocialLinks: FunctionComponent<SocialLinksProps> = ({
  vertical: verticalProp = false,
  accounts: accountsProp = false,
  iconSize,
  iconColor,
  ...rest
}) => {
  const meta = useSiteMetadata();
  const theme: any = useContext(ThemeContext);

  // Need to provide the definition for siteMetadata
  const github = meta.social.find((s: any) => s.name == "github");
  const linkedin = meta.social.find((s: any) => s.name == "linkedin");
  const stackoverflow = meta.social.find((s: any) => s.name == "stackoverflow");
  const instagram = meta.social.find((s: any) => s.name == "instagram");
  const email = meta.social.find((s: any) => s.name == "email");

  const direction = verticalProp ? "column" : "row";
  const gap = verticalProp ? "small" : "small";
  const size = iconSize || "medium";

  return (
    <Box gap={gap} direction={direction} {...rest}>
      {github && (
        <SocialAnchor
          icon={<Github size={size} />}
          color={iconColor || theme.global.colors.text}
          href={github.href}
          a11yTitle={`${github.account} at ${github.display}`}
          label={accountsProp ? `/${github.account}` : undefined}
        />
      )}
      {linkedin && (
        <SocialAnchor
          icon={<Linkedin size={size} />}
          color={iconColor || theme.global?.colors?.text}
          href={linkedin.href}
          a11yTitle={`${linkedin.account} at ${linkedin.display}`}
          label={accountsProp ? `/${linkedin.account}` : undefined}
        />
      )}
      {stackoverflow && (
        <SocialAnchor
          icon={<StackOverflow size={size} />}
          color={iconColor || theme.global?.colors?.text}
          href={stackoverflow.href}
          a11yTitle={`${stackoverflow.account} at ${stackoverflow.display}`}
          label={accountsProp ? `/${stackoverflow.account}` : undefined}
        />
      )}
      {instagram && (
        <SocialAnchor
          icon={<Instagram size={size} />}
          color={iconColor || theme.global?.colors?.text}
          href={instagram.href}
          a11yTitle={`${instagram.account} at ${instagram.display}`}
          label={accountsProp ? `@${instagram.account}` : undefined}
        />
      )}
      {email && (
        <SocialAnchor
          icon={<MailOption size={size} />}
          color={iconColor || theme.global?.colors?.text}
          href={email.href}
          a11yTitle={`${email.account} at ${email.display}`}
          label={accountsProp ? `${email.account}` : undefined}
        />
      )}
    </Box>
  );
};

export default SocialLinks;
