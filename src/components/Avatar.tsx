import React, { FunctionComponent } from "react";
import { graphql, useStaticQuery } from "gatsby";
import Image from "gatsby-image";
import { BoxProps, Box } from "grommet";
import { useAvatar } from "../hooks/useAvatar";
import { withResponsiveWidth } from "./grommet/withResponsive";

// Double wrapped Image since Grommet doesn't allow for customizing
// `round` alternate corners
export const Avatar: FunctionComponent<BoxProps> = props => {
  const avatar = useAvatar();
  return (
    <Box
      round={{ corner: "top-left", size: "small" }}
      style={{ overflow: "hidden" }}
      {...props}
    >
      <Box
        fill
        round={{ corner: "bottom-right", size: "small" }}
        style={{ overflow: "hidden" }}
      >
        <Image fluid={avatar.childImageSharp.fluid} />
      </Box>
    </Box>
  );
};

export const ResponsiveAvatar = withResponsiveWidth(Avatar);
