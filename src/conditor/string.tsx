import React from "react";
import { WidgetProps, Widget } from "./widget";

export interface StringProps extends WidgetProps<string> {
  type?: "string";
}

export const String: React.FC<StringProps> = ({ children, ...widgetProps }) => {
  return (
    <Widget {...widgetProps} type="string">
      {data => (children ? children(data) : <>{data}</>)}
    </Widget>
  );
};
