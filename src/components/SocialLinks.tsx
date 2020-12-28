import React, { FunctionComponent } from "react";
import { Box, BoxProps, Anchor, AnchorProps, defaultProps } from 'grommet';
import { Github, Instagram, Linkedin, MailOption, StackOverflow, Twitter } from "grommet-icons";
import useSiteMetadata from "../hooks/useSiteMetadata";

const CustomAnchor: FunctionComponent<AnchorProps> = ({...rest}) => {
  return <Anchor color={defaultProps.theme.global?.colors?.text} {...rest}></Anchor>
}

const SocialLinks: FunctionComponent<BoxProps> = ({ ...rest }) => {
  const meta = useSiteMetadata();

  // Need to provide the definition for siteMetadata
  const github = meta.social.find((s: any) => s.name == "github");
  const linkedin = meta.social.find((s: any) => s.name == "linkedin");
  const stackoverflow = meta.social.find((s: any) => s.name == "stackoverflow");
  const instagram = meta.social.find((s: any) => s.name == "instagram");
  const email = meta.social.find((s: any) => s.name == "email");

  return (
    <Box pad="small" gap="medium" direction="row" {...rest}>
      { github && <CustomAnchor icon={<Github/>} href={github.href} a11yTitle={`${github.account} at ${github.display}`} />}
      { linkedin && <CustomAnchor icon={<Linkedin/>} href={linkedin.href} a11yTitle={`${github.account} at ${github.display}`} />}
      { stackoverflow && <CustomAnchor icon={<StackOverflow/>} href={stackoverflow.href} a11yTitle={`${github.account} at ${github.display}`} />}
      { instagram && <CustomAnchor icon={<Instagram/>} href={instagram.href} a11yTitle={`${instagram.account} at ${instagram.display}`} />}
      { email && <CustomAnchor icon={<MailOption/>} href={email.href} a11yTitle={`${email.account} at ${email.display}`} />}
    </Box>
  );
};

export default SocialLinks;