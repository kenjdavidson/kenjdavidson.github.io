import React, { FunctionComponent } from "react";
import { graphql, useStaticQuery } from "gatsby";
import Image from "gatsby-image";
import { BoxProps, Box } from "grommet";
import { useAvatar } from "../hooks/useAvatar";
import { withResponsiveWidth } from "./grommet/withResponsiveSize";

export const Avatar: FunctionComponent<BoxProps> = props => {
  const avatar = useAvatar();
  return (
    <Box round="full" style={{ overflow: "hidden" }} {...props}>
      <Image fluid={avatar.childImageSharp.fluid} />
    </Box>
  );
};

export const ResponsiveAvatar = withResponsiveWidth(Avatar);
