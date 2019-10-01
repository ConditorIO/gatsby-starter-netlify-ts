import React from "react";
import { WidgetProps, Widget } from "./widget";

export interface TextProps extends WidgetProps<string> {
  multiple: true;
  options: string[] | { [k: string]: string };
}

export const Text: React.FC<TextProps> = ({ children, ...widgetProps }) => {
  return (
    <Widget {...widgetProps} type="text">
      {data => (children ? children(data) : <>{data}</>)}
    </Widget>
  );
};
