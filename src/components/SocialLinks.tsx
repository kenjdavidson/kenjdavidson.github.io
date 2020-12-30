import React, { FunctionComponent } from "react";
import { Box, BoxProps, Anchor, AnchorProps, defaultProps } from "grommet";
import {
  Github,
  Instagram,
  Linkedin,
  MailOption,
  StackOverflow,
  Twitter
} from "grommet-icons";
import useSiteMetadata from "../hooks/useSiteMetadata";
import { AnchorLink } from "./grommet";

const CustomAnchor: FunctionComponent<AnchorProps> = ({ ...rest }) => {
  return (
    <AnchorLink
      color={defaultProps.theme.global?.colors?.text}
      {...rest}
    ></AnchorLink>
  );
};

export interface SocialLinksProps extends BoxProps {
  vertical?: boolean;
  accounts?: boolean;
  iconSize?: string;
}

const SocialLinks: FunctionComponent<SocialLinksProps> = ({
  vertical: verticalProp = false,
  accounts: accountsProp = false,
  iconSize,
  ...rest
}) => {
  const meta = useSiteMetadata();

  // Need to provide the definition for siteMetadata
  const github = meta.social.find((s: any) => s.name == "github");
  const linkedin = meta.social.find((s: any) => s.name == "linkedin");
  const stackoverflow = meta.social.find((s: any) => s.name == "stackoverflow");
  const instagram = meta.social.find((s: any) => s.name == "instagram");
  const email = meta.social.find((s: any) => s.name == "email");

  const direction = verticalProp ? "column" : "row";
  const gap = verticalProp ? "small" : "medium";
  const size = iconSize || "medium";

  return (
    <Box gap={gap} direction={direction} {...rest}>
      {github && (
        <CustomAnchor
          icon={<Github size={size} />}
          href={github.href}
          a11yTitle={`${github.account} at ${github.display}`}
          label={accountsProp ? `/${github.account}` : undefined}
        />
      )}
      {linkedin && (
        <CustomAnchor
          icon={<Linkedin size={size} />}
          href={linkedin.href}
          a11yTitle={`${linkedin.account} at ${linkedin.display}`}
          label={accountsProp ? `/${linkedin.account}` : undefined}
        />
      )}
      {stackoverflow && (
        <CustomAnchor
          icon={<StackOverflow size={size} />}
          href={stackoverflow.href}
          a11yTitle={`${stackoverflow.account} at ${stackoverflow.display}`}
          label={accountsProp ? `/${stackoverflow.account}` : undefined}
        />
      )}
      {instagram && (
        <CustomAnchor
          icon={<Instagram size={size} />}
          href={instagram.href}
          a11yTitle={`${instagram.account} at ${instagram.display}`}
          label={accountsProp ? `@${instagram.account}` : undefined}
        />
      )}
      {email && (
        <CustomAnchor
          icon={<MailOption size={size} />}
          href={email.href}
          a11yTitle={`${email.account} at ${email.display}`}
          label={accountsProp ? `${email.account}` : undefined}
        />
      )}
    </Box>
  );
};

export default SocialLinks;
