import React from "react";
import { WidgetProps, Widget } from "./widget";
import GatsbyImage, { GatsbyImageProps } from "gatsby-image";

export interface ImageProps extends WidgetProps<string>, GatsbyImageProps {
  alt: string;
}

export const Image: React.FC<ImageProps> = ({
  children,
  alt,
  ...widgetProps
}) => {
  return (
    <Widget {...widgetProps} type="image">
      {data =>
        children ? (
          children(data)
        ) : data.childImageSharp ? (
          <GatsbyImage
            {...widgetProps}
            alt={alt}
            fluid={data.childImageSharp.fluid}
            fixed={data.childImageSharp.fixed}
          />
        ) : (
          <img src={data} alt={alt} />
        )
      }
    </Widget>
  );
};
