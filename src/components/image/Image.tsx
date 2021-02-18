import React, { FunctionComponent } from "react";
import { Image as AntdImage } from "antd";
import { ImageSharp, FeatureImageFile } from "../../graphql/imageSharp";

export interface ImageProps {
  type?: "fixed" | "fluid";
  image: FeatureImageFile;
}

export const Image: FunctionComponent<ImageProps> = ({
  type = "fluid",
  image: imageFile,
  ...rest
}) => {
  const image = imageFile && imageFile.childImageSharp[type];
  return (
    <AntdImage
      src={image?.src}
      srcSet={image?.srcSet}
      preview={false}
      {...rest}
    />
  );
};
